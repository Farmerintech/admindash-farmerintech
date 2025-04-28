"use client"

import { DashHook } from '@/app/components/dahHook';
import { UsersTable } from '@/app/components/usersTable';
import { useUser } from '@/app/context/reducer'
import { useSidebar } from '@/app/context/sideBarState';
import React, { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa';

export default function page() {
  const [data, setData] = useState<any>({})
  const [error, setError]  = useState<string>()
    const { sidebarOpen, setSidebarOpen } = useSidebar();
    const {state}=useUser()
  useEffect( ()=>{
    const fetchData = async ()=>{
      try {
        const response = await fetch('https://citadel-i-project.onrender.com/api/v1/admin/get_users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "authorization":`Bearer ${state.token}`
          },
          // body: JSON.stringify(data)
        });
  
        const result = await response.json();
        setData(result);
  
         console.log(data)
   
          !response.ok && setError(result?.message || 'Something went wrong');
        
  
      } catch (error) {
        console.error(error);
        setError('Error connecting to server');
      }
  
    }
    fetchData()
  }, [data])
  
  const filterItems= ['By Teachers', 'By Students']
  const percentageStd = data && Math.ceil((data.count?.totalStudents/data.count?.totalUser)*100)||''
  const percentageTutor = data && Math.ceil((data.count?.totalTeachers/data.count?.totalUser)*100)||''
    return(
      <section className={`w-ful px-[16px] pb-[24px] mt-6 min-h-screen ${sidebarOpen && "hidden md:block"}`}>
      <DashHook name={"Dashboard Overview"}/>
    <main className='grid xl:grid-cols-4 md:grid-cols-2 mt-10 gap-[16px]'>
      <div className='bg-[#FFFFFF] p-[16px] gap-[10px] rounded-[8px] flex items-start justify-between'>
        <div className='flex flex-col gap-[16px]'>
          <p>Registered Students</p>
          <div className='flex items-center gap-[8px]'>
              <p className='text-[#0F0F0F] text-[24px] font-[700]'>{data && data.count?.totalStudents || ''}</p> 
              <div className='flex text-[#0DAF64] text-[12px] '>
                 <FaArrowUp/>
                 <p>{percentageStd}%</p>
              </div>
            </div>
          <p className='text-[#0DAF64] text-[12px] '>4 today</p>
        </div>
        <div>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#FFEEE6"/>
          <path d="M26.0001 23.8369C27.456 24.5683 28.7042 25.742 29.6153 27.2096C29.7957 27.5003 29.886 27.6456 29.9172 27.8468C29.9805 28.2558 29.7009 28.7585 29.32 28.9204C29.1326 29 28.9218 29 28.5001 29M24.0001 19.5322C25.4818 18.7959 26.5001 17.2669 26.5001 15.5C26.5001 13.7331 25.4818 12.2041 24.0001 11.4678M22.0001 15.5C22.0001 17.9853 19.9854 20 17.5001 20C15.0148 20 13.0001 17.9853 13.0001 15.5C13.0001 13.0147 15.0148 11 17.5001 11C19.9854 11 22.0001 13.0147 22.0001 15.5ZM10.5593 26.9383C12.1536 24.5446 14.6695 23 17.5001 23C20.3307 23 22.8465 24.5446 24.4409 26.9383C24.7901 27.4628 24.9648 27.725 24.9446 28.0599C24.929 28.3207 24.758 28.64 24.5496 28.7976C24.282 29 23.9139 29 23.1777 29H11.8224C11.0863 29 10.7182 29 10.4505 28.7976C10.2421 28.64 10.0712 28.3207 10.0555 28.0599C10.0354 27.725 10.21 27.4628 10.5593 26.9383Z" stroke="#FF5900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </div>
      </div>
      <div className='bg-[#FFFFFF] p-[16px] gap-[10px] rounded-[8px] flex items-start justify-between'>
        <div className='flex flex-col gap-[16px]'>
          <p>Registered Teachers</p>
          <div className='flex items-center gap-[8px]'>
              <p className='text-[#0F0F0F] text-[24px] font-[700]'>{data && data.count?.totalTeachers || ''}</p> 
              <div className='flex text-[#0DAF64] text-[12px] '>
                 <FaArrowUp/>
                 <p>{percentageTutor}%</p>
              </div>
            </div>
          <p className='text-[#0DAF64] text-[12px] '>2 today</p>
        </div>
        <div>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#FFEEE6"/>
          <path d="M26.0001 23.8369C27.456 24.5683 28.7042 25.742 29.6153 27.2096C29.7957 27.5003 29.886 27.6456 29.9172 27.8468C29.9805 28.2558 29.7009 28.7585 29.32 28.9204C29.1326 29 28.9218 29 28.5001 29M24.0001 19.5322C25.4818 18.7959 26.5001 17.2669 26.5001 15.5C26.5001 13.7331 25.4818 12.2041 24.0001 11.4678M22.0001 15.5C22.0001 17.9853 19.9854 20 17.5001 20C15.0148 20 13.0001 17.9853 13.0001 15.5C13.0001 13.0147 15.0148 11 17.5001 11C19.9854 11 22.0001 13.0147 22.0001 15.5ZM10.5593 26.9383C12.1536 24.5446 14.6695 23 17.5001 23C20.3307 23 22.8465 24.5446 24.4409 26.9383C24.7901 27.4628 24.9648 27.725 24.9446 28.0599C24.929 28.3207 24.758 28.64 24.5496 28.7976C24.282 29 23.9139 29 23.1777 29H11.8224C11.0863 29 10.7182 29 10.4505 28.7976C10.2421 28.64 10.0712 28.3207 10.0555 28.0599C10.0354 27.725 10.21 27.4628 10.5593 26.9383Z" stroke="#FF5900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      </div>
      </div>
      <div className='bg-[#FFFFFF] p-[16px] gap-[10px] rounded-[8px] flex items-start justify-between'>
        <div className='flex flex-col gap-[16px]'>
          <p>Recent Payments</p>
          <div className='flex items-center gap-[8px]'>
              <p className='text-[#0F0F0F] text-[24px] font-[700]'>N300</p> 
              <div className='flex text-[#0DAF64] text-[12px] '>
                 <FaArrowUp/>
                 <p>0.4%</p>
              </div>
            </div>
          <p className='text-[#0DAF64] text-[12px] '>Class access & Bookings</p>
        </div>
        <div>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#FFEEE6"/>
        <path d="M14 19V23M26 17V21M25 12C27.4487 12 28.7731 12.3748 29.4321 12.6654C29.5199 12.7042 29.5638 12.7235 29.6904 12.8444C29.7663 12.9168 29.9049 13.1294 29.9405 13.2281C30 13.3927 30 13.4827 30 13.6627V24.4111C30 25.3199 30 25.7743 29.8637 26.0079C29.7251 26.2454 29.5914 26.3559 29.3319 26.4472C29.0769 26.5369 28.562 26.438 27.5322 26.2401C26.8114 26.1017 25.9565 26 25 26C22 26 19 28 15 28C12.5513 28 11.2269 27.6252 10.5679 27.3346C10.4801 27.2958 10.4362 27.2765 10.3096 27.1556C10.2337 27.0832 10.0951 26.8706 10.0595 26.7719C10 26.6073 10 26.5173 10 26.3373L10 15.5889C10 14.6801 10 14.2257 10.1363 13.9921C10.2749 13.7546 10.4086 13.6441 10.6681 13.5528C10.9231 13.4631 11.438 13.562 12.4678 13.7598C13.1886 13.8983 14.0435 14 15 14C18 14 21 12 25 12ZM22.5 20C22.5 21.3807 21.3807 22.5 20 22.5C18.6193 22.5 17.5 21.3807 17.5 20C17.5 18.6193 18.6193 17.5 20 17.5C21.3807 17.5 22.5 18.6193 22.5 20Z" stroke="#FF5900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      </div>
      <div className='bg-[#FFFFFF] p-[16px] gap-[10px] rounded-[8px] flex items-start justify-between'>
        <div className='flex flex-col gap-[16px]'>
          <p>Booked Seasons</p>
          <div className='flex items-center gap-[8px]'>
              <p className='text-[#0F0F0F] text-[24px] font-[700]'>100</p> 
              <div className='flex text-[#0DAF64] text-[12px] '>
                 <FaArrowUp/>
                 <p>0.4%</p>
              </div>
            </div>
          <p className='text-[#0DAF64] text-[12px] '>Tutor & counselling</p>
        </div>
        <div>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="#FFEEE6"/>
        <path d="M11 24V15.2C11 14.0799 11 13.5198 11.218 13.092C11.4097 12.7157 11.7157 12.4097 12.092 12.218C12.5198 12 13.0799 12 14.2 12H25.8C26.9201 12 27.4802 12 27.908 12.218C28.2843 12.4097 28.5903 12.7157 28.782 13.092C29 13.5198 29 14.0799 29 15.2V24H23.6627C23.4182 24 23.2959 24 23.1808 24.0276C23.0787 24.0521 22.9812 24.0925 22.8917 24.1474C22.7908 24.2092 22.7043 24.2957 22.5314 24.4686L22.4686 24.5314C22.2957 24.7043 22.2092 24.7908 22.1083 24.8526C22.0188 24.9075 21.9213 24.9479 21.8192 24.9724C21.7041 25 21.5818 25 21.3373 25H18.6627C18.4182 25 18.2959 25 18.1808 24.9724C18.0787 24.9479 17.9812 24.9075 17.8917 24.8526C17.7908 24.7908 17.7043 24.7043 17.5314 24.5314L17.4686 24.4686C17.2957 24.2957 17.2092 24.2092 17.1083 24.1474C17.0188 24.0925 16.9213 24.0521 16.8192 24.0276C16.7041 24 16.5818 24 16.3373 24H11ZM11 24C10.4477 24 10 24.4477 10 25V25.3333C10 25.9533 10 26.2633 10.0681 26.5176C10.2531 27.2078 10.7922 27.7469 11.4824 27.9319C11.7367 28 12.0467 28 12.6667 28H27.3333C27.9533 28 28.2633 28 28.5176 27.9319C29.2078 27.7469 29.7469 27.2078 29.9319 26.5176C30 26.2633 30 25.9533 30 25.3333C30 25.0233 30 24.8683 29.9659 24.7412C29.8735 24.3961 29.6039 24.1265 29.2588 24.0341C29.1317 24 28.9767 24 28.6667 24H28" stroke="#FF5900" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      </div>

    </main>
    <section className="py-[8px] flex flex-col gap-[8px] bg-white mt-20 rounded-[8px] px-[16px]">
      {data &&
      <UsersTable Placeholder="Role"   users={data?.users ?? []} filterItems={filterItems}/>
      }
    </section>
    
    </section>
  )
}
