"use client";

import { useState, useEffect } from "react";

// ================= TYPES =================
interface Subject {
  name: string;
}

interface ClassLevel {
  group: string;
  years: string[];
}

interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  discipline: string;
  subjects: string[] | Subject[]; // handles raw strings or related table
  isVerified: boolean;
  classLevels: ClassLevel[];
}

interface PaginatedTeachersResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  teachers: Teacher[];
}

// ================= COMPONENT =================
export default function TutorsTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const limit = 10;

  // ---------------- Fetch teachers ----------------
  const fetchTeachers = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/teachers?page=${pageNumber}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include", // include cookies
        }
      );

      if (!res.ok) throw new Error("Failed to fetch teachers");

      const data: PaginatedTeachersResponse = await res.json();
      setTeachers(data.teachers);
      setTotalPages(data.totalPages);
      setPage(data.page);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers(page);
  }, [page]);

  // ---------------- Toggle verification ----------------
  const toggleVerification = async (id: number, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/teachers/${id}/verify`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isVerified: !currentStatus }),
      });

      if (!res.ok) throw new Error("Failed to update verification");

      fetchTeachers(page);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- Delete teacher ----------------
  const deleteTeacher = async (id: number) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete teacher");

      fetchTeachers(page);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading teachers...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Discipline</th>
            <th className="p-2 border">Subjects</th>
            <th className="p-2 border">Class Levels</th>
            <th className="p-2 border">Verified</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="text-center">
              <td className="p-2 border">{teacher.id}</td>
              <td className="p-2 border">
                {teacher.firstName} {teacher.lastName}
              </td>
              <td className="p-2 border">{teacher.email}</td>
              <td className="p-2 border">{teacher.phoneNumber}</td>
              <td className="p-2 border">{teacher.discipline}</td>

              {/* Subjects */}
              <td className="p-2 border">
                {Array.isArray(teacher.subjects)
                  ? teacher.subjects
                      .map((s) => (typeof s === "string" ? s : s.name))
                      .join(", ")
                  : "-"}
              </td>

              {/* Class Levels */}
              <td className="p-2 border">
                {teacher.classLevels
                  .map((level) => `${level.group}: ${level.years.join(", ")}`)
                  .join(" | ")}
              </td>

              <td className="p-2 border">{teacher.isVerified ? "Yes" : "No"}</td>

              {/* Actions */}
              <td className="p-2 border flex justify-center gap-2">
                <button
                  className={`px-3 py-1 text-white rounded ${
                    teacher.isVerified ? "bg-yellow-500" : "bg-green-500"
                  }`}
                  onClick={() =>
                    toggleVerification(teacher.id, teacher.isVerified)
                  }
                >
                  {teacher.isVerified ? "Unverify" : "Verify"}
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteTeacher(teacher.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{page}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
