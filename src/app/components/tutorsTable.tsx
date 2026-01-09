"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
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
  passportPhoto:any
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




  const viewTeacher = async (id: number) => {
  try {
    const res = await fetch(
      `https://api.citadel-i.com.ng/api/v1/admin/view_tutor/${id}`,
      {
       method: "GET",
  credentials: "include", // ✅ MUST be here
  headers: {
    "Content-Type": "application/json",
  },
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
    className="bg-orange-500 text-white px-2 items-center justify-center flex py-2 gap-2 rounded-md cursor-pointer"
    onClick={() => viewTeacher(teacher.id)}
  >
    View <FaEye size={15}/>
  </span>

  {/* Verify / Unverify */}
 
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
  const normalizeClassLevels = (
    levels: ClassLevel | ClassLevel[] | undefined
  ): ClassLevel[] => {
    if (Array.isArray(levels)) return levels;
    if (levels) return [levels];
    return [];
  };

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
      alert("Verification status updated")
      window.location.reload();
      if (!res.ok) throw new Error("Verification failed");
      
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src={teacher?.passportPhoto || "/avatar.png"}
              alt="Teacher"
              className="w-14 h-14 rounded-full object-cover border"
            />
            <div>
              <h2 className="font-semibold text-lg">
                {teacher.firstName} {teacher.lastName}
              </h2>
              <p className="text-sm text-gray-500">{teacher.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Status + Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <span
              className={`inline-flex w-fit px-3 py-1 rounded-full text-sm font-medium ${
                teacher.isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {teacher.isVerified ? "Verified" : "Pending verification"}
            </span>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() =>
                  toggleVerification(teacher.id, teacher.isVerified)
                }
                className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white text-sm ${
                  teacher.isVerified ? "bg-orange-500" : "bg-green-600"
                }`}
              >
                {teacher.isVerified ? (
                  <>
                    Unverify <FaTimes />
                  </>
                ) : (
                  <>
                    Verify <FaCheckCircle />
                  </>
                )}
              </button>

              <button
                onClick={() => deleteTeacher(teacher.id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-red-500 text-white text-sm"
              >
                Delete <FaTrash size={14} />
              </button>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">{teacher.phoneNumber}</p>
            </div>

            <div>
              <p className="text-gray-500">Discipline</p>
              <p className="font-medium">{teacher.discipline}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-gray-500">Subjects</p>
              <p className="font-medium">
                {teacher.subjects
                  .map((s) => (typeof s === "string" ? s : s.name))
                  .join(", ")}
              </p>
            </div>
          </div>

          {/* Class Levels */}
          <div>
            <p className="text-gray-500 mb-1">Class Levels</p>

            {normalizeClassLevels(teacher.classLevels).length > 0 ? (
              <ul className="space-y-1 text-sm">
                {normalizeClassLevels(teacher.classLevels).map((level, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-50 border rounded-md px-3 py-2"
                  >
                    <span className="font-medium">{level.group}:</span>{" "}
                    {level.years.join(", ")}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-sm">—</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
