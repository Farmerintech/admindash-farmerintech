"use client";

import { Api } from "@/lib/api";
import { useState } from "react";

export default function ProfileImageForm() {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("avatar", image);

    setLoading(true);

    try {
      const res = await Api(
        `/admin/profile/image`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");
      alert("Profile image updated");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border p-5 rounded-lg">
      <h2 className="font-medium mb-4">Profile Image</h2>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="btn mt-3"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </section>
  );
}
