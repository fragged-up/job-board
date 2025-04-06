import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json([]);

  const jobs = await prisma.job.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { company, position, link, password } = body;

  if (!company || !position || !link || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const job = await prisma.job.create({
    data: {
      company,
      position,
      link,
      password,
      userId,
    },
  });

  return NextResponse.json(job);
}

export async function DELETE(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, password } = await req.json();
  if (!id || !password) {
    return NextResponse.json({ error: "Missing ID or password" }, { status: 400 });
  }

  const job = await prisma.job.findUnique({ where: { id } });

  if (!job || job.userId !== userId || job.password !== password) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.job.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, company, position, link, password } = await req.json();

  if (!id || !company || !position || !link || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const job = await prisma.job.findUnique({ where: { id } });

  if (!job || job.userId !== userId || job.password !== password) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.job.update({
    where: { id },
    data: { company, position, link },
  });

  return NextResponse.json(updated);
}
