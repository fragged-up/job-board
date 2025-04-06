
import { prisma } from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(jobs)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { company, position, link } = body

  if (!company || !position || !link) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const job = await prisma.job.create({
    data: { company, position, link },
  })

  return NextResponse.json(job)
}
