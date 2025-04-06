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

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/jobs")
      const data = await res.json()
      setJobs(data)
    }
    load()
  }, [refreshTrigger])

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded shadow bg-white">
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
        </div>
      ))}
    </div>
  )
}
