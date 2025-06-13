'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { FaUserGraduate, FaClipboardList, FaPaypal } from "react-icons/fa";
import { MdDashboard, MdLogout, MdSettings } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { useUser } from '../context/reducer';
import { useSidebar } from '../context/sideBarState';
import Cookies from 'js-cookie';
import Logo from "@/app/assets/Logo.svg"
import admin from "@/app/assets/admin.jpg"
import { Notifications } from '../components/notifications';

export default function SidebarLayo() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const { state, dispatch } = useUser();
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", href: "/dashboards", icon: <MdDashboard /> },
    { name: "Manage Students", href: "/manage_students", icon: <GiTeacher /> },
    { name: "Manage Teachers", href: "/manage_teachers", icon: <FaUserGraduate /> },
    { name: "Manage Content", href: "/manage_content", icon: <AiOutlineSchedule /> },
    { name: "Approval", href: "/approval", icon: <FaClipboardList /> },
    { name: "Payments", href: "/payment", icon: <FaPaypal /> },
    { name: "Settings", href: "/settings", icon: <MdSettings /> },
    { name: "Logout", href: "/logout", icon: <MdLogout /> },
  ];

  const handleLogout = () => {
    Cookies.remove('token');
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  return (
    <>
      <aside className="md:col-span-1">
        <div className="z-10 py-[19px] hidden md:flex flex-col bg-white ">
          <ul className="md:text-[16px] pt-4 flex flex-col gap-[15px] px-2">
            {menuItems.map(({ name, href, icon }, index) => (
              <li key={index}>
                {name === "Logout" ? (
                  <Button
                    variant="ghost"
                    className="w-[90%] px-6"
                    onClick={handleLogout}
                  >
                    <span className="flex gap-2 items-center font-[400] text-[16px] text-[#1D2939]">
                      {icon} {name}
                    </span>
                  </Button>
                ) : (
                  <Link href={href}>
                    <Button
                      variant="ghost"
                      className={`w-[90%] px-6 ${pathname === href ? 'bg-[#FFEEE6] text-[#FF5900]' : ''}`}
                    >
                      <span className="flex gap-2 items-center font-[400] text-[16px] text-[#1D2939]">
                        {icon} {name}
                      </span>
                    </Button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="md:hidden absolute w-full block bg-white min-h-screen z-20">
          <Header />
          <ul className="md:text-[16px] text-[#130F26] flex flex-col gap-[19px] text-[8px] px-4 py-2">
            {menuItems.map(({ name, href, icon }) => (
              <li key={name}>
                {name === "Logout" ? (
                  <Button
                    variant="ghost"
                    className="w-full px-5 text-left"
                    onClick={handleLogout}
                  >
                    <span className="flex gap-2 items-center text-[16px] text-[#130F26]">
                      {icon} {name}
                    </span>
                  </Button>
                ) : (
                  <Link href={href}>
                    <Button
                      variant="ghost"
                      className={`w-full px-5 text-left ${pathname === href ? 'bg-[#FFEEE6] text-[#FF5900]' : ''}`}
                      onClick={()=>{setSidebarOpen(false)}}
                    >
                      <span className="flex gap-2 items-center text-[16px] text-[#130F26]">
                        {icon} {name}
                      </span>
                    </Button>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export const Header = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  const toggleButton = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { state, dispatch } = useUser();
  const [show, setShow] = useState(false)
   const handleShow = () => {
    setShow(!show);
  };
  const [data, setData] = useState<any>()
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "https://citadel-i-project.onrender.com/api/v1/notification/receive",
            {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          const result = await response.json();
          if (!response.ok) {
            // setError(result?.message || "Something went wrong");
          } else {
            setData(result);
          }
        } catch (error) {
          console.error(error);
          // setError("Error connecting to server");
        } finally {
          // setLoading(false);
        }
      };
      fetchData();
    }, []);
  
  
  return (
    <section className='bg-[#FFFFFF] px-[24px] py-[16px] flex items-center justify-between border-b-[0.5px]'>
      <div className='md:hidden text-[#FFEEE6] '>
        <Button variant="outline" className='md:hidden bg-[#FF5900] outline-none border-none' onClick={toggleButton}>
          <GiHamburgerMenu />
        </Button>
      </div>
    <div className='hidden md:block'>
        <Image src={Logo} width={180} height={35} alt='logo'/>
      </div>
    <div className='lg:flex items-center justify-center gap-[32px] hidden'>
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
        <div>
          <span onClick={()=>{handleShow()}} className='relative'>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.35419 21C10.0593 21.6224 10.9856 22 12 22C13.0145 22 13.9407 21.6224 14.6458 21M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z" stroke="#0F0F0F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p className={`${data?.count ? "absolute top-0 left-2 bg-orange-500 w-[20px] h-[20px] text-[12px] text-white rounded-full text-center":"hidden"}`}>{data ? data?.count :0}</p>
        </span>
        <div className={`${show ? "absolute top-[55px] right-[120px] flex bg-red-600 shadow-md":"hidden"}`}>
          <Notifications/>
        </div>
        </div>
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
  );
}
