"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "../context/reducer";
import { useSearchParams, useRouter } from "next/navigation";

const actions = [
  { name: "View", icon: <FaEye size={15} />, color: "text-blue-400" },
  { name: "Edit", icon: <FaPencilAlt size={15} />, color: "text-yellow-400" },
  { name: "Delete", icon: <FaTrash size={15} />, color: "text-red-400" },
];

export function UploadsTable() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string>();
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });

  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const { state } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://citadel-i-project.onrender.com/api/v1/uploads?offset=${offset}`,
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
          return;
        }

        setData(result.data || []);
        setPagination(result.pagination || {});
      } catch (error) {
        console.error(error);
        setError("Error connecting to server");
      }
    };

    fetchData();
  }, [offset]);

  const goToOffset = (newOffset: number) => {
    router.push(`?offset=${newOffset}`);
  };

  const canGoNext = offset + pagination.limit < pagination.totalCount;
  const canGoPrevious = offset > 0;

  return (
    <section className="bg-white p-4 rounded-md">
      <div className="py-2 flex justify-between items-center flex-col md:flex-row gap-2">
        <p className="font-semibold text-lg">Recent Uploads</p>
        <button className="bg-orange-500 px-4 py-2 text-white rounded-md">View all</button>
      </div>

      <section className="rounded-md overflow-x-auto w-full mt-5">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 font-semibold text-gray-700">Subject</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Upload Type</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Uploaded By</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Date</th>
              <th className="px-4 py-2 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2">{item.uploadType}</td>
                  <td className="px-4 py-2">{item.uploadedBy}</td>
                  <td className="px-4 py-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      {actions.map((action, idx) => (
                        <Link
                          key={idx}
                          href={
                            action.name === "View"
                              ? `/manage_content/view?type=${item.uploadType}&id=${item.ResourceId}`
                              : action.name === "Edit"
                              ? `/manage_content/edit?type=${item.uploadType}&id=${item.ResourceId}`
                              : "/"
                          }
                          className={`${action.color} text-xs flex items-center gap-1`}
                        >
                          {action.icon}
                        </Link>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No uploads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => goToOffset(offset - pagination.limit)}
          disabled={!canGoPrevious}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => goToOffset(offset + pagination.limit)}
          disabled={!canGoNext}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
   }
