import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const meetings = await prisma.meeting.findMany({
      include: { meetingType: true },
    });
    return NextResponse.json(meetings);
  } catch (error) {
    console.error("[GET_MEETING] - Failed to fetch meetings", error);
    return NextResponse.json(
      { error: "Failed to fetch meeting" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { meetingNumber, date, meetingTypeId, previousMeetingId, minutes } =
      body;

    if (!meetingNumber || !date || !meetingTypeId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newMeeting = await prisma.meeting.create({
      data: {
        meetingNumber,
        date: new Date(date),
        meetingTypeId,
        previousMeetingId,
        minutes,
      },
      include: { meetingType: true },
    });
    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.error("[POST_MEETING] - Failed to fetch meetings", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 },
    );
  }
}
