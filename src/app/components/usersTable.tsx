"use client"


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
      
  

  export function UsersTable() {

    const {state} = useUser();
    const [data, setData] = useState<any>([])
    const [error, setError]  = useState<string>()
    const [filter, setFilter] = useState('All')

    const filterItems= ["All Users", 'Teachers', 'Students']

    const handleSelectFilter = (value:string) =>{
      setFilter(value)
    }
  
useEffect(() => {
  const filterBy = async () => {
    // Construct URL based on filter
    const url =
      filter && filter !== 'All'
        ? `https://citadel-i-project.onrender.com/api/v1/admin/get_users/${filter}`
        : `https://citadel-i-project.onrender.com/api/v1/admin/get_users`;

    try {
      setError('null'); // Clear previous errors before fetching

      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include', // include cookies
        headers: {
            "Content-Type": "application/json",
          },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result?.message || 'Something went wrong');
      } else {
        setData(result.users);
      }

      console.log(result);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error connecting to server');
    }
  };

  filterBy();
}, [filter]);

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
        `https://citadel-i-project.onrender.com/api/v1/admin/get_users/${search}`,
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
    <>
    <div className="w-full py-[8px] flex lg:items-center justify-between flex-col md:flex-wrap lg:flex-nowrap md:flex-row gap-[8px]">
      <p className="font-[600]">Registered Users</p>
        <form className="flex gap-[8px]" onSubmit={handleSubmit}>
            <input type="text" 
            onChange={handleSearch}
            placeholder="Find user with their name or id" className=" xl:w-[350px] w-[100%] border-1 border-gray-200 outline-non px-[36px] py-[8px] bg-white rounded-[8px] "/>
            <button className="text-white bg-orange-500 border-none rounded-[8px] px-[16px] outline-none" type="submit">Serach</button>
        </form>
        <form className="w-full lg:w-auto">
        <Select onValueChange={handleSelectFilter}>
          <SelectTrigger className="md:w-full lg:w-[100%] w-full outline-none border-1 border-gray-200">
            <SelectValue placeholder='Filter by Role' />
          </SelectTrigger>
          <SelectContent>
            {
                filterItems.map((item, index)=>(
                <SelectItem key= {index} value={item==='Teachers' ? 'tutor': item==="All Users" ? "All":'student'}>{item}</SelectItem>
                ))
            }
            </SelectContent>
        </Select>
        </form>
    </div>
<section className="rounded-md overflow-x-auto w-full mt-5">
  <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-2 font-semibold text-gray-700">Name</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Role</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Status</th>
        <th className="px-4 py-2 font-semibold text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      {data && data.length > 0 ? (
        data.map((user:any, index:number) => (
          <tr key={user.userId || index}>
            <td className="px-4 py-2 whitespace-nowrap">{user.firstName} {user.lastName}</td>
            <td className="px-4 py-2">{user.role}</td>
            <td className="px-4 py-2">
              {user.active ? (
                <span className="text-green-600 font-medium">Active</span>
              ) : (
                <span className="text-red-500 font-medium">Suspended</span>
              )}
            </td>
            <td className="px-4 py-2">
              <div className="flex items-center gap-2 flex-wrap">
                {actions.map((action, idx) => (
                  <span
                    key={idx}
                    className={`${action.color} text-xs flex items-center gap-1 cursor-pointer`}
                  >
                    {/* <span className="hidden md:inline">{action.name}</span> */}
                    {action.icon}
                  </span>
                ))}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center py-4 text-gray-500">
            No users found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</section>
      </>
    );
  }
  
