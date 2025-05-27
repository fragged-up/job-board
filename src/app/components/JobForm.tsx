"use client";

import { useState } from "react";

export default function JobForm({ onSubmit }: { onSubmit: () => void }) {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [link, setLink] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidURL = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !position || !link || !password || !isValidURL(link)) {
      alert("Please fill all fields correctly");
      return;
    }

    setLoading(true);

    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, position, link, password }),
    });

    setCompany("");
    setPosition("");
    setLink("");
    setPassword("");
    onSubmit();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col font-sans gap-4  p-6 rounded-xl shadow max-w-md mx-auto">
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="form-input"
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="form-input"
        required
      />
      <input
        type="url"
        placeholder="Application Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="form-input"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Posting..." : "Post Job"}
      </button>
    </form>
  );
}
