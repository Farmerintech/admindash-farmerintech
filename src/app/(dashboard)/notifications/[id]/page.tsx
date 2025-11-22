"use client";

import { use } from 'react'; // ✅ React.use()
import { DashHook } from '@/app/components/dahHook';
import { useUser } from '@/app/context/reducer';
import { useSidebar } from '@/app/context/sideBarState';
import React, { useEffect, useState } from 'react';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ Unwrap the promise
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const { sidebarOpen } = useSidebar();
  const { state } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.citadel-i.com.ng/api/v1/notification/${id}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          setError(result?.message || "Something went wrong");
        } else {
          setData(result.data);
        }
      } catch (error) {
        console.error(error);
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <section className={`w-full px-[16px] pb-[24px] mt-6 min-h-screen ${sidebarOpen ? "hidden md:block" : ""}`}>
      <DashHook name="Dashboard Overview" />
      <main className="grid xl:grid-cols-4 md:grid-cols-2 mt-10 gap-[16px]">
        {loading && <p className="text-center py-4">Loading Notification...</p>}
        {!loading && error && <p className="text-red-500 text-center py-4">{error}</p>}
        {!loading && !data && <p className="text-gray-500 text-center py-4">No notification found.</p>}
        {data && (
          <div>
            <div className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded flex flex-col gap-[8px]">
              <p className="font-[600]">{data.title}</p>
              <p className="">{data.body}</p>
            </div>
          </div>
        )}
      </main>
    </section>
  );
}
