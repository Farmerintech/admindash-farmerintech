"use client";

import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, FormEvent } from "react";
import { Courses, Schools } from "./data";
import { useUser } from "@/app/context/reducer";
import { Modal } from "@/app/components/modal";
import { DashHook } from '@/app/components/dahHook';
import { useSidebar } from '@/app/context/sideBarState';
const MyEditor = dynamic(() => import("@/app/components/editor"), { ssr: false });

export default function AdmissionRequirementForm() {
  const { state } = useUser();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const [form, setForm] = useState<any>({
    course: "",
    school: "",
    year: "",
    requirements: "",
  });

  // ---------------------------
  // HANDLE SELECT INPUTS
  // ---------------------------

  const handleSelectSchool = (value: string) => {
    setForm((prev: any) => ({
      ...prev,
      school: value,
    }));
  };

  const handleSelectCourse = (value: string) => {
    setForm((prev: any) => ({
      ...prev,
      course: value,
    }));
  };

  const handleSelectYear = (value: string) => {
    setForm((prev: any) => ({
      ...prev,
      year: value,
    }));
  };

  const handleEditorChange = (value: string) => {
    setForm((prev: any) => ({
      ...prev,
      requirements: value,
    }));
  };

  // ---------------------------
  // SUBMIT FORM
  // ---------------------------

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault();
    setError("");
    setMessage("");

    // REQUIRED VALUES CHECK
    if (!form.school || !form.course || !form.year || !form.requirements) {
      setError("All fields are required");
      return;
    }
   
    try {

      const response = await fetch(
        "https://citadel-i-project.onrender.com/api/v1/admin/admission_requirements",
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      const result = await response.json();
      console.log(result, form);
      if (!response.ok) {
        setError(result?.error || "Something went wrong");
        return;
      }

      setMessage(result?.message || "Submitted successfully");
      setLoading(false)
      // RESET FORM
      setForm({
        course: "",
        school: "",
        year: "",
        requirements: "",
      });
    } catch (err) {
      console.error(err);
      setError("Error connecting to server");
      setLoading(false)
    }
  };

  // ---------------------------
  // JSX
  // ---------------------------

  return (
    <>
      <Modal message={message} error={error} />
      <section className={`w-ful px-[16px] pb-[24px] mt-6 min-h-screen ${sidebarOpen && "hidden md:block"}`}>
      <DashHook name={"Admission Information"}/>
      <form
        className="md:flex md:justify-between md:gap-[30px] w-full"
        onSubmit={handleSubmit}
      >
        {/* LEFT SECTION – EDITOR */}
        <section className="w-full">
          <div className="mb-4">
            <label className="text-[#344054] block mb-1">Content</label>
            <MyEditor value={form.requirements} onChange={handleEditorChange} />
          </div>
        </section>

        {/* RIGHT SECTION – FIELDS */}
        <section className="w-full">
          {/* SCHOOL */}
          <div className="flex flex-col gap-[8px] w-full">
            <label className="text-[#344054]">School</label>
            <Select onValueChange={handleSelectSchool}>
              <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                {Schools.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* COURSE */}
          <div className="flex flex-col gap-[8px] w-full mt-6">
            <label className="text-[#344054]">Course</label>
            <Select onValueChange={handleSelectCourse}>
              <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {Courses.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* YEAR */}
          <div className="flex flex-col gap-[8px] w-full mt-6">
            <label className="text-[#344054]">Year</label>
            <Select onValueChange={handleSelectYear}>
              <SelectTrigger className="w-full p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {["2025", "2026", "2027", "2028", "2029", "2030"].map((yr) => (
                  <SelectItem key={yr} value={yr}>
                    {yr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className={`${
              loading ? "bg-[#98A2B3]" : "bg-orange-500"
            } mt-10 px-[24px] py-[12px] rounded-[8px]  text-white w-full md:w-[230px]`}
          >
            Submit
          </button>
        </section>
      </form>
      </section>
    </>
  );
}
