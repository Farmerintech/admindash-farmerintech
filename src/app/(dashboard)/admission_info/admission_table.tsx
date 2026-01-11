"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Admission = {
  id: number;
  school: string;
  course: string;
  year: string;
};

export default function AdmissionTable() {
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await fetch(
          "https://api.citadel-i.com.ng/api/v1/admin/get_admission_requirements/all",
          {
            cache: "no-store",
          }
        );
        const result = await res.json();
        setAdmissions(result.data || []);
      } catch (error) {
        console.error("Error fetching admissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmissions();
  }, []);
const router = useRouter()
  const handleView = (id: number) => {
    console.log("View", id);
    router.push(`/admission_info/view/${id}`)
  };

  const handleEdit = (id: number) => {
    console.log("Edit", id);
    router.push(`/admission_info/edit/${id}`)
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      await fetch(`https://api.citadel-i.com.ng/api/v1/admin/delete_admission_requirements/${id}`, {
        method: "DELETE",
      });
      setAdmissions((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (loading) return <p>Loading admissions...</p>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>School</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {admissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No records found
              </TableCell>
            </TableRow>
          ) : (
            admissions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.school}</TableCell>
                <TableCell>{item.course}</TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(item.id)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
