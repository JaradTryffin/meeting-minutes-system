import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const nextMeeting = await prisma.meeting.findFirst({
      where: { previousMeetingId: params.id },
    });

    if (!nextMeeting) {
      return NextResponse.json(
        { error: "No next meeting found" },
        { status: 404 },
      );
    }

    return NextResponse.json(nextMeeting);
  } catch (error) {
    console.error(
      `[GET_MEETING_NEXT_${params.id}] - Failed to fetch next meeting:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch next meeting" },
      { status: 500 },
    );
  }
}
