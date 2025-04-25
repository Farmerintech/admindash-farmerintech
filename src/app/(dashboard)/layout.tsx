import Navbar from './navbar';

import { redirect } from "next/navigation";

export default async function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="w-full   min-h-[100vh] bg-gray-100">
      <Navbar/>  
      {children}
 
    </div>
  );
}
