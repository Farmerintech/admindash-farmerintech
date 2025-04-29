"use client"

import { DashHook } from "@/app/components/dahHook";
import { UploadCbtQuestion } from "@/app/components/uploadCbtQuestion";
import { UploadClassNote } from "@/app/components/uploadClassNote";
import { UploadPastQustion } from "@/app/components/uploadPastQuestion";
import { UploadResources } from "@/app/components/uploadResources";
import { useUser } from "@/app/context/reducer"
import { useSidebar } from "@/app/context/sideBarState";
import { useState } from "react";

export default function page (){
    const { sidebarOpen, setSidebarOpen } = useSidebar();
    const [active, setActive] = useState<number>(0);
    return(
        <section className={`w-ful px-[16px] pb-[24px] mt-6 gap-[16px] flex flex-col min-h-screen ${sidebarOpen && "hidden md:block"}`}>
            <DashHook name={"Manage Content"}/>
            <div className="p-[8px] flex justify-between flex-wrap gap-[16px] rounded-[8px] bg-white">
               <div className={`${active === 0 ? "bg-[#FF5900] text-white":"bg-none"} px-[16px] py-[8px]  gap-[8px]  rounded-[8px] flex`} onClick={()=>{setActive(0)}}>
                  <span>
                    <svg width="15" height="14" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.3335 10.5V6.8C20.3335 5.11984 20.3335 4.27976 20.0065 3.63803C19.7189 3.07354 19.26 2.6146 18.6955 2.32698C18.0537 2 17.2137 2 15.5335 2H9.1335C7.45334 2 6.61326 2 5.97152 2.32698C5.40704 2.6146 4.9481 3.07354 4.66048 3.63803C4.3335 4.27976 4.3335 5.11984 4.3335 6.8V17.2C4.3335 18.8802 4.3335 19.7202 4.66048 20.362C4.9481 20.9265 5.40704 21.3854 5.97152 21.673C6.61326 22 7.45334 22 9.1335 22H12.3335M14.3335 11H8.3335M10.3335 15H8.3335M16.3335 7H8.3335M18.3335 21V15M15.3335 18H21.3335" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span className='text-[12px] '>Upload Class notes</span>
               </div>
               <div className={`${active === 1 ? "bg-[#FF5900] text-white":"bg-none"} px-[16px] py-[8px]  gap-[8px]  rounded-[8px] flex`} onClick={()=>{setActive(1)}}>
                  <span>
                     <svg width="15" height="14" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M20.3335 10.5V6.8C20.3335 5.11984 20.3335 4.27976 20.0065 3.63803C19.7189 3.07354 19.26 2.6146 18.6955 2.32698C18.0537 2 17.2137 2 15.5335 2H9.1335C7.45334 2 6.61326 2 5.97152 2.32698C5.40704 2.6146 4.9481 3.07354 4.66048 3.63803C4.3335 4.27976 4.3335 5.11984 4.3335 6.8V17.2C4.3335 18.8802 4.3335 19.7202 4.66048 20.362C4.9481 20.9265 5.40704 21.3854 5.97152 21.673C6.61326 22 7.45334 22 9.1335 22H12.3335M14.3335 11H8.3335M10.3335 15H8.3335M16.3335 7H8.3335M18.3335 21V15M15.3335 18H21.3335" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                  </span>
                  <span className='text-[12px] '>Upload Past Question</span>
               </div>
               <div className={`${active === 2 ? "bg-[#FF5900] text-white":"bg-none"} px-[16px] py-[8px]  gap-[8px]  rounded-[8px] flex`} onClick={()=>{setActive(2)}}>
                  <span>
                    <svg width="15" height="14" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3335 10.5V6.8C20.3335 5.11984 20.3335 4.27976 20.0065 3.63803C19.7189 3.07354 19.26 2.6146 18.6955 2.32698C18.0537 2 17.2137 2 15.5335 2H9.1335C7.45334 2 6.61326 2 5.97152 2.32698C5.40704 2.6146 4.9481 3.07354 4.66048 3.63803C4.3335 4.27976 4.3335 5.11984 4.3335 6.8V17.2C4.3335 18.8802 4.3335 19.7202 4.66048 20.362C4.9481 20.9265 5.40704 21.3854 5.97152 21.673C6.61326 22 7.45334 22 9.1335 22H12.3335M14.3335 11H8.3335M10.3335 15H8.3335M16.3335 7H8.3335M18.3335 21V15M15.3335 18H21.3335" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span className='text-[12px] '>Upload CBT Question</span>
               </div>
               <div className={`${active === 3 ? "bg-[#FF5900] text-white":"bg-none"} px-[16px] py-[8px]  gap-[8px]  rounded-[8px] flex`} onClick={()=>{setActive(3)}}>
                  <span className={`${active === 3 ? " text-white":"bg-none"}`}>
                    <svg width="15" height="14" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.3335 10.5V6.8C20.3335 5.11984 20.3335 4.27976 20.0065 3.63803C19.7189 3.07354 19.26 2.6146 18.6955 2.32698C18.0537 2 17.2137 2 15.5335 2H9.1335C7.45334 2 6.61326 2 5.97152 2.32698C5.40704 2.6146 4.9481 3.07354 4.66048 3.63803C4.3335 4.27976 4.3335 5.11984 4.3335 6.8V17.2C4.3335 18.8802 4.3335 19.7202 4.66048 20.362C4.9481 20.9265 5.40704 21.3854 5.97152 21.673C6.61326 22 7.45334 22 9.1335 22H12.3335M14.3335 11H8.3335M10.3335 15H8.3335M16.3335 7H8.3335M18.3335 21V15M15.3335 18H21.3335" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span className='text-[12px] '>Add Resources</span>
               </div>
            </div>
            <main className="p-[32px] bg-white rounded-[8px] gap-[160px] flex justify-between">
               {
                  active ===0 && <UploadClassNote/>
               }
                {
                  active ===1 && <UploadPastQustion/>
               }
                {
                  active ===2 && <UploadCbtQuestion/>
               }
               {
                  active ===3 && <UploadResources/>
               }
            </main>
        </section>

    )

}