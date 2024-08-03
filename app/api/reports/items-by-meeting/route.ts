import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const meetingId = searchParams.get("meetingId");

    if (!meetingId) {
      return NextResponse.json(
        { error: "Meeting ID is required" },
        { status: 400 },
      );
    }

    const itemsByMeeting = await prisma.meetingItemStatus.findMany({
      where: { meetingId: meetingId },
      include: {
        meetingItem: true,
        responsiblePerson: true,
      },
      orderBy: { meetingItem: { description: "asc" } },
    });

    // if (itemsByMeeting.length === 0) {
    //   return NextResponse.json(
    //     { message: "No items found for this meeting" },
    //     { status: 404 },
    //   );
    // }

    return NextResponse.json(itemsByMeeting);
  } catch (error) {
    console.error("Failed to generate items by meeting report:", error);
    return NextResponse.json(
      { error: "Failed to generate items by meeting report" },
      { status: 500 },
    );
  }
}
