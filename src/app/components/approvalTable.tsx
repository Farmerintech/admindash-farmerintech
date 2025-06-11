"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useUser } from "../context/reducer";

interface UploadItem {
  id: number;
  uploadType: string;
  subject: string;
  createdAt: any;
  uploadedBy: string;
  status: string;
}

export function ApprovalTable() {
  const [data, setData] = useState<UploadItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { state } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://citadel-i-project.onrender.com/api/v1/uploads/all",
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
          setData(result.data);
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

  const filterBy = async () => {
    try {
      const response = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/uploads`,
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
        setData(result.data);
      }
    } catch (error) {
      console.error(error);
      setError("Error connecting to server");
    }
  };

  const updateStatusLocally = (id: number, status: string) => {
    setData((prevData) =>
      prevData
        ? prevData.map((item) =>
            item.id === id ? { ...item, status } : item
          )
        : null
    );
  };

  const Approve = async (Type: string, id: number) => {
    updateStatusLocally(id, "Approved"); // Optimistic update
    try {
      const response = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/uploads/approve/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uploadType: Type }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        updateStatusLocally(id, "Pending"); // Revert on failure
        setError(result?.message || "Something went wrong");
        setMessage("");
      } else {
        setMessage(result.message);
        setError(null);
      }
    } catch (error) {
      updateStatusLocally(id, "Pending"); // Revert on error
      console.error(error);
      setMessage("");
      setError("Error connecting to server");
    }
  };

  const Disapprove = async (Type: string, id: number) => {
    updateStatusLocally(id, "Rejected"); // Optimistic update
    try {
      const response = await fetch(
        `https://citadel-i-project.onrender.com/api/v1/uploads/disapprove/${id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uploadType: Type }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        updateStatusLocally(id, "Pending"); // Revert on failure
        setError(result?.message || "Something went wrong");
        setMessage("");
      } else {
        setMessage(result.message);
        setError(null);
      }
    } catch (error) {
      updateStatusLocally(id, "Pending"); // Revert on error
      console.error(error);
      setError("Error connecting to server");
    }
  };

  return (
    <section className="bg-white p-[16px] rounded-[8px]">
      {message && <p className="text-green-600 font-semibold">{message}</p>}
      {error && <p className="text-red-600 font-semibold">{error}</p>}

      <form
        className="py-[8px] flex justify-between items-center flex-col md:flex-row gap-[8px]"
        onSubmit={(e) => {
          e.preventDefault();
          filterBy();
        }}
      >
        <p className="font-[600]">Recent Uploads</p>
        <button
          type="submit"
          className="outline-none border-none bg-orange-500 px-[16px] py-[8px] text-white rounded-[8px]"
        >
          View all
        </button>
      </form>

      <section className="rounded-md overflow-x-auto w-full px-1 mt-5">
        {loading ? (
          <p className="text-center py-4">Loading uploads...</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Subject
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Upload Type
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Uploaded By
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-2 font-semibold text-gray-700">
                  Perform Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data &&
                data.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{item.subject}</td>
                    <td className="px-4 py-2 text-xs md:text-sm">
                      {item.uploadType}
                    </td>
                    <td className="px-4 py-2">{item.uploadedBy}</td>
                    <td
                      className={`px-4 py-2 ${
                        item.status === "Pending"
                          ? "text-yellow-500"
                          : item.status === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.status}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => Approve(item.uploadType, item.id)}
                          className="bg-green-500 text-white p-[4px] rounded-[4px] text-[12px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => Disapprove(item.uploadType, item.id)}
                          className="bg-red-500 text-white p-[4px] rounded-[4px] text-[12px]"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}
