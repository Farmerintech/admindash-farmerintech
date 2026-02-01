"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  // Fetch admin data on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch("/api/admin/profile", {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setAdmin({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profileImage: data.profileImage || "",
        });
      } catch (err: any) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleProfileUpdate = async () => {
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      setMessage("Profile updated successfully ✅");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const handleImageUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/admin/profile/image", {
        method: "PUT",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Image upload failed");

      setAdmin({ ...admin, profileImage: data.data.url });
      setMessage("Profile image updated ✅");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to change password");

      setMessage("Password updated ✅");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>

      {message && <p className="text-sm text-green-600">{message}</p>}

      {/* --- Basic Info --- */}
      <section className="space-y-4 border p-5 rounded-lg">
        <h2 className="text-lg font-medium">Basic Information</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              value={admin.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={admin.lastName}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={admin.email}
            onChange={handleInputChange}
          />
        </div>

        <Button onClick={handleProfileUpdate}>Save Profile</Button>
      </section>

      {/* --- Profile Image --- */}
      <section className="space-y-4 border p-5 rounded-lg">
        <h2 className="text-lg font-medium">Profile Image</h2>

        {admin.profileImage && (
          <img
            src={admin.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-3"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && handleImageUpload(e.target.files[0])}
        />
      </section>

      {/* --- Change Password --- */}
      <section className="space-y-4 border p-5 rounded-lg">
        <h2 className="text-lg font-medium">Change Password</h2>

        <div className="space-y-3">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
        </div>

        <Button onClick={handlePasswordUpdate}>Change Password</Button>
      </section>
    </div>
  );
}
