"use client"

import { DashHook } from "@/app/components/dahHook";
import { useSidebar } from "@/app/context/sideBarState";
import PricePerSeasonForm from "./paymentSettings";

export default function page(){
        const { sidebarOpen, setSidebarOpen } = useSidebar();
    
    return(
      <section className={`w-ful px-[16px] pb-[24px] mt-6 min-h-screen ${sidebarOpen && "hidden md:block"}`}>
         <DashHook name={"Payment settings"}/>
         <section className="grid md:grid-cols-1 lg:grid-cols-3 gap-[24px] mt-10">
            <PricePerSeasonForm/>
        </section>
        </section>
    )
}