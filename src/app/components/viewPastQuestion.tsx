"use client"

import { Button } from "@/components/ui/button"
import Link from 'next/link'
import React, { useEffect, useState} from 'react'
import { ChefHatIcon } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'
  

type ViewPastQuestionProps = {
  id?: number; // or number, depending on your data
};
export const ViewpastQuestion = ({id}:ViewPastQuestionProps) =>{
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string>()
    

    useEffect(() => {
      const fetchPQ = async () => {
  
        setError("");
    
        try {
          const response = await fetch(`https://api.citadel-i.com.ng/api/v1/past_question/get_a_questions/${id}`, {
            method: "GET",
            credentials:'include',
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const result = await response.json();
          setData(result.data);
          console.log(data)
        } catch (error) {
          console.error(error);
          setError("Error connecting to server");
        }
      };
    
      fetchPQ();
    }, [data]);
  

  return (
      <section className=" flex gap-[20px] md:flex-row flex-col pt-[24px] ">
        <aside className="bg-[#FFFFFF] flex flex-col gap-[48px] md:px-[32px] py-[24px] p-[8px]">
          <article className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-2.5">
              {data ? (
                <>
                  <span className="flex items-center gap-2" key={data.id}>
                    <p
                      className="h-[24px] w-[24px] bg-[#FFCCB0] text-[10px]
    border border-[#FF5900] text-[#FF5900] rounded-full flex items-center justify-center"
                    >
                      {data.id}
                    </p>
                    <p key={data.id} className="font-semibold text-[18px]">
                      {data?.question}
                    </p>
                  </span>
                  <span className="">
                    <p className="text-[18px]"> {data?.optionA} </p>

                    <p className="text-[18px]"> {data?.optionB}</p>

                    <p className="text-[18px]"> {data?.optionC}</p>

                    <p className="text-[18px]"> {data?.optionD}</p>
                  </span>
                  <span className="flex flex-col w-[105px]">
                    <Button
                      variant="outline"
                      className="bg-[#0DAF64] text-white"
                    >
                      Answer
                    </Button>
                    <p className="text-[18px]"> {data?.answer}</p>
                  </span>

                  <span className="flex flex-col">
                    <Button
                      variant="outline"
                      className=" border border-[#0DAF64] w-[125px] text-black"
                    >
                      Explanation
                    </Button>
                    <p className="text-[14px]">{data?.explanation}</p>
                  </span>
                </>
              ) : (
                "Loading Question..."
              )}
            </div>
            </article>
        </aside>
      </section>
  );
}
