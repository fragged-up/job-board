"use client"

import { useEffect, useState } from "react"

type Job = {
  id: string
  company: string
  position: string
  link: string
  createdAt: string
}

export default function JobList({ refreshTrigger }: { refreshTrigger: number }) {
  const [jobs, setJobs] = useState<Job[]>([])

  const load = async () => {
    const res = await fetch("/api/jobs")
    const data = await res.json()
    setJobs(data)
  }

  useEffect(() => {
    load()
  }, [refreshTrigger])

  const deleteJob = async (id: string) => {
    const password = prompt("Enter password to delete this job:")
    if (!password) return

    const res = await fetch("/api/jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password }),
    })

    if (res.ok) {
      load()
    } else {
      alert("Wrong password or failed to delete.")
    }
  }


  const editJob = async (job: Job) => {
    const password = prompt("Enter password to edit:")
    if (!password) return

    const newPosition = prompt("New Position:", job.position)
    const newCompany = prompt("New Company:", job.company)
    const newLink = prompt("New Link:", job.link)

    if (!newPosition || !newCompany || !newLink) return

    const res = await fetch("/api/jobs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: job.id,
        position: newPosition,
        company: newCompany,
        link: newLink,
        password,
      }),
    })

    if (res.ok) {
      load()
    } else {
      alert("Invalid password or failed to update")
    }
  }


  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded shadow bg-white relative">
          <h3 className="text-lg font-semibold">{job.position}</h3>
          <p className="text-gray-700">{job.company}</p>
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            Apply
          </a>
          <p className="text-xs text-gray-400 mt-2">
            Posted on {new Date(job.createdAt).toLocaleDateString()}
          </p>
          <button
            onClick={() => deleteJob(job.id)}
            className="absolute top-2 right-2 text-red-500 text-sm hover:underline"
          >
            Delete
          </button>

          <button
    onClick={() => editJob(job)}
    className="text-blue-500 text-sm hover:underline"
  >
    Edit
  </button>

        </div>
      ))}
    </div>
  )
}
