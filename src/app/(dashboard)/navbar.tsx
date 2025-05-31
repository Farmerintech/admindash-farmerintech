'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { GiHamburgerMenu, GiTeacher } from "react-icons/gi";
import { FaUserGraduate, FaClipboardList, FaPaypal } from "react-icons/fa";
import { MdDashboard, MdLogout } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { useUser } from '../context/reducer';
import { useSidebar } from '../context/sideBarState';
import Cookies from 'js-cookie';
import Logo from "@/app/assets/Logo.svg"

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
    { name: "Approval", href: "/coursemgt", icon: <FaClipboardList /> },
    { name: "Payments", href: "/coursemgt", icon: <FaPaypal /> },
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

  return (
    <section className='bg-[#FFFFFF] px-[24px] py-[16px] flex items-center justify-between border-b-[0.5px]'>
      <div className='md:hidden text-[#FFEEE6] '>
        <Button variant="outline" className='md:hidden bg-[#FF5900] outline-none border-none' onClick={toggleButton}>
          <GiHamburgerMenu />
        </Button>
      </div>
      <div className='hidden md:block'>
        <Image src={Logo} width={180} height={35} alt='logo' />
      </div>
      <div className='flex gap-[56px] items-center'>
        {/* You can add additional right-side controls here */}
      </div>
    </section>
  );
}
