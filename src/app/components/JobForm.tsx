"use client"
import { useState } from "react"

export default function JobForm({ onSubmit }: { onSubmit: () => void }) {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [link, setLink] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ company, position, link }),
    })

    setCompany("")
    setPosition("")
    setLink("")
    onSubmit()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-300 p-6 rounded-xl shadow max-w-md mx-auto">
      <input
        type="text"
        placeholder="Company"
        className="p-2 border rounded text-gray-800 placeholder:text-black"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="p-2 border rounded text-gray-800 placeholder:text-black"
        required
      />
      <input
        type="url"
        placeholder="Application Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="p-2 border rounded text-gray-800  placeholder:text-black"
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
  )
}
