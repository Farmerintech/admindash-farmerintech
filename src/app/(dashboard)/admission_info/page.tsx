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
import AdmissionTable from "./admission_table";
const MyEditor = dynamic(() => import("@/app/components/editor"), { ssr: false });

export default function AdmissionRequirementForm() {
  const { state } = useUser();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [staticContent, setStaticContent] = useState<string>("")
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
  event.preventDefault();
  setError("");
  setMessage("");
  setLoading(true);

  if (!form.school || !form.course || !form.year || !form.requirements) {
    setError("All fields are required");
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/admission_requirements",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const result = await response.json();
    console.log(result);

    if (!response.ok) {
      setError(result?.error || "Something went wrong");
      setLoading(false);
      return;
    }

    setMessage(result?.message || "Submitted successfully");
    setLoading(false);

    setForm({
      course: "",
      school: "",
      year: "",
      requirements: "",
    });

  } catch (err) {
    console.error(err);
    setError("Error connecting to server");
    setLoading(false);
  }
};


const [fetching, setFetching] = useState(true);
useEffect(() => {
  const fetchStaticContent = async () => {
    try {
      const res = await fetch(
        "https://api.citadel-i.com.ng/api/v1/admin/get_admission_static",
        {
          credentials: "include",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result?.message || "Failed to fetch static content");
      }

      // 👇 hydrate editor
      setStaticContent(result?.data?.staticContent || "");
    } catch (err) {
      console.error(err);
      setError("Failed to load static content");
    } finally {
      setFetching(false);
    }
  };

  fetchStaticContent();
}, []);

const handleStaticContent = (value: string) => {
  setStaticContent(value);
};
const handleSubmitStatic = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setError("");
  setMessage("");
  setLoading(true);

  if (!staticContent) {
    setError("Static content is required");
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/admission_static",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ staticContent }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      setError(result?.message || "Something went wrong");
      return;
    }

    setMessage(result?.message || "Updated successfully");
  } catch (err) {
    console.error(err);
    setError("Error connecting to server");
  } finally {
    setLoading(false);
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
         {/* Addmission info static page */}
<section className="border-t-2 border-gray-500 my-5">
  <p className="text-xl text-center font-[600] my-4">
    Admission Requirements Static Page
  </p>

  {fetching ? (
    <p className="text-center">Loading content...</p>
  ) : (
    <form
      className="flex flex-col gap-[30px] w-full"
      onSubmit={handleSubmitStatic}
    >
      {/* EDITOR */}
      <section className="w-full">
        <label className="text-[#344054] block mb-1">
          Static Page Content
        </label>
        <MyEditor
          value={staticContent}
          onChange={handleStaticContent}
        />
      </section>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? "bg-[#98A2B3]" : "bg-orange-500"
        } mt-10 px-[24px] py-[12px] rounded-[8px] text-white w-full md:w-[230px]`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
    </form>
  )}
</section>
      <p className="text-xl font-[600] text-center">Addmission Info Table</p>
      <AdmissionTable/>
      </section>
  
    </>
  );
}