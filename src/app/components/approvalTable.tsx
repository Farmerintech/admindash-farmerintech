"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { FaBan, FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useEffect, useState } from "react";
import { useUser } from "../context/reducer";
import Link from "next/link";

  const actions = [
    {
      name: "View",
      icon: <FaEye size={25}/>,
      color: "text-blue-400",
    },
    {
      name: "Edit",
      icon: <FaPencilAlt size={25}/>,
      color: "text-yellow-400",
    },
    {
      name: "Delete",
      icon: <FaTrash size={25}/>,
      color: "text-red-400",
    },
  ];


  interface userInterface {
    data: {
      uploadType: string;
      subject:string;
      createdAt:any,
      uploadedBy:string
    }[];
  }
  
  const filterItems = ["Subject", "Upload Type"]
  export function ApprovalTable() {
    const [data, setData] = useState<any>();
    const [error, setError] = useState<string>()
    const [message, setMessage] = useState()
const {state} = useUser()

 useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://citadel-i-project.onrender.com/api/v1/uploads",
            {
              method: "GET",
              credentials: 'include',
              headers: {
                "Content-Type": "application/json",
              },
              // body: JSON.stringify(''),
            }
          );
  
          const result = await response.json();
          setData(result.data);
  
          console.log(result);
  
          !response.ok && setError(result?.message || "Something went wrong");
        } catch (error) {
          console.error(error);
          setError("Error connecting to server");
        }
      };
      fetchData();
    }, [data]);
    const [filter, setFilter] = useState('')
    const handleSelectFilter = (value:string) =>{
      setFilter(value)
    }
const filterBy = async ()=>{
  try {
    const response = await fetch(
      `https://citadel-i-project.onrender.com/api/v1/uploads/all`,
      {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(''),
      }
    );

    const result = await response.json();
    setData(result.data);

    console.log(result);

    !response.ok && setError(result?.message || "Something went wrong");
  } catch (error) {
    console.error(error);
    setError("Error connecting to server");
  }
};

const Approve = async (Type:string, id:number)=>{
  try {
    const response = await fetch(
      `https://citadel-i-project.onrender.com/api/v1/uploads/approve/${id}`,
      {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({uploadType:Type}),
      }
    );

    const result = await response.json();
    setMessage(result.message);
    console.log(result);

    !response.ok && setError(result?.message || "Something went wrong");
  } catch (error) {
    console.error(error);
    setError("Error connecting to server");
  }
};

const Disapprove = async (Type:string, id:number)=>{
  try {
    const response = await fetch(
      `https://citadel-i-project.onrender.com/api/v1/uploads/disapprove/${id}`,
      {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({uploadType:Type}),
      }
    );

    const result = await response.json();
    setMessage(result.message);

    console.log(result);

    !response.ok && setError(result?.message || "Something went wrong");
  } catch (error) {
    console.error(error);
    setError("Error connecting to server");
  }
};

    return (
    <section className="bg-white p-[16px] rounded-[8px]">
        <p>{message && message}</p>
    <form className="py-[8px] flex justify-between items-center flex-col md:flex-row gap-[8px] " onSubmit={filterBy}>
      <p className="font-[600]">Recent Uploads</p>  
    <button className="outline-none border-none bg-orange-500 px-[16px] py-[8px] text-white rounded-[8px]">View all</button>
    </form>
    <section className="rounded-md overflow-x-auto w-full px-1 mt-5">
  <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 font-semibold text-gray-700">Subject</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Upload Type</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Uploaded By</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Date</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Perform Actions</th>
      </tr>
    </thead>
<tbody className="divide-y divide-gray-100">
  {data && data.map((item:any, index:number) => (
    <tr key={index}>
      <td className="px-4 py-2">{item.subject}</td>
      <td className="px-4 py-2 text-xs md:text-sm">{item.uploadType}</td>
      <td className="px-4 py-2">{item.uploadedBy}</td>
      <td className="px-4 py-2">{item.createdAt}</td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
         <button onClick={()=>Approve(item.uploadType, item.id)}>Approve</button>
         <button onClick={()=>Disapprove(item.uploadType, item.id)}>Disapprove</button>
        </div>
      </td>
    </tr>
  ))}
</tbody>
  </table>
</section>
</section>
    );
  }
  
