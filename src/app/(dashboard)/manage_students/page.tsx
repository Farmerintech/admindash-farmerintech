import { DashHook } from "@/app/components/dahHook"

export const page = () =>{
    return(
      <section className="md:ml-[25%]  lg:ml-[20%] md:w-[75%]lg:w-[80%] w-[100%] px-[16px] pb-[24px] mt-6 min-h-screen">
         <DashHook name={"Manage Studnts"}/>
      </section>
    )
}