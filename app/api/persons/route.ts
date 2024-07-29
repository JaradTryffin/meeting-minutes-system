import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const persons = await prisma.person.findMany();
    return NextResponse.json(persons);
  } catch (error) {
    console.error("[GET_PERSONS] - Failed to fetch persons:", error);
    return NextResponse.json(
      { error: "Failed to fetch persons" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    const newPerson = await prisma.person.create({
      data: { name, email },
    });

    return NextResponse.json(newPerson, { status: 201 });
  } catch (error) {
    console.error("[POST_PERSONS] - Failed to create person:", error);
    return NextResponse.json(
      { error: "Failed to create person" },
      { status: 500 },
    );
  }
}
