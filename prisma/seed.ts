// prisma/seed.ts

import prisma from "../lib/prisma";

async function main() {
  // Create MeetingTypes
  const mancoType = await prisma.meetingType.create({
    data: { name: "MANCO" },
  });
  const financeType = await prisma.meetingType.create({
    data: { name: "Finance" },
  });
  const ptlType = await prisma.meetingType.create({
    data: { name: "Project Team Leaders" },
  });

  // Create StatusTypes
  const openStatus = await prisma.statusType.create({
    data: { name: "Open" },
  });
  const inProgressStatus = await prisma.statusType.create({
    data: { name: "In Progress" },
  });
  const closedStatus = await prisma.statusType.create({
    data: { name: "Closed" },
  });

  // Create Persons
  const john = await prisma.person.create({
    data: { name: "John Doe", email: "john.doe@example.com" },
  });
  const jane = await prisma.person.create({
    data: { name: "Jane Smith", email: "jane.smith@example.com" },
  });

  // Create Meetings
  const meeting1 = await prisma.meeting.create({
    data: {
      meetingNumber: 1,
      formattedId: "M1",
      date: new Date("2023-07-01"),
      meetingTypeId: mancoType.id,
      minutes: "Discussion about Q3 goals",
    },
  });
  const meeting2 = await prisma.meeting.create({
    data: {
      meetingNumber: 1,
      formattedId: "F1",
      date: new Date("2023-07-15"),
      meetingTypeId: financeType.id,
      minutes: "Budget review for Q3",
      previousMeetingId: meeting1.id,
    },
  });

  // Create MeetingItems
  const item1 = await prisma.meetingItem.create({
    data: {
      description: "Finalize Q3 goals",
      dueDate: new Date("2023-08-01"),
    },
  });
  const item2 = await prisma.meetingItem.create({
    data: {
      description: "Prepare budget proposal",
      dueDate: new Date("2023-07-31"),
    },
  });

  // Create MeetingItemStatuses
  await prisma.meetingItemStatus.create({
    data: {
      status: openStatus.name,
      actionRequired: "Draft initial goals",
      meetingId: meeting1.id,
      meetingItemId: item1.id,
      responsiblePersonId: john.id,
    },
  });
  await prisma.meetingItemStatus.create({
    data: {
      status: inProgressStatus.name,
      actionRequired: "Collect department budgets",
      meetingId: meeting2.id,
      meetingItemId: item2.id,
      responsiblePersonId: jane.id,
    },
  });

  console.log("Seed data has been successfully inserted");
}

main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });