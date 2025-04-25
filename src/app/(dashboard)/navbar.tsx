"use client"
import React, { useState } from 'react'
import Link from 'next/link'

import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { FaUserGraduate, FaClipboardList, FaCogs } from "react-icons/fa";
import { MdDashboard, MdOutlineMessage, MdAssignment, MdLogout, MdSettings } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { useUser } from '../context/reducer';
import Logo from "@/app/assets/Logo.svg"
import admin from "@/app/assets/admin.jpg"
export default function SidebarLayo() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const Togglebuttn = () => {
    setSidebarOpen(!sidebarOpen);
  };
 const {state, dispatch} = useUser()
  const menuItems = [
    { name: "Manage Students", href: "/manage_students", icon: <GiTeacher /> },
    { name: "Manage Teachers", href: "/student", icon: <FaUserGraduate /> },
    { name: "Manage Content", href: "/attendance", icon: <AiOutlineSchedule /> },
    { name: "Approval", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Addmission Info", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Sponsorship", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Payments", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Analytics", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Help desk", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Setting", href: "/settings", icon: <MdSettings /> },
    { name: "Logout", href: "/result", icon: <MdLogout /> },
    
    
  ];
console.log(state)
  return (
    <>
    <section className='bg-[#FFFFFF] px-[24px] py-[16px] flex items-center justify-between border-b-[0.5px]'>
      <div className='md:hidden text-[#FFEEE6] '>
      <Button variant="outline" className='md:hidden bg-[#FF5900] outline-none border-none' onClick={Togglebuttn}>
          <GiHamburgerMenu />
        </Button>
      </div>
      <div className='hidden lg:block'>
        <Image src={Logo} width={227} height={41} alt='logo'/>
      </div>
      <div className='md:flex items-center justify-center gap-[32px] hidden'>
        <div className='px-[16px] py-[8px] gap-[8px] bg-[#FFEEE6] rounded-[8px] flex'>
          <span>
          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.6199 10.5V6.8C20.6199 5.11984 20.6199 4.27976 20.2929 3.63803C20.0053 3.07354 19.5463 2.6146 18.9818 2.32698C18.3401 2 17.5 2 15.8199 2H9.41987C7.73972 2 6.89964 2 6.2579 2.32698C5.69342 2.6146 5.23447 3.07354 4.94685 3.63803C4.61987 4.27976 4.61987 5.11984 4.61987 6.8V17.2C4.61987 18.8802 4.61987 19.7202 4.94685 20.362C5.23447 20.9265 5.69342 21.3854 6.2579 21.673C6.89964 22 7.73972 22 9.41987 22H12.6199M14.6199 11H8.61987M10.6199 15H8.61987M16.6199 7H8.61987M18.6199 21V15M15.6199 18H21.6199" stroke="#FF5900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
          <span className='text-[#FF5900]'>Upload Class notes</span>
        </div>
        <div className='px-[16px] py-[8px] gap-[8px] bg-white border-[#0F0F0F] border-1 rounded-[8px] flex '>
          <span>
          <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.6199 9.5V5.8C17.6199 4.11984 17.6199 3.27976 17.2929 2.63803C17.0053 2.07354 16.5463 1.6146 15.9818 1.32698C15.3401 1 14.5 1 12.8199 1H6.41987C4.73972 1 3.89964 1 3.2579 1.32698C2.69342 1.6146 2.23447 2.07354 1.94685 2.63803C1.61987 3.27976 1.61987 4.11984 1.61987 5.8V16.2C1.61987 17.8802 1.61987 18.7202 1.94685 19.362C2.23447 19.9265 2.69342 20.3854 3.2579 20.673C3.89964 21 4.73972 21 6.41987 21H9.61987M11.6199 10H5.61987M7.61987 14H5.61987M13.6199 6H5.61987M15.6199 20V14M12.6199 17H18.6199" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
          <span className='text-[#0F0F0F]'>Upload Class notes</span>
        </div>
      </div>
      <div className='flex gap-[56px] items-center'>
        <div className='flex gap-[24px]'>
          <span>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> 
          <rect width="28" height="28" rx="16" fill="#FBE3B0"/>
          <path d="M25 25L20.65 20.65M23 15C23 19.4183 19.4183 23 15 23C10.5817 23 7 19.4183 7 15C7 10.5817 10.5817 7 15 7C19.4183 7 23 10.5817 23 15Z" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
          <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
          <span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </span>
        </div>
        <div className='flex gap-[8px]'>
          <Image src={admin}  alt=' ' className='h-[40px] w-[40px] rounded-[20px]'/>
          <div>
            <p className='text-[16px] font-[500] flex gap-[8px] items-center '>Mr. {state?.firstName} 
              <span>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#98A2B3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              </span>
            </p>
            <span className='text-[14px] font-[400]'>{state?.role}</span>
          </div>
        </div>
      </div>
    </section>
      
      {/* Desktop Sidebar */}
      <div className='absolute lg:w-[20%] md:top-20 left-0 z-10 md:w-[25%] py-[19px] 
      hidden md:flex flex-col shadow h-[110%] bg-white'>
        <span className="flex flex-col gap-3">   
          <p className="text-[#FF5900] text-[14px] px-[16px] py-[10px] bg-[#FFEEE6] flex gap-[8px]">
            <span>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.66663 4.16667C1.66663 3.39011 1.66663 3.00182 1.79346 2.69553C1.96263 2.28716 2.28713 1.9627 2.69546 1.79354C3.00179 1.66667 3.39004 1.66667 4.16663 1.66667H5.83329C6.60988 1.66667 6.99813 1.66667 7.30446 1.79354C7.71279 1.9627 8.03729 2.28716 8.20646 2.69553C8.33329 3.00182 8.33329 3.39011 8.33329 4.16667C8.33329 4.94324 8.33329 5.33152 8.20646 5.63781C8.03729 6.04619 7.71279 6.37065 7.30446 6.53981C6.99813 6.66667 6.60988 6.66667 5.83329 6.66667H4.16663C3.39004 6.66667 3.00179 6.66667 2.69546 6.53981C2.28713 6.37065 1.96263 6.04619 1.79346 5.63781C1.66663 5.33152 1.66663 4.94324 1.66663 4.16667Z" stroke="#FF5900" stroke-width="1.5"/>
            </svg>
            </span>
            Dashboard
            </p>
        </span>
        <ul className='md:text-[16px]  pt-4  flex flex-col gap-[15px] px-2'>
          {menuItems.map(({ name, href, icon }) => (
            <li key={name}>
              <Button
                variant="ghost"
                className={`w-[90%] px-5 ${pathname === href ? 'bg-[#FFEEE6] text-white' : ''}`}
              >
                <Link href={href} className='flex gap-2 items-center font-[400] text-[16px] text-[#1D2939]'>
                  {icon} {name}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      {sidebarOpen && (
        <div className="md:hidden block w-[100%] bg-white h-[130%] shadow-lg p-4 absolute top-20 left-0  z-10">
          <ul className='md:text-[16px] text-[#130F26] flex flex-col gap-[19px] text-[8px]'>
            {menuItems.map(({ name, href, icon }) => (
              <li key={name}>
                <Button
                  variant="ghost"
                  className={`w-[90%] px-5 ${pathname === href ? 'bg-[#FFEEE6] hover:bg-[#FFEEE6]' : ''}`}
                >
                  <Link href={href} className='flex gap-2 items-center text-[16px] text-[#130F26]'>
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
