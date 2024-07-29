import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 },
      );
    }

    const progressReport = await prisma.meetingItemStatus.findMany({
      where: { meetingItemId: itemId },
      include: {
        meeting: true,
        responsiblePerson: true,
      },
      orderBy: { meeting: { date: "asc" } },
    });

    if (progressReport.length === 0) {
      return NextResponse.json(
        { error: "No progress found for this item" },
        { status: 404 },
      );
    }

    return NextResponse.json(progressReport);
  } catch (error) {
    console.error("Failed to generate progress report:", error);
    return NextResponse.json(
      { error: "Failed to generate progress report" },
      { status: 500 },
    );
  }
}
