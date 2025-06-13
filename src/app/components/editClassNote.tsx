"use client";

import { ChangeEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useUser } from "../context/reducer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "./subjects";
import { AddImageToContent } from "./addImage";
import {Modal} from "@/app/components/modal"

const MyEditor = dynamic(() => import("./editor"), { ssr: false });

const classes = ["KS1", "KS2", "KS3", "SSCE/IGCE"];
const Years = ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"];
const Terms = ["First Term", "Second Term", "Third Term"];

type EditClassNoteProps = {
  noteId?: number;
};

export const EditClassNote = ({ noteId }: EditClassNoteProps) => {
  const { state } = useUser();
  const [form, setForm] = useState<any>({
    subject: "",
    year: "",
    class: "",
    term: "",
    image: null,
    topic: "",
    content: "",
    videoSection: null,
  });
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [existingVideoUrl, setExistingVideoUrl] = useState("");
  const [tableOfContent, setTableOfContent] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isChoosen, setIsChoosen] = useState(false);
  const [active, setActive] = useState(false);
  const [data, setData] = useState<any>();

useEffect(() => {
  const fetchNote = async () => {
    try {
      const res = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/note/get_note/${noteId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      if (data !== null) {
        setData(data);
        setForm({
          subject: data?.data?.subject,
          year: data?.data?.year,
          class: data?.data?.class,
          term: data?.data?.term,
          topic: data?.data?.topic,
          content: data?.data?.content,
          image: null,
          videoSection: null,
        });

        // ✅ Ensure tableOfContent is an array
        const toc = data?.data?.tableOfContent;
        if (typeof toc === "string") {
          try {
            const parsed = JSON.parse(toc);
            setTableOfContent(Array.isArray(parsed) ? parsed : []);
          } catch (error) {
            setTableOfContent([]);
          }
        } else if (Array.isArray(toc)) {
          setTableOfContent(toc);
        } else {
          setTableOfContent([]);
        }

        setExistingImageUrl(data?.data?.image);
        setExistingVideoUrl(data?.data?.videoSection);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch note");
    }
  };

  fetchNote();
}, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (field: string) => (value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prevForm: any) => ({ ...prevForm, image: file }));
      setIsChoosen(true);
    }
  };

  const handleVideoFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prevForm: any) => ({ ...prevForm, videoSection: file }));
    }
  };

  const handleEditorChange = (value: string) => {
    setForm({ ...form, content: value });
  };

  const handleAddTOCInput = () => {
    setTableOfContent([...tableOfContent, ""]);
  };

  const handleTOCChange = (index: number, value: string) => {
    const updated = [...tableOfContent];
    updated[index] = value;
    setTableOfContent(updated);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !form.class ||
      !form.subject ||
      !form.year ||
      !form.term ||
      !form.topic
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      if (form.image) formData.append("image", form.image);
      if (form.videoSection) formData.append("videoSection", form.videoSection);
      formData.append("class", form.class);
      formData.append("subject", form.subject);
      formData.append("year", form.year);
      formData.append("term", form.term);
      formData.append("topic", form.topic);
      formData.append("content", form.content);
      formData.append("tableOfContent", JSON.stringify(tableOfContent));

      const res = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/note/edit_note/${noteId}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );
  console.log("Submitting form data:", { ...form, tableOfContent });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }
console.log(result.data)
      setMessage(result.message);
    } catch (err: any) {
      setError(err.message || "Update failed");
    }
  };

  useEffect(() => {
    setError("");
    setMessage("");
    const isComplete =
      form.subject && form.class && form.year && form.term && form.topic;
    setActive(!!isComplete);
    if (!form.image && !existingImageUrl) setIsChoosen(false);
  }, [form]);

  return (
    <section className="flex flex-col gap-[64px] w-full">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8">
        <section className="flex-1">
          {/* Thumbnail */}
          <div className="mb-4">
            <label>Upload Class Note</label>
            <label className="relative w-full h-60 border rounded-lg flex items-center justify-center p-4 cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageFile} />
              <div className="text-center">
                {!form.image && existingImageUrl ? (
                  <img src={existingImageUrl} alt="Thumbnail" className="h-24 object-cover" />
                ) : form.image ? (
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="Selected Thumbnail"
                    className="h-24 object-cover"
                  />
                ) : (
                  <p>Choose Thumbnail</p>
                )}
              </div>
            </label>
          </div>

          <FormSelect label="Subject" options={subjects.map((s) => s.name)} onChange={handleSelectChange("subject")} value={form.subject} />
          <FormInput label="Topic" name="topic" value={form.topic} onChange={handleInputChange} />
          <FormSelect label="Class" options={classes} onChange={handleSelectChange("class")} value={form.class} />
          <FormSelect label="Year" options={Years} onChange={handleSelectChange("year")} value={form.year} />
          <FormSelect label="Term" options={Terms} onChange={handleSelectChange("term")} value={form.term} />

          {/* TOC */}
          <div className="mt-4 space-y-2 flex flex-col">
            <label>Table of Contents</label>
            {tableOfContent.map((item, i) => (
              <input
                key={i}
                value={item}
                onChange={(e) => handleTOCChange(i, e.target.value)}
                className="w-full p-2 border rounded"
              />
            ))}
            <button
              type="button"
              onClick={handleAddTOCInput}
              className="text-sm bg-orange-500 text-white px-3 py-2 rounded-[8px] w-[120px]"
            >
              + Add Section
            </button>
          </div>

          <Modal message={message && message} error={"error && error"}/>
        </section>

        <section className="flex-1">
          <div className="mb-4">
            <label>Content</label>
            <MyEditor value={form.content} onChange={handleEditorChange} />
          </div>
          <AddImageToContent />

          {/* Video Section */}
          <h2 className="mt-6 mb-2">Add Video Section</h2>
          <label className="w-full h-60 border rounded-lg flex items-center justify-center p-4 cursor-pointer">
            <input type="file" className="hidden" onChange={handleVideoFile} />
            <div className="text-center">
              {existingVideoUrl && !form.videoSection ? (
                <video controls className="w-full h-32 object-cover">
                  <source src={existingVideoUrl} />
                </video>
              ) : form.videoSection ? (
                <video controls className="w-full h-32 object-cover">
                  <source src={URL.createObjectURL(form.videoSection)} />
                </video>
              ) : (
                <p>Choose Video</p>
              )}
            </div>
          </label>

          <button
            disabled={!active}
            type="submit"
            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-[8px]"
          >
            Update Note
          </button>
        </section>
      </form>
    </section>
  );
};

export const FormSelect = ({
  label,
  options,
  onChange,
  value,
}: {
  label: string;
  options: string[];
  onChange: (value: string) => void;
  value: string;
}) => {
  return (
    <div className="space-y-1">
      <label className="text-[#344054]">{label}</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full xl:w-[430px]">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export function FormInput({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1 flex flex-col">
      <label className="text-[#344054]">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 rounded w-full"
      />
    </div>
  );
}
