"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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
      await fetch("/admin/change-password", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setMessage("Password changed successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border p-5 rounded-lg">
      <h2 className="font-medium mb-4">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current password"
          className="input"
          onChange={handleChange}
          value={form.currentPassword}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New password"
          className="input"
          onChange={handleChange}
          value={form.newPassword}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm new password"
          className="input"
          onChange={handleChange}
          value={form.confirmPassword}
        />

        <button disabled={loading} className="btn">
          {loading ? "Updating..." : "Change Password"}
        </button>

        {message && <p className="text-sm">{message}</p>}
      </form>
    </section>
  );
}
