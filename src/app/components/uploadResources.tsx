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
const examTypes = ['JAMB', 'WAEC', "NECO", "GCE/IGCE"]

export const UploadResources = () => {
  return (
    <form className="md:flex md:justify-between md:gap-[30px] flex-col w-full">
      {/* Upload File */}
      <div className="flex flex-col gap-[8px] w-full">
        <label className="text-[#344054]">Upload New Resources</label>

        {/* Dropzone Label */}
        <label className="relative w-full h-[247px] border border-[#667085] rounded-[8px] hover:border-[#F6C354] flex items-center justify-center text-center p-4 cursor-pointer">
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                console.log("Selected file:", file)
              }
            }}
          />

          <div className="flex flex-col items-center justify-center gap-2 text-[#475467] pointer-events-none">
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

      {/* Name of Website or Header */}
      <div className="flex flex-col gap-[8px] w-full mt-6">
        <label className="text-[#344054]">Name of Website or Header</label>
        <input
          type="text"
          className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
        />
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-[8px] w-full mt-4">
        <label className="text-[#344054]">Short Description about the website</label>
        <input
          type="text"
          className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
        />
      </div>

      {/* Link to resource */}
      <div className="flex flex-col gap-[8px] w-full mt-4">
        <label className="text-[#344054]">Link to the resource website</label>
        <input
          type="text"
          className="w-full p-[12px] rounded-[8px] border hover:border-[#F6C354] border-[#667085] h-[38px]"
        />
      </div>
      {/* submit */}
      <button
          type="submit"
          className="mt-10 px-[24px] py-[12px] rounded-[8px] bg-[#98A2B3] text-white w-full md:w-[230px]"
        >
          Submit
        </button>
    </form>
  )
}
