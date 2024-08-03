import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const meetingItemHistory = await prisma.meetingItemStatus.findMany({
      where: { meetingId: params.id },
      include: {
        meeting: true,
        responsiblePerson: true,
      },
      orderBy: { meeting: { date: "asc" } },
    });

    console.log("history",meetingItemHistory)

    if (meetingItemHistory.length === 0) {
      return NextResponse.json(
        { error: "No history found for this meeting item" },
        { status: 404 },
      );
    }

    return NextResponse.json(meetingItemHistory);
  } catch (error) {
    console.error(
      `[GET_MEETING_ITEMS_${params.id}_HISTORY]- Failed to fetch meeting item history:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting item history" },
      { status: 500 },
    );
  }
}
