"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MyEditor from "../editor";
import { DashHook } from "@/app/components/dahHook";
import { useSidebar } from "@/app/context/sideBarState";

export default function EditAdmissionPage() {
      const { sidebarOpen, setSidebarOpen } = useSidebar();
    
  const router = useRouter();
  const searchParams = useSearchParams();
  const idString = searchParams.get("id"); // might be null or string
const id = idString ? Number(idString) : undefined; 
  const [formData, setFormData] = useState({
    school: "",
    course: "",
    year: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAdmission = async () => {
      try {
        const res = await fetch(
          `https://api.citadel-i.com.ng/api/v1/admin/get_admission_requirements/${id}`
        );
        const result = await res.json();
        setFormData(result.data[0]);
      } catch (error) {
        console.error("Error loading admission:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmission();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(
        `https://your-api-url/api/v1/edit_admission_requirements/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

    router.push(`/admission_info/view?id=${id}`)
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
      <section className={`w-ful px-[16px] pb-[24px] mt-6 min-h-screen ${sidebarOpen && "hidden md:block"}`}>
          <DashHook name={"Edit Admission Information"}/>
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Admission Requirement</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>School</Label>
            <Input
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Course</Label>
            <Input
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Year</Label>
            <Input
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label>Requirements</Label>
          <MyEditor value={formData.requirements} onChange={()=>handleChange} />

            {/* <Textarea
              name="requirements"
              rows={6}
              value={formData.requirements}
              onChange={handleChange}
              required
            /> */}
          </div>

          <div className="flex gap-3">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
    </section>
  );
}
