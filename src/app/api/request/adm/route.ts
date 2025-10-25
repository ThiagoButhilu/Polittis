import { NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma";

export async function GET() {
  
  const requests = await prisma.request.findMany({
    include: { user: true },
  });

  return NextResponse.json({ requests });
}
