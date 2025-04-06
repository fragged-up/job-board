"use client"
import { useState } from "react"
import JobForm from "./components/JobForm"
import JobList from "./components/JobList"

export default function Home() {
  const [refresh, setRefresh] = useState(0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">My Job Board</h1>
      <JobForm onSubmit={() => setRefresh(refresh + 1)} />
      <div className="h-8" />
      <JobList refreshTrigger={refresh} />
    </main>
  )
}
