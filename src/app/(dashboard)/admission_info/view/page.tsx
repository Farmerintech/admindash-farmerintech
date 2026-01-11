"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashHook } from "@/app/components/dahHook";
import { useSidebar } from "@/app/context/sideBarState";

type Admission = {
  id: number;
  school: string;
  course: string;
  year: string;
  requirements: string;
};

export default function ViewAdmissionPage() {
  const searchParams = useSearchParams();
  const idString = searchParams.get("id"); // might be null or string
const id = idString ? Number(idString) : undefined; 
  const router = useRouter();
  const [admission, setAdmission] = useState<Admission | null>(null);
  const [loading, setLoading] = useState(true);
      const { sidebarOpen, setSidebarOpen } = useSidebar();

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const res = await fetch(
          `https://api.citadel-i.com.ng/api/v1/admin/get_admission_requirements/${id}`
        );
        const result = await res.json();
        setAdmission(result.data[0]);
        console.log(result.data)
      } catch (error) {
        console.error("Error fetching admission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmission();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!admission) return <p>Admission not found</p>;

  return (
          <section className={`w-ful px-[16px] pb-[24px] mt-6 min-h-screen ${sidebarOpen && "hidden md:block"}`}>
              <DashHook name={"Edit Admission Information"}/>
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Admission Requirement Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">School</p>
          <p className="font-medium">{admission?.school}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Course</p>
          <p className="font-medium">{admission.course}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Year</p>
          <p className="font-medium">{admission.year}</p>
        </div>

        <div>
        <p className="text-sm text-muted-foreground">Requirements</p>
<div
  className="whitespace-pre-line"
  dangerouslySetInnerHTML={{ __html: admission.requirements }}
></div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button onClick={() => router.push(`/admin/admissions/edit/${id}`)}>
            Edit
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
    </section>
  );
}
