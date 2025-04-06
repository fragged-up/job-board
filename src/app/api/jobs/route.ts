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
  const { company, position, link, password } = body

  if (!company || !position || !link || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const job = await prisma.job.create({
    data: { company, position, link, password },
  })

  return NextResponse.json(job)
}

export async function DELETE(req: Request) {
  const { id, password } = await req.json()

  if (!id || !password) {
    return NextResponse.json({ error: "Missing ID or password" }, { status: 400 })
  }

  const job = await prisma.job.findUnique({ where: { id } })

  if (!job || job.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 403 })
  }

  await prisma.job.delete({ where: { id } })
  return NextResponse.json({ success: true })
}


export async function PUT(req: Request) {
  const { id, company, position, link, password } = await req.json()

  if (!id || !company || !position || !link || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const job = await prisma.job.findUnique({ where: { id } })
  if (!job || job.password !== password) {
    return NextResponse.json({ error: "Invalid password" }, { status: 403 })
  }

  const updated = await prisma.job.update({
    where: { id },
    data: { company, position, link },
  })

  return NextResponse.json(updated)
}
