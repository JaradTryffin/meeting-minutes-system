import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const meetingTypes = await prisma.meetingType.findMany();
    return NextResponse.json(meetingTypes);
  } catch (error) {
    console.error("[GET_MEETING_TYPE] - Failed to fetch meeting types:", error);
    return NextResponse.json(
      { error: "Failed to fetch meeting types" },
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

    const newMeetingType = await prisma.meetingType.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(newMeetingType, { status: 201 });
  } catch (error) {
    console.error(
      "[POST_MEETING_TYPE] - Failed to create meeting type:",
      error,
    );
    return NextResponse.json(
      { error: "Failed to create meeting type" },
      { status: 500 },
    );
  }
}
