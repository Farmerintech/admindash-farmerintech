"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useUser } from "../context/reducer"
import { FaCheck } from "react-icons/fa"
import { subjects } from "./subjects"

// const subjects = ['English Language', 'Mathematics']
const classes = ['KS1', 'KS2', 'KS3','SSCE/IGCE']
const Years = ["Year1", "Year2", "Year3", "Year4", "Year5", "Year6"]
const Terms = ["First Term", "SecondTerm", "Third Term"]
type file=any
export const UploadClassNote = () => {
  const [form, setForm] = useState<any>({
    subject: "",
    year: "",
    class: "",
    term: "",
    file: "",
  });
    const [data, setData] = useState<any>({});
    const [error, setError] = useState<string>();
    const [message, setMessage] = useState('')
    const { state } = useUser();
  
  const [active, setActive] = useState<boolean>(false);
  const handleOptions = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSelectSubject = (value: string) => {
    setForm({
      ...form,
      subject: value,
    });
  };
  const handleSelectTerm = (value: string) => {
    setForm({
      ...form,
      term: value,
    });
  };

  const handleSelectClass = (value: string) => {
    setForm({
      ...form,
      class: value,
    });
  };
  const handleSelectYear = (value: string) => {
    setForm({
      ...form,
      year: value,
    });
  };
  const handleFile = (e:ChangeEvent<HTMLInputElement>) =>{
    const thefile = e.target.files?.[0]
    if (thefile) {
      console.log("Selected file:", thefile);
      setForm({
          ...form,
          file:thefile
      })
      setFileName(thefile.name);
      setIsChoosen(true)
    }

  }
  const [fileName, setFileName] = useState('')
  const [isChoosen, setIsChoosen] = useState(false)


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!form.file || !form.class || !form.subject || !form.year || !form.term) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", form.file);
      formData.append("class", form.class);
      formData.append("subject", form.subject);
      formData.append("year", form.year);
      formData.append("term", form.term);

      const response = await fetch(
        "https://citadel-i-project.onrender.com/api/v1/note/upload_note",
        {
          method: "POST",
          headers: {
            // Do not set Content-Type manually for FormData
            authorization: `Bearer ${state.token}`,
          },
          body: formData,
        }
      );
  
      const result = await response.json();
      setMessage(result?.message)
      !response.ok && setError(result?.message || "Something went wrong");
      setForm({
        file: null,
        class: "",
        subject: "",
        year: "",
        term: "",
      });
      setFileName('');
    } catch (error) {
      console.error(error);
      setError("Error connecting to server");
    }
  };



  useEffect(() => {
    if (
      form.subject !== "" &&
      form.class !== "" &&
      form.year !== "" &&
      form.file !== "" &&
      form.term !== ""
    ) {
      setActive(true);
    }
    if(!form.file){
      setIsChoosen(false);
    }
  }, [form]);
  return (
    <form className="md:flex md:justify-between md:gap-[30px] md:flex-row flex-col w-full" onSubmit={handleSubmit}>
      {/* Upload File */}
      <section className="w-full">
      <div className="flex flex-col gap-[8px] w-full">
        <label className="text-[#344054]">Upload Class Note</label>

        {/* Dropzone Label */}
        <label className="relative w-full h-[247px] border border-[#667085] rounded-[8px] hover:border-[#F6C354] flex items-center justify-center text-center p-4 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={handleFile}
          />

          <div className="flex flex-col items-center justify-center gap-2 text-[#475467] pointer-events-none">
            {
                         !isChoosen ?
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
                       </>
                       :(<p>
                         <FaCheck size={36} className="text-green-500"/>
                       </p>)
           }
            <p className="font-medium">Drag and drop file here</p>
            <p className="text-sm text-[#667085]">or</p>
            <button
              type="button"
              className="px-4 py-2 bg-orange-500 text-white rounded-md text-sm hover:bg-orange-600 transition"
            >
              Choose File
            </button>
          </div>
        </label>
      </div>
      <p className={`${message ? "text-green-500":'text-red-600'}`}>{message ? message : error}</p>
      <p>{fileName}</p>
      </section>
      <section className="w-full">
        {/* Subject */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Subject</label>
          <Select onValueChange={handleSelectSubject} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Subject"  />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject, index) => (
                <SelectItem key={index} value={subject.name}>{subject.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Class */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Class</label>
          <Select onValueChange={handleSelectClass} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((item) => (
                <SelectItem key={item} value={item}>{item}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Year</label>
          <Select onValueChange={handleSelectYear} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Years.map((year, index) => (
                <SelectItem key={index} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

         {/* Term */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Term</label>
          <Select onValueChange={handleSelectTerm} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Term" />
            </SelectTrigger>
            <SelectContent>
              {Terms.map((term, index) => (
                <SelectItem key={index} value={term}>{term}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      <button
          type="submit"
          className={`${active ? "bg-orange-500":""} mt-10 px-[24px] py-[12px] rounded-[8px] bg-[#98A2B3] text-white w-full md:w-[230px]`}
        >
          Submit
        </button>
        </section>
    </form>
  )
}
