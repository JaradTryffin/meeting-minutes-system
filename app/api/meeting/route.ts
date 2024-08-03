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
    const { meetingTypeId, date, ...rest } = body;

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

    // Find the latest meeting of this type
    const latestMeeting = await prisma.meeting.findFirst({
      where: { meetingTypeId },
      orderBy: { meetingNumber: "desc" },
    });

    console.log("latestMeeting",latestMeeting)

    let newMeetingNumber: number;
    if (latestMeeting?.meetingNumber) {
      newMeetingNumber = latestMeeting.meetingNumber + 1;
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
        previousMeetingId: latestMeeting?.id, // Set the previous meeting ID
        ...rest,
      },
      include: { meetingType: true, previousMeeting: true },
    });

    // If there was a previous meeting, update its nextMeeting reference
    if (latestMeeting) {
      await prisma.meeting.update({
        where: { id: latestMeeting.id },
        data: { nextMeeting: { connect: { id: newMeeting.id } } },
      });
    }

    return NextResponse.json(newMeeting, { status: 201 });
  } catch (error) {
    console.error("[POST_MEETING] - Failed to create meeting:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 },
    );
  }
}

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { meetingTypeId, date,...rest } = body;
//
//     if (typeof meetingTypeId !== "string" || !date) {
//       return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//     }
//
//     const meetingType = await prisma.meetingType.findUnique({
//       where: { id: meetingTypeId },
//     });
//
//     if (!meetingType) {
//       return NextResponse.json(
//         { error: "Invalid meeting type" },
//         { status: 400 },
//       );
//     }
//
//     const latestMeeting = await prisma.meeting.findFirst({
//       where: { meetingTypeId },
//       orderBy: { meetingNumber: "desc" },
//     });
//
//     let newMeetingNumber: number;
//     if (latestMeeting?.meetingNumber) {
//       newMeetingNumber =
//         parseInt(latestMeeting.meetingNumber.toString(), 10) + 1;
//     } else {
//       newMeetingNumber = 1;
//     }
//
//     const formattedId = `${meetingType.name.charAt(0)}${newMeetingNumber}`;
//
//     const newMeeting = await prisma.meeting.create({
//       data: {
//         meetingTypeId,
//         meetingNumber: newMeetingNumber,
//         formattedId,
//         date: new Date(date),
//         ...rest
//       },
//       include: { meetingType: true },
//     });
//
//     return NextResponse.json(newMeeting, { status: 201 });
//   } catch (error) {
//     console.error("[POST_MEETING] - Failed to create meeting:", error);
//     return NextResponse.json(
//       { error: "Failed to create meeting" },
//       { status: 500 },
//     );
//   }
// }
