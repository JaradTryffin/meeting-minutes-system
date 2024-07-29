import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const statusTypes = await prisma.statusType.findMany();
    return NextResponse.json(statusTypes);
  } catch (error) {
    console.error("[GET_STATUS_TYPES]- Failed to fetch status types:", error);
    return NextResponse.json(
      { error: "Failed to fetch status types" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newStatusType = await prisma.statusType.create({
      data: { name },
    });

    return NextResponse.json(newStatusType, { status: 201 });
  } catch (error) {
    console.error("[POST_STATUS_STATUS]- Failed to create status type:", error);
    return NextResponse.json(
      { error: "Failed to create status type" },
      { status: 500 },
    );
  }
}
