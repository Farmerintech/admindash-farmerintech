"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

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
  subjects: string[] | Subject[];
  isVerified: boolean;
  classLevels: ClassLevel[];
  image:any
}

interface PaginatedTeachersResponse {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  teachers: Teacher[];
}

// ================= ACTIONS =================
const actions = [
  { name: "View", icon: <FaEye />, color: "text-blue-500" },
  { name: "Verify", icon: <FaCheckCircle />, color: "text-green-500" },
  { name: "Unverify", icon: <FaTimesCircle />, color: "text-orange-500" },
  { name: "Delete", icon: <FaTrash />, color: "text-red-500" },
];

// ================= COMPONENT =================
export default function TutorsTable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
const [showDetails, setShowDetails] = useState(false);
  const limit = 10;

  // ---------------- Fetch teachers ----------------
  const fetchTeachers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.citadel-i.com.ng/api/v1/admin/get_teachers?page=${pageNumber}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
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


const toggleVerification = async (id: number, status: boolean) => {
  try {
    const res = await fetch(
      `https://api.citadel-i.com.ng/api/v1/admin/verify_tutor/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: !status }),
      }
    );

    if (!res.ok) throw new Error("Verification failed");

    fetchTeachers(page); // refresh table
  } catch (err) {
    console.error(err);
  }
};
const deleteTeacher = async (id: number) => {
  if (!confirm("Are you sure you want to delete this teacher?")) return;

  try {
    const res = await fetch(
      `https://api.citadel-i.com.ng/api/v1/admin/delete_tutor/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Delete failed");

    fetchTeachers(page);
  } catch (err) {
    console.error(err);
  }
};


  const viewTeacher = async (id: number) => {
  try {
    const res = await fetch(
      `https://api.citadel-i.com.ng/api/v1/admin/get_tutor/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch teacher");

    const data = await res.json();
    setSelectedTeacher(data.teacher);
    setShowDetails(true);
  } catch (err) {
    console.error(err);
  }
};
  if (loading) return <p>Loading teachers...</p>;

  return (
    <>
    {showDetails && selectedTeacher && (
  <TeacherDetailsModal
    teacher={selectedTeacher}
    onClose={() => setShowDetails(false)}
  />
)}

      <section className="rounded-md overflow-x-auto">
        <Table className="table-fixed">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Discipline</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                {/* Name */}
                <TableCell className="font-medium text-sm">
                  {teacher.firstName}
                </TableCell>

                {/* Discipline */}
                <TableCell>{teacher.discipline}</TableCell>

                {/* Subjects */}
                <TableCell className="text-xs">
                  {Array.isArray(teacher.subjects)
                    ? teacher.subjects
                        .map((s) => (typeof s === "string" ? s : s.name))
                        .join(", ")
                    : "-"}
                </TableCell>

                {/* Status */}
                <TableCell>
                  {teacher.isVerified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-orange-500">Pending</span>
                  )}
                </TableCell>

                {/* Actions */}
               <TableCell className="flex items-center gap-3">
  {/* View */}
  <span
    className="text-blue-500 cursor-pointer"
    onClick={() => viewTeacher(teacher.id)}
  >
    <FaEye />
  </span>

  {/* Verify / Unverify */}
  <span
    className={`cursor-pointer ${
      teacher.isVerified ? "text-orange-500" : "text-green-500"
    }`}
    onClick={() =>
      toggleVerification(teacher.id, teacher.isVerified)
    }
  >
    {teacher.isVerified ? <FaTimesCircle /> : <FaCheckCircle />}
  </span>

  {/* Delete */}
  <span
    className="text-red-500 cursor-pointer"
    onClick={() => deleteTeacher(teacher.id)}
  >
    <FaTrash />
  </span>
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-3 py-1">{page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}

function TeacherDetailsModal({
  teacher,
  onClose,
}: {
  teacher: Teacher;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] md:w-[600px] rounded-lg p-6 relative">
        {/* Close */}
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={teacher?.image || "/avatar.png"}
            alt="Teacher"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {teacher.firstName} {teacher.lastName}
            </h2>
            <p className="text-sm text-gray-500">{teacher.email}</p>
            <p className="text-sm">{teacher.phoneNumber}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-2 text-sm">
          <p>
            <strong>Discipline:</strong> {teacher.discipline}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                teacher.isVerified ? "text-green-600" : "text-orange-500"
              }
            >
              {teacher.isVerified ? "Verified" : "Pending"}
            </span>
          </p>

          <p>
            <strong>Subjects:</strong>{" "}
            {teacher.subjects
              .map((s) => (typeof s === "string" ? s : s.name))
              .join(", ")}
          </p>

          <div>
            <strong>Class Levels:</strong>
            <ul className="list-disc ml-5">
              {teacher.classLevels.map((level, idx) => (
                <li key={idx}>
                  {level.group}: {level.years.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
