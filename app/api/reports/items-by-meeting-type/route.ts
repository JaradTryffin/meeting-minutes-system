import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingTypeId = searchParams.get("meetingTypeId");

    if (!meetingTypeId) {
      return NextResponse.json(
        { error: "Meeting Type ID is required" },
        { status: 400 },
      );
    }

    const itemsByMeetingType = await prisma.meetingItemStatus.findMany({
      where: {
        meeting: { meetingTypeId: meetingTypeId },
      },
      include: {
        meetingItem: true,
        meeting: true,
        responsiblePerson: true,
      },
      orderBy: [
        { meeting: { date: "desc" } },
        { meetingItem: { description: "asc" } },
      ],
    });

    // if (itemsByMeetingType.length === 0) {
    //   return NextResponse.json(
    //     { message: "No items found for this meeting type" },
    //     { status: 404 },
    //   );
    // }

    return NextResponse.json(itemsByMeetingType);
  } catch (error) {
    console.error("Failed to generate items by meeting type report:", error);
    return NextResponse.json(
      { error: "Failed to generate items by meeting type report" },
      { status: 500 },
    );
  }
}
