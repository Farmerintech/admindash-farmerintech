"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from "react"

const subjects = ['English Language', 'Mathematics']
const classes = ['KS1', 'KS2']
export const UploadPastQustion= () => {

    const [form, setForm] = useState<any>({
        subject:'',
        class:'',
        question:"",
        optionA:"",
        optionB:"",
        optionC:"",
        optionD:"",
        answer:"",
        explanation:""
    });
    const [active, setActive] = useState<boolean>(false)
    const handleOptions = (event:ChangeEvent<HTMLInputElement>) =>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    }
    const handleTextarea = (event:ChangeEvent<HTMLTextAreaElement>)=>{
        setForm({
            ...form,
           [ event.target.name]: event.target.value
        })
    }
    const handleSelectSubject = (value:string) =>{
        setForm({
            ...form,
            subject:value
        })
    }
    
    const handleSelectClass = (value:string) =>{
        setForm({
            ...form,
            class:value
        })
    }
    
    const handleSubmit = (event:FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        console.log(form);
        if(form.subject ==='' || form.class ==='' || form.question ==='' || form.optionA ===''||form.optionB ==='' || form.optionC ==='' || form.optionD ==='' || form.answer ==='' || form.explanation ==='' ){
            return   
        }
        console.log(form);
    }
   useEffect(()=>{
    if(form.subject !=='' && form.class !=='' && form.question !=='' && form.optionA !==''&&form.optionB !=='' && form.optionC !=='' && form.optionD !=='' && form.answer !=='' && form.explanation !=='' ){
        setActive(true)        
    }
   }, [form])
  return (
    <form className="md:flex md:justify-between md:gap-[60px] flex-col md:flex-row w-full" onSubmit={handleSubmit}>
      <section className="w-full flex gap-[16px] flex-col">
        {/* Subject */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Subject</label>
          <Select onValueChange={handleSelectSubject} >
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Subject"  />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
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

        {/* Question */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Question</label>
          <Textarea
            value={form.question}
            onChange={handleTextarea}
            name="question"
            className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]"
          />
        </div>

        {/* Option A */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option A</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionA"
            value={form.optionA}
            onChange={handleOptions}
          />
        </div>

        {/* Option B */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option B</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionB"
            value={form.optionB}
            onChange={handleOptions}
          />
        </div>

        {/* Option C */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option C</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionC"
            value={form.optionC}
            onChange={handleOptions}
          />
        </div>

        {/* Option D */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option D</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="optionD"
            value={form.optionD}
            onChange={handleOptions}
          />
        </div>
      </section>

      <section className="w-full flex flex-col gap-[8px] mt-6 md:mt-0">
        {/* Answer */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Answer</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
            name="answer"
            value={form.answer}
            onChange={handleOptions}
          />
        </div>

        {/* Explanation */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Explanation</label>
          <Textarea
            value={form.explanation}
            onChange={handleTextarea}
            name="explanation"
            className="w-full  p-[6px] rounded-[8px] hover:border-[#F6C354] border border-[#667085] h-[48px]"
          />
        </div>

        {/* Submit Button */}
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
