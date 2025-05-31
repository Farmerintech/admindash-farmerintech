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

  const actions = [
    {
      name: "View",
      icon: <FaEye />,
      color: "text-blue-400",
    },
    {
      name: "Edit",
      icon: <FaPencilAlt />,
      color: "text-yellow-400",
    },
    {
      name: "Delete",
      icon: <FaTrash />,
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
  export function UploadsTable() {
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
      `https://citadel-i-project.onrender.com/api/v1/uploads/${filter}`,
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

    return (
    <section className="bg-white p-[16px] rounded-[8px]">
    <form className="py-[8px] flex justify-between items-center flex-col md:flex-row gap-[8px] " onSubmit={filterBy}>
      <p className="font-[600]">Recent Uploads</p>  
    <button className="outline-none border-none bg-orange-500 px-[8px] text-white rounded-[4px]">View all</button>
    </form>
    <section className="rounded-md over-flow-x-scroll w-[full] px-[4px] mt-5">
      <Table className="  overflow-x-scroll">
        <TableHeader className="bg-gray-100 w-full">
          <TableRow>
            <TableHead >Subject</TableHead>
            <TableHead >Upload Type</TableHead>
            <TableHead >Uploaded By</TableHead>
            <TableHead >Date</TableHead>
            <TableHead >Perform Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((item:any, index:any) => (
            <TableRow key={index}>
              <TableCell>{item.subject}</TableCell>
              <TableCell className="text-[12px] md:text-[14px]">{item.uploadType}</TableCell>
              <TableCell>{item.uploadedBy}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell className="flex items-center gap-[8px]">
                {actions.map((action, index) => (
                  <p
                    key={index}
                    className={`${action.color} cursor-pointer flex items-center text-[12px] gap-[8px]`}
                  >
                    {/* <span className="hidden md:block">{action.name}</span> */}
                    {action.icon}
                  </p>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </section>
      </section>
    );
  }
  