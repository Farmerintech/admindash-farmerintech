import { useUser } from '@/app/context/reducer'
import React from 'react'

export default function page() {
  const date = new Date('2025-02-05');
  const options:any = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);  
    return (
    <section className="md:ml-[20%] lg:ml-[17%] md:w-[80%] w-[100%] ">
    <div className='flex justify-between  '>
      <div className='w-[244px]'>
      <p className='font-[600] text-[24px]'>Dashboard Overview</p>
      </div>
      <div className='w-[239]'>
      <p className='flex gap-[8px]'>
        <span>
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8.33334H1M11.8333 1.66667V5.00001M5.16667 1.66667V5.00001M7.25 11.6667L8.5 10.8333V15M7.45833 15H9.54167M5 18.3333H12C13.4001 18.3333 14.1002 18.3333 14.635 18.0609C15.1054 17.8212 15.4878 17.4387 15.7275 16.9683C16 16.4335 16 15.7335 16 14.3333V7.33334C16 5.93321 16 5.23314 15.7275 4.69836C15.4878 4.22796 15.1054 3.84551 14.635 3.60582C14.1002 3.33334 13.4001 3.33334 12 3.33334H5C3.59987 3.33334 2.8998 3.33334 2.36502 3.60582C1.89462 3.84551 1.51217 4.22796 1.27248 4.69836C1 5.23314 1 5.93321 1 7.33334V14.3333C1 15.7335 1 16.4335 1.27248 16.9683C1.51217 17.4387 1.89462 17.8212 2.36502 18.0609C2.8998 18.3333 3.59987 18.3333 5 18.3333Z" stroke="#344054" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </span>
        <span>{formattedDate}</span>
      </p>
      </div>
      <div className='w-[300px]'>
      <p className='flex gap-[8px]'>Last updated:
      <span>
        <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8.33334H1M11.8333 1.66667V5.00001M5.16667 1.66667V5.00001M7.25 11.6667L8.5 10.8333V15M7.45833 15H9.54167M5 18.3333H12C13.4001 18.3333 14.1002 18.3333 14.635 18.0609C15.1054 17.8212 15.4878 17.4387 15.7275 16.9683C16 16.4335 16 15.7335 16 14.3333V7.33334C16 5.93321 16 5.23314 15.7275 4.69836C15.4878 4.22796 15.1054 3.84551 14.635 3.60582C14.1002 3.33334 13.4001 3.33334 12 3.33334H5C3.59987 3.33334 2.8998 3.33334 2.36502 3.60582C1.89462 3.84551 1.51217 4.22796 1.27248 4.69836C1 5.23314 1 5.93321 1 7.33334V14.3333C1 15.7335 1 16.4335 1.27248 16.9683C1.51217 17.4387 1.89462 17.8212 2.36502 18.0609C2.8998 18.3333 3.59987 18.3333 5 18.3333Z" stroke="#344054" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </span>
        <span>{formattedDate}</span>
      </p>
      </div>
    </div>
    </section>
  )
}
