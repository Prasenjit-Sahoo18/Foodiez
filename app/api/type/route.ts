import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.type.findMany();
    return NextResponse.json({
      response,
    });
  } catch (error) {
    console.error("Error fetching types:", error);
    return NextResponse.json({ error: "Failed to fetch types" }, { status: 500 });
  }
}
