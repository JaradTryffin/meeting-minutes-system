import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: "Start date and end date are required" },
        { status: 400 },
      );
    }

    const statusSummary = await prisma.meetingItemStatus.groupBy({
      by: ["status"],
      where: {
        meeting: {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      },
      _count: {
        status: true,
      },
    });

    if (statusSummary.length === 0) {
      return NextResponse.json(
        { message: "No status data found for the given period" },
        { status: 404 },
      );
    }

    return NextResponse.json(statusSummary);
  } catch (error) {
    console.error("Failed to generate status summary report:", error);
    return NextResponse.json(
      { error: "Failed to generate status summary report" },
      { status: 500 },
    );
  }
}
