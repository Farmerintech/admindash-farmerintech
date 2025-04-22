"use client"
import React, { useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { FaUserGraduate, FaClipboardList, FaCogs } from "react-icons/fa";
import { MdDashboard, MdOutlineMessage, MdAssignment } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";

export default function SidebarLayo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const Togglebuttn = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { name: "Teachers Profile", href: "/teacher", icon: <GiTeacher /> },
    { name: "Students", href: "/student", icon: <FaUserGraduate /> },
    { name: "Attendance", href: "/attendance", icon: <AiOutlineSchedule /> },
    { name: "Subjects Management", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Exams and Grading", href: "/result", icon: <MdAssignment /> },
    
    
    { name: "Setting", href: "/settings", icon: <FaCogs /> },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="flex justify-between w-[90%] m-auto py-3">
        <span className="flex flex-col gap-3 md:hidden">   
          <div className="flex gap-3 items-center">
        
            <span className="h-[30px] w-[40px]"> s</span>
          </div>
          <p className="text-[#4B5320] text-[14px]">Wisdom, Discipline and Diligence </p>
        </span>
        <Button variant="outline" className='md:hidden bg-[#4B5320]' onClick={Togglebuttn}>
          <GiHamburgerMenu />
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className='fixed lg:w-[15%] md:top-0 left-0 z-10 md:w-[20%] py-[19px] 
      hidden md:flex flex-col shadow-lg h-[100%]'>
        <span className="flex flex-col pl-5 gap-3">   
          <div className="flex gap-[15px] items-center">
            
            <span className="h-[30px] w-[40px]"></span>
          </div>
          <p className="text-[#4B5320] text-[12px]">Wisdom, Discipline and Diligence </p>
        </span>
        <ul className='md:text-[18px] font-semibold pt-4 text-[#130F26] flex flex-col gap-[15px] px-2'>
          {menuItems.map(({ name, href, icon }) => (
            <li key={name}>
              <Button
                variant="ghost"
                className={`w-[90%] px-5 ${pathname === href ? 'bg-gray-300 text-white' : ''}`}
              >
                <Link href={href} className='flex gap-2 items-center text-[12px] text-[#130F26]'>
                  {icon} {name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {sidebarOpen && (
        <div className="block w-[100%] bg-[#4B5320] shadow-lg p-4">
          <ul className='md:text-[18px] text-[#130F26] flex flex-col gap-[19px] text-[8px]'>
            {menuItems.map(({ name, href, icon }) => (
              <li key={name}>
                <Button
                  variant="ghost"
                  className={`w-[90%] px-5 ${pathname === href ? 'bg-gray-300' : ''}`}
                >
                  <Link href={href} className='flex gap-2 items-center text-[18px] text-[#130F26]'>
                    {icon} {name}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
