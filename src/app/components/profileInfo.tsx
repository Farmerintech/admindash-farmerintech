"use client";

import { useState } from "react";

export default function ProfileInfoForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await fetch("/admin/profile", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border p-5 rounded-lg">
      <h2 className="font-medium mb-4">Basic Information</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="firstName"
          placeholder="First name"
          className="input"
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last name"
          className="input"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          onChange={handleChange}
        />

        <button disabled={loading} className="btn">
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>
    </section>
  );
}
