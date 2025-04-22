import Navbar from './navbar';

import { redirect } from "next/navigation";

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="w-full   min-h-[100dvh]">
      <Navbar/>  
      {children}
 
    </div>
  );
}
