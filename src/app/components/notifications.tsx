import Link from "next/link";
import { useEffect, useState } from "react";

interface NotifyItem {
  id: number;
  title: string;
  body: string;
  sender: any;
  receiver: string;
  status: string;
}

export const Notifications = () => {
  const [data, setData] = useState<NotifyItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://api.citadel-i.com.ng/api/v1/notification/receive",
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
          setError(result?.message || "Something went wrong");
        } else {
          setData(result.Notifications);
        }
      } catch (error) {
        console.error(error);
        setError("Error connecting to server");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-white text-black py-2 px-4 w-[200px] shadow-md">
      {loading && <p className="text-center py-4">Loading Notifications...</p>}

      {!loading && error && (
        <p className="text-red-500 text-center py-4">{error}</p>
      )}

      {!loading && data?.length === 0 && (
        <p className="text-gray-500 text-center py-4">No notifications yet.</p>
      )}

      {data &&
        data.map((item) => (
          <Link href={`notifications/${item.id}`} key={item.id}>
            <div className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded items-center rounded-[2px] flex  justify-between">
              <p className="font-semibold text-[12px]">{item.title}</p>
              <p className="text-[8px] text-orange-500">{item.status}</p>
            </div>
          </Link>
        ))}
    </section>
  );
};

