"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUser } from "../context/reducer";
import { FaCheck } from "react-icons/fa";
import { subjects } from "./subjects";
import dynamic from "next/dynamic";
import { AddImageToContent } from "./addImage";
import { AddSubject } from "./addSubject";
import {Modal} from "@/app/components/modal"

const MyEditor = dynamic(() => import("./editor"), { ssr: false });

const classes = ["KS1", "KS2", "KS3", "SSCE/IGCE"];
const Years = ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"];
const Terms = ["First Term", "Second Term", "Third Term"];

export const ClassNote = () => {
  const [form, setForm] = useState<any>({
    subject: "",
    year: "",
    class: "",
    term: "",
    image: "",
    topic: "",
    content: "",
    videoSection: "",
  });

  // New state for Table of Contents (TOC)
  const [tableOfContent, setTableOfContent] = useState<string[]>([]);

  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [active, setActive] = useState(false);
  const [isChoosen, setIsChoosen] = useState(false);
  const { state } = useUser();

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
      setForm((prevForm: any) => ({
        ...prevForm,
        image: file,
      }));
      setIsChoosen(true);
    }
  };

  const handleVideoFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prevForm: any) => ({
        ...prevForm,
        videoSection: file,
      }));
      setIsChoosen(true);
    }
  };

  const handleEditorChange = (value: string) => {
    setForm({ ...form, content: value });
  };

  // --- Handlers for Table of Contents ---
  const handleAddTOCInput = () => {
    setTableOfContent([...tableOfContent, ""]);
  };

  const handleTOCChange = (index: number, value: string) => {
    const updated = [...tableOfContent];
    updated[index] = value;
    setTableOfContent(updated);
  };

  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(""); 
  setMessage("");
  setLoading(true);

  if (
    !form.image ||
    !form.class ||
    !form.subject ||
    !form.year ||
    !form.term ||
    !form.topic
  ) {
    setError("Please fill in all required fields.");
    setLoading(false);
    return;
  }

  try {
    const formData = new FormData();
    formData.append("image", form.image);
    formData.append("class", form.class);
    formData.append("subject", form.subject);
    formData.append("year", form.year);
    formData.append("term", form.term);
    formData.append("topic", form.topic);
    formData.append("content", form.content);
    formData.append("tableOfContent", JSON.stringify(tableOfContent));
    if (form.videoSection) formData.append("videoSection", form.videoSection);

    const response = await fetch(
      "https://citadel-i-project.onrender.com/api/v1/note/upload_note",
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    const result = await response.json();
    if (!response.ok) {
      setError(result?.message || "Something went wrong");
    } else {
      setMessage(result?.message || "Upload successful ✅");
      setForm({
        subject: "",
        year: "",
        class: "",
        term: "",
        image: "",
        topic: "",
        content: "",
        videoSection: "",
      });
      setTableOfContent([]);
      setIsChoosen(false);
    }
  } catch (err) {
    console.error(err);
    setError("Error connecting to server");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    //setError("");
   // setMessage("");

    const isComplete =
      form.subject && form.class && form.year && form.image && form.term && form.topic;
    setActive(!!isComplete);
    if (!form.image) setIsChoosen(false);
  }, [form]);

  return (
    <>
    {/* Message / Error */}
             <Modal message={message || ""} error={error || ""}/>
   
    <section className="flex flex-col gap-[64px] w-full">
      {/* <AddSubject /> */}
      <form
        onSubmit={handleSubmit}
        className="md:flex md:justify-between md:gap-8 md:flex-row flex-col w-full"
      >
        <section className="w-full flex-1">
          {/* Upload Image */}
          <div className="flex flex-col gap-2 w-full mb-4">
            <label className="text-[#344054]">Upload Class Note</label>
            <label className="relative w-full h-60 border border-[#667085] xl:w-[430px] rounded-lg hover:border-[#F6C354] flex items-center justify-center text-center p-4 cursor-pointer">
              <input type="file" className="hidden" onChange={handleImageFile} />
              <div className="flex flex-col items-center gap-2 text-[#475467] pointer-events-none">
                {!isChoosen ? (
                  <>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25 17.0002V18.6002C25 20.8405 25 21.9606 24.564 22.8162C24.1805 23.5689 23.5686 24.1808 22.816 24.5643C21.9603 25.0002 20.8402 25.0002 18.6 25.0002H7.4C5.15979 25.0002 4.03969 25.0002 3.18404 24.5643C2.43139 24.1808 1.81947 23.5689 1.43597 22.8162C1 21.9606 1 20.8405 1 18.6002V17.0002M19.6667 10.3336L13 17.0002M13 17.0002L6.33333 10.3336M13 17.0002V1.00024"
                        stroke="#475467"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="font-medium">Add Topic Thumbnail</p>
                    <p className="text-sm text-[#667085]">or</p>
                  </>
                ) : (
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="Preview"
                    className="w-full h-24 object-cover"
                  />
                )}
                <button
                  type="button"
                  className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition"
                >
                  Choose File
                </button>
              </div>
            </label>
          </div>

          {/* Dropdowns */}
          <div className="space-y-4">
            <FormSelect
              label="Subject"
              options={subjects.map((s) => s.name)}
              onChange={handleSelectChange("subject")}
            />
            <FormInput
              label="Topic"
              name="topic"
              value={form.topic}
              onChange={handleInputChange}
            />
            <FormSelect
              label="Class"
              options={classes}
              onChange={handleSelectChange("class")}
            />
            <FormSelect
              label="Year"
              options={Years}
              onChange={handleSelectChange("year")}
            />
            <FormSelect
              label="Term"
              options={Terms}
              onChange={handleSelectChange("term")}
            />
          </div>
            {/* === TABLE OF CONTENT INPUTS === */}
            <div className="space-y-2 mt-4">
              <label className="text-[#344054] block">Table of Contents</label>
              {tableOfContent.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleTOCChange(index, e.target.value)}
                  placeholder={`Section ${index + 1}`}
                  className="w-full xl:w-[430px] p-2 border border-[#667085] rounded-[8px]"
                />
              ))}
              <button
                type="button"
                onClick={handleAddTOCInput}
                className="mt-2 px-3 py-2 bg-orange-500 text-white text-sm rounded-[8px] hover:bg-orange-600"
              >
                + Add Section
              </button>
            </div>
            {/* === END TABLE OF CONTENT === */}

          
        </section>

        <section className="w-full flex-1 mt-6 md:mt-0">
          <div className="mb-4">
            <label className="text-[#344054] block mb-1">Content</label>
            <MyEditor value={form.content} onChange={handleEditorChange} />
          </div>
          {/*<AddImageToContent />*/}
          {/* Upload Video Section */}
          <h2 className="mt-6 mb-2 text-[#344054]">Add Video Section</h2>
          <label className="relative w-full h-60 border border-[#667085] xl:w-[430px] rounded-lg hover:border-[#F6C354] flex items-center justify-center text-center p-4 cursor-pointer">
            <input type="file" className="hidden" onChange={handleVideoFile} />
            <div className="flex flex-col items-center gap-2 text-[#475467] pointer-events-none">
              {!form.videoSection ? (
                <>
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25 17.0002V18.6002C25 20.8405 25 21.9606 24.564 22.8162C24.1805 23.5689 23.5686 24.1808 22.816 24.5643C21.9603 25.0002 20.8402 25.0002 18.6 25.0002H7.4C5.15979 25.0002 4.03969 25.0002 3.18404 24.5643C2.43139 24.1808 1.81947 23.5689 1.43597 22.8162C1 21.9606 1 20.8405 1 18.6002V17.0002M19.6667 10.3336L13 17.0002M13 17.0002L6.33333 10.3336M13 17.0002V1.00024"
                      stroke="#475467"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Add Video</p>
                  <p className="text-sm text-[#667085]">or</p>
                </>
              ) : (
                <video
                  src={URL.createObjectURL(form.videoSection)}
                  controls
                  className="w-full h-24 object-cover"
                />
              )}
              <button
                type="button"
                className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition"
              >
                Choose File
              </button>
            </div>
          </label>
          <button
  type="submit"
  disabled={!active || loading}
  className={`mt-6 w-[280px] rounded-[8px] py-3 text-white text-lg font-semibold ${
    !active || loading
      ? "bg-gray-300 cursor-not-allowed"
      : "bg-orange-500 hover:bg-orange-600"
  }`}
>
  {loading ? "Submitting..." : "Submit"}
</button>
          </button>
        </section>
      </form>
    </section>
       </>
  );
};

// Helper components for select and inputexport const o=()=>
export const FormSelect = ({
  label,
  options,
  onChange,
}: {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}) => {
  return (
    <div className="space-y-1">
      <label className="text-[#344054]">{label}</label>
      <Select onValueChange={onChange}>
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
}

function FormInput({
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
        className="w-full xl:w-[430px] p-2 border border-[#667085] rounded-[8px]"
      />
    </div>
  );
}
