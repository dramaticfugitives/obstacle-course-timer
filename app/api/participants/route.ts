import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const participants = await prisma.participant.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(participants);
}

export async function POST(req: Request) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });

  const participant = await prisma.participant.create({ data: { name } });
  return NextResponse.json(participant);
}
