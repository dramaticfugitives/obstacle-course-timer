import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const updated = await prisma.participant.update({
    where: { id: Number(params.id) },
    data: { end: new Date() },
  });
  return NextResponse.json(updated);
}
