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
    console.log("body",body)
    const { meetingTypeId, date,...rest } = body;
    console.log("meetingTypeId",meetingTypeId)

    if (typeof meetingTypeId !== "string" || !date) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const meetingType = await prisma.meetingType.findUnique({
      where: { id: meetingTypeId },
    });

    if (!meetingType) {
      return NextResponse.json(
        { error: "Invalid meeting type" },
        { status: 400 },
      );
    }

    const latestMeeting = await prisma.meeting.findFirst({
      where: { meetingTypeId },
      orderBy: { meetingNumber: "desc" },
    });

    let newMeetingNumber: number;
    if (latestMeeting?.meetingNumber) {
      newMeetingNumber =
        parseInt(latestMeeting.meetingNumber.toString(), 10) + 1;
    } else {
      newMeetingNumber = 1;
    }

    const formattedId = `${meetingType.name.charAt(0)}${newMeetingNumber}`;

    const newMeeting = await prisma.meeting.create({
      data: {
        meetingTypeId,
        meetingNumber: newMeetingNumber,
        formattedId,
        date: new Date(date),
        ...rest
      },
      include: { meetingType: true },
    });

    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.error("[POST_MEETING] - Failed to create meeting:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 },
    );
  }
}
