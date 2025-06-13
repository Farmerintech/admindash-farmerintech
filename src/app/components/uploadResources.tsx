"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Teachers } from "next/font/google"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { sources } from "./sources"
import { FaCheck, FaFileImage } from "react-icons/fa"
import { useUser } from "../context/reducer"
import {Modal} from "@/app/components/modal"
const subjects = ['English Language', 'Mathematics']
const examTypes = ['JAMB', 'WAEC', "NECO", "GCE/IGCE"]

export const UploadResources = () => {
  const [data, setData] = useState<any>({});
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState()
  const { state } = useUser();

    type file =any
    const [form, setForm] = useState<any>({
        file:null,
        source:"",
        description:"",
        link:"",
        resourceFor:''
    });
    const [active, setActive] = useState<boolean>(false)
    const handleInputs = (event:ChangeEvent<HTMLInputElement>) =>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    }
    const handleSelect = (value:string) =>{
        setForm({
            ...form,
            resourceFor:value
        })
    }
    const handleSelectSource = (value:string) =>{
      setForm({
          ...form,
          source:value
      })
  }
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!form.file || !form.source || !form.description || !form.link || !form.resourceFor) {
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("file", form.file);
      formData.append("source", form.source);
      formData.append("description", form.description);
      formData.append("link", form.link);
      formData.append("resourceFor", form.resourceFor);
  
      const response = await fetch(
        "https://citadel-i-project.onrender.com/api/v1/resources/upload_resources",
        {
          method: "POST",
          credentials: 'include',
          headers: {
            // Do not set Content-Type manually for FormData
          },
          body: formData,
        }
      );
  
      const result = await response.json();
      setMessage(result?.message)
      !response.ok && setError(result?.message || "Something went wrong");

      setForm({
        file: null,
        source: "",
        description: "",
        link: "",
        resourceFor: "",
      });
      setFileName('');
    } catch (error) {
      console.error(error);
      setError("Error connecting to server");
    }
  };

  useEffect(()=>{
        if(form.file !== '' && form.source !=="" && form.description!=='' && form.link !=='' && form.resourceFor !==""){
            setActive(true)
        }
        if(!form.file){
          setIsChoosen(false);
        }
    }, [form])
    const [fileName, setFileName] = useState('')
    const [isChoosen, setIsChoosen] = useState(false)
  return (
    <form className="md:flex md:justify-between md:gap-[30px] w-full" onSubmit={handleSubmit} name="">
      {/* Upload File */}
      <section className="w-full">
      <div className="flex flex-col gap-[8px] w-full">
        <label className="text-[#344054]">Upload New Resources</label>

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
             <Modal message={message || ""} error={error || ""}/>
      <p>{fileName}</p>
      </section>

      {/* {resources for} */}
      <section className="w-full">

      <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Resources For</label>
          <Select onValueChange={handleSelect} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Resource For"  />
            </SelectTrigger>
            <SelectContent>
            <SelectItem key={'Teachers'} value={'Teachers'}>Teachers</SelectItem>
            <SelectItem key={'Students'} value={'Students'}>Students</SelectItem>
            </SelectContent>
          </Select>
        </div>

      {/* Name of Website or Header */}
      <div className="flex flex-col gap-[8px] w-full mt-6">
        <label className="text-[#344054]">Source or Label of the Resources</label>
        <Select onValueChange={handleSelectSource} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Source"  />
            </SelectTrigger>
            <SelectContent>
              {
                sources.map(source =>(
                  <SelectItem key={source.name} value={source.name}>{source.name}</SelectItem>
                ))
              }
            </SelectContent>
          </Select>

      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-[8px] w-full mt-4">
        <label className="text-[#344054]">Short Description about the website</label>
        <input
          type="text"
          className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
          onChange={handleInputs}
          name="description"
          value={form.description}
        />
      </div>

      {/* Link to resource */}
      <div className="flex flex-col gap-[8px] w-full mt-4">
        <label className="text-[#344054]">Link to the resource website</label>
        <input
          type="text"
          className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
          onChange={handleInputs}
          name="link"
          value={form.link}
        />
      </div>
      {/* submit */}
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
