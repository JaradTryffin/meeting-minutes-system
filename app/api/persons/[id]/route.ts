import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const person = await prisma.person.findUnique({
      where: { id: params.id },
    });

    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(person);
  } catch (error) {
    console.error(
      `[GET_PERSONS_${params.id}] - Failed to fetch person:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to fetch person" },
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
    console.log(body)
    const { name, email } = body;

    console.log("name",name)
    console.log("email",email)

    const updatedPerson = await prisma.person.update({
      where: { id: params.id },
      data: { name, email },
    });


    return NextResponse.json(updatedPerson);
  } catch (error) {
    console.error(
      `[PUT_PERSONS_${params.id}]- Failed to update person:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to update person" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.person.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error(
      `[GET_PERSONS_${params.id}] - Failed to delete person:`,
      error,
    );
    return NextResponse.json(
      { error: "Failed to delete person" },
      { status: 500 },
    );
  }
}
