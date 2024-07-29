import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const meetingType = await prisma.meetingType.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!meetingType) {
      return NextResponse.json(
        { error: "Meeting type not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(meetingType);
  } catch (error) {
    console.log(
      `[GET_MEETING_TYPE_[${params.id}]] - Failed to fetch meeting type: `,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch meeting type" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updatedMeetingType = await prisma.meetingType.update({
      where: { id: params.id },
      data: { name },
    });

    return NextResponse.json(updatedMeetingType);
  } catch (error) {
    console.log(
      `[PUT_MEETING_TYPE_[${params.id}]] - Failed to update meeting type: `,
      error,
    );
    return NextResponse.json(
      { error: "Failed to update meeting type" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.meetingType.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Meeting type deleted successful" });
  } catch (error) {
    console.log(
      `[DELETE_MEETING_TYPE_[${params.id}]] - Failed to delete meeting type: `,
      error,
    );
    return NextResponse.json(
      { error: "Failed to delete meeting type" },
      { status: 500 },
    );
  }
}
