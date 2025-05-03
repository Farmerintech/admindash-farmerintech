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
  
  const filterItems = ["Subject", "Upload type"]
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
              headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${state.token}`,
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

    return (
    <section className="bg-white p-[16px] rounded-[8px]">
    <form className="py-[8px] flex justify-between flex-col md:flex-row gap-[8px] ">
        <Select >
          <SelectTrigger className="md:w-[300px] lg:w-[350px] w-[100%] outline-none border-1 border-gray-200">
            <SelectValue placeholder='Filter By' />
          </SelectTrigger>
          <SelectContent>
            {
                filterItems.map((item)=>(
                    <SelectItem value={item}>{item}</SelectItem>
                ))
            }
            </SelectContent>
        </Select>
        <button className="outline-none border-none bg-orange-500 px-[8px] text-white rounded-[4px]">View all</button>
    </form>
    <section className="bg-gray-100 rounded-md over-flow-x-scroll w-[full] px-4 mt-5">
      <Table className="table-fixed overflow-x-scroll">
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead >Upload Type</TableHead>
            <TableHead>Uploaded By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Perform Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((item:any, index:any) => (
            <TableRow key={index}>
              <TableCell>{item.subject}</TableCell>
              <TableCell className="text-[12px] md:text-[14px]">{item.uploadType}</TableCell>
              <TableCell>{item.uploadedBy}</TableCell>
              <TableCell>{item.createdAt}</TableCell>
              <TableCell className="text-right flex items-center gap-[8px]">
                {actions.map((action, index) => (
                  <p
                    key={index}
                    className={`${action.color} cursor-pointer flex items-center text-[12px] gap-[8px]`}
                  >
                    <span className="hidden md:block">{action.name}</span>
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
  