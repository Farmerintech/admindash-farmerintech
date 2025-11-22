"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useUser } from "../context/reducer"
import { FaCheck } from "react-icons/fa"
import { subjects } from "./subjects"
import dynamic from 'next/dynamic';
import { AddImageToContent } from "./addImage"
import { FormSelect } from "./classNote"

const MyEditor = dynamic(() => import('./editor'), { ssr: false });

const classes = ['KS1', 'KS2', 'KS3', 'SSCE/IGCE']
const Years = ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"]
const Terms = ["First Term", "Second Term", "Third Term"]

export const AddSubject = () => {
  const [form, setForm] = useState<any>({
    subject: "",
    class: "",
  });

  const [error, setError] = useState<string>();
  const [message, setMessage] = useState('');
  const [active, setActive] = useState(false);
  const [isChoosen, setIsChoosen] = useState(false);
  const { state } = useUser();

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
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.image || !form.class || !form.subject) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", form.image);
      formData.append("class", form.class);
      formData.append("subject", form.subject);

      console.log(form)
      const response = await fetch("https://api.citadel-i.com.ng/api/v1/note/upload_note", {
        method: "POST",
        credentials: 'include',
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result?.message || "Something went wrong");
        return;
      }

      setMessage(result?.message || "Upload successful");
      setForm({
        subject: "",
        class: "",
      });
      setIsChoosen(false);
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
    }
  };

  useEffect(() => {
    setError('');
    setMessage('');

    const isComplete = form.subject && form.class && form.image
    setActive(!!isComplete);
    if (!form.image) setIsChoosen(false);
  }, [form]);


  return (
    <form onSubmit={handleSubmit} className="md:flex md:justify-between md:gap-8 md:flex-row flex-col w-full border-b-1">
      <section className="w-full flex-1">
        {/* Upload Image */}
        <div className="flex flex-col gap-2 w-full mb-4">
          <label className="text-[#344054]">Add subject</label>
          <label className="relative w-full h-60 border border-[#667085] xl:w-[430px] rounded-lg hover:border-[#F6C354] flex items-center justify-center text-center p-4 cursor-pointer">
            <input type="file" className="hidden" onChange={handleImageFile} />
            <div className="flex flex-col items-center gap-2 text-[#475467] pointer-events-none">
              {!isChoosen ? (
                <>
                  <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M25 17.0002V18.6002C25 20.8405 25 21.9606 24.564 22.8162C24.1805 23.5689 23.5686 24.1808 22.816 24.5643C21.9603 25.0002 20.8402 25.0002 18.6 25.0002H7.4C5.15979 25.0002 4.03969 25.0002 3.18404 24.5643C2.43139 24.1808 1.81947 23.5689 1.43597 22.8162C1 21.9606 1 20.8405 1 18.6002V17.0002M19.6667 10.3336L13 17.0002M13 17.0002L6.33333 10.3336M13 17.0002V1.00024"
                      stroke="#475467"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="font-medium">Add Subject Thumbnail</p>
                  <p className="text-sm text-[#667085]">or</p>
                </>
              ) : (
                <img src={URL.createObjectURL(form.image)} alt="Preview" className="w-full h-24 object-cover" />
              )}
              <button type="button" className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition">
                Choose File
              </button>
            </div>
          </label>
        </div>

        {/* Message / Error */}
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </section>
      <section className="w-full flex-1">
                {/* Dropdowns */}
        <div className="space-y-4">
          <FormSelect label="Subject" options={subjects.map(s => s.name)} onChange={handleSelectChange('subject')} />
          <FormSelect label="Class" options={classes} onChange={handleSelectChange('class')} />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-6 px-6 py-3 rounded-lg w-full xl:w-[230px] ${active ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400"} text-white transition`}
        >
          Submit
        </button>

      </section>
      </form>
  )}