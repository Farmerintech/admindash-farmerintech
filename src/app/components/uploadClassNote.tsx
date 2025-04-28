"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const subjects = ['English Language', 'Mathematics']
const classes = ['KS1', 'KS2']

export const UploadClassNote = () => {
  return (
    <form className="md:flex md:justify-between md:gap-[60px] flex-col md:flex-row w-full">
      <section className="w-full flex gap-[16px] flex-col">
        {/* Subject */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Subject</label>
          <Select>
            <SelectTrigger className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]">
              <SelectValue placeholder="Subject" />
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
          <Select>
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
            value=""
            onChange={() => {}}
            className="w-full  p-[12px] hover:border-[#F6C354] rounded-[8px] border border-[#667085]"
          />
        </div>

        {/* Option A */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option A</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
          />
        </div>

        {/* Option B */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option B</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
          />
        </div>

        {/* Option C */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option C</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
          />
        </div>

        {/* Option D */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Option D</label>
          <input
            type="text"
            className="w-full  p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
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
          />
        </div>

        {/* Explanation */}
        <div className="flex flex-col gap-[8px] w-full">
          <label className="text-[#344054]">Explanation</label>
          <Textarea
            value=""
            onChange={() => {}}
            className="w-full  p-[6px] rounded-[8px] hover:border-[#F6C354] border border-[#667085] h-[48px]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-10 px-[24px] py-[12px] rounded-[8px] bg-[#98A2B3] text-white w-full md:w-[230px]"
        >
          Submit
        </button>
      </section>
    </form>
  )
}
