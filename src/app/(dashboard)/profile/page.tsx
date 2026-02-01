"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/app/context/reducer";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
        const { state, dispatch} = useUser();

  const [admin, setAdmin] = useState({
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    profileImage: state.profileImage,
    role:state.role,
    isLoggedIn:state?.isLoggedIn,
    token:state?.token
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Fetch admin data
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await fetch(
          "https://api.citadel-i.com.ng/api/v1/admin/get_admin",
          { credentials: "include" }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");

        setAdmin({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          profileImage: data.profileImage || "",
          role:data.role,
          isLoggedIn:state?.isLoggedIn,
          token:state?.token
        });
              console.log(data)
dispatch({
        type: 'LOGIN',
        payload: admin
})
      } catch (err: any) {
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  // --- Validation ---
  const validateProfile = () => {
    let valid = true;
    const newErrors = { firstName: "", lastName: "", email: "" };

    if (!admin.firstName.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!admin.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }
    if (!admin.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(admin.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    setErrors({ ...errors, ...newErrors });
    return valid;
  };

  const validatePassword = () => {
    let valid = true;
    const newErrors = { currentPassword: "", newPassword: "", confirmPassword: "" };

    if (!passwordForm.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      valid = false;
    }
    if (!passwordForm.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      valid = false;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors({ ...errors, ...newErrors });
    return valid;
  };

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setAdmin({ ...admin, [e.target.name]: e.target.value });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

const handleProfileUpdate = async () => {
  if (!validateProfile()) return;

  setSavingProfile(true);
  setMessage("");

  try {
    const res = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/update_profile",
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
        }),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update profile");

    // Update local state
    setAdmin((prev) => ({
      ...prev,
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
    }));

    // Update global context
    dispatch({
      type: "UPDATE_USER",
      payload: {
        ...state,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
      },
    });

    alert("Profile updated successfully ✅");
  } catch (err: any) {
    setMessage(err.message || "Something went wrong");
  } finally {
    setSavingProfile(false);
  }
};



const handleImageUpload = async (file: File) => {
  setUploadingImage(true);
  setMessage("");

  try {
    const formData = new FormData();
    formData.append("profileImage", file);

    const res = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/uplaod_img",
      { method: "PUT", credentials: "include", body: formData }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Image upload failed");

    // Update local state
    setAdmin((prev) => ({ ...prev, profileImage: data.data.url }));

    // Update global context
    dispatch({
      type: "UPDATE_USER",
      payload: { ...state, profileImage: data.data.url },
    });

    alert("Profile image updated ✅");
  } catch (err: any) {
    setMessage(err.message);
  } finally {
    setUploadingImage(false);
  }
};

const handlePasswordUpdate = async () => {
  if (!validatePassword()) return;
  setUpdatingPassword(true);
  setMessage("");

  try {
    const res = await fetch(
      "https://api.citadel-i.com.ng/api/v1/admin/change_psw",
      {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to change password");

    alert("Password updated ✅");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  } catch (err: any) {
    setMessage(err.message);
  } finally {
    setUpdatingPassword(false);
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
              disabled={savingProfile}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={admin.lastName}
              onChange={handleInputChange}
              disabled={savingProfile}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
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
            disabled={savingProfile}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <Button onClick={handleProfileUpdate} disabled={savingProfile}>
          {savingProfile ? "Saving..." : "Save Profile"}
        </Button>
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
          disabled={uploadingImage}
          onChange={(e) =>
            e.target.files && handleImageUpload(e.target.files[0])
          }
        />
        {uploadingImage && <p className="text-sm text-gray-500">Uploading...</p>}
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
              type="text"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              disabled={updatingPassword}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm">{errors.currentPassword}</p>
            )}
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="text"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              disabled={updatingPassword}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              disabled={updatingPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <Button onClick={handlePasswordUpdate} disabled={updatingPassword}>
          {updatingPassword ? "Updating..." : "Change Password"}
        </Button>
      </section>
    </div>
  );
}
