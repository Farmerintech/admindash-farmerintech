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
import { useUser } from "../context/reducer";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { subjects } from "./subjects";

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
      name: "Suspend",
      icon: <FaBan />,
      color: "text-orange-400",
    },
    {
      name: "Delete",
      icon: <FaTrash />,
      color: "text-red-400",
    },
  ];
  
  interface userInterface {
      userId: string;
      firstName: string;
      lastName:string;
      role: string;
      classCategory:string;
      subject:string;
      active:string
  }
      
  export function StudentsTable() {
    const {state} = useUser();
    const [data, setData] = useState<any>([])
    const [error, setError]  = useState<string>()
    const [filter, setFilter] = useState<string>('All')

useEffect(()=>{
    let url = filter !=='All'  ? `https://citadel-i-project.onrender.com/api/get_students/${filter}` :`https://citadel-i-project.onrender.com/api/get_tutors`
    const filterBy = async ()=>{

        try {
          const response = await fetch(
            url,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                credentials: 'include'
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
      filterBy()
}, [filter])

    const handleSelectFilter = (value:string) =>{
      setFilter(value)
    }

    // search
   const [search, setSearch] = useState<string>();
   const handleSearch = (event:ChangeEvent<HTMLInputElement>) =>{
    setSearch(event.target.value);
   }
  const handleSubmit = async (event:FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    if(!search){
      return
    }
    try {
        const response = await fetch(
          `https://citadel-i-project.onrender.com/api/get_tutors/${search}`,
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
    try {
      const response = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/get_users/${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            credentials: 'include'
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
  const filterItems = ["All", "KS1", "KS2", "KS3", "SSCE/IGCE"]
    return (
    <>
    <div className="w-full py-[8px] flex lg:items-center justify-between flex-col md:flex-wrap lg:flex-nowrap md:flex-row gap-[8px]">
            <p className="font-[600]">Registered Students</p>
        <form className="flex gap-[8px]" onSubmit={handleSubmit}>
            <input type="text" placeholder="Find user with their name or id" onChange={handleSearch}
             className=" xl:w-[350px] w-[100%] border-1 border-gray-200 outline-non px-[36px] py-[8px] bg-white rounded-[8px] "/>
            <button className="text-white bg-orange-500 border-none rounded-[8px] px-[16px] outline-none" type="submit">Serach</button>
        </form>
        <form className="w-full lg:w-auto">
        <Select onValueChange={handleSelectFilter}>
          <SelectTrigger className="md:w-full lg:w-[100%] w-full outline-none border-1 border-gray-200">
            <SelectValue placeholder='Filter By Class' />
          </SelectTrigger>
          <SelectContent>
            {
                filterItems.map((item)=>(
                    <SelectItem value={item}>{item}</SelectItem>
                ))
            }
            </SelectContent>
        </Select>
        </form>
    </div>
    <section className=" rounded-md over-flow-x-scroll w-[full] px-[4px]">
      <Table className="table-fixed overflow-x-scroll">
        <TableHeader className="bg-gray-100 ">
          <TableRow>
            <TableHead>UserID</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Perform Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data && data.map((user:userInterface) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userId}</TableCell>
              <TableCell className="text-[12px] md:text-[14px]">{user.firstName} {user.lastName}</TableCell>
              <TableCell>{user.classCategory }</TableCell>
              <TableCell>{user.active ? "active" : "Suspended"}</TableCell>
              <TableCell className="text-right flex items-center gap-[8px]">
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
      </>
    );
  }
  