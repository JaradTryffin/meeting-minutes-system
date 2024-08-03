import React from "react";
import { Heading } from "@/components/Heading";
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusSummaryChart } from "@/components/reports/status-summary-chart";
import { ItemsByPersonChart } from "@/components/reports/items-by-person-report";
import { ItemsByMeetingChart } from "@/components/reports/item-by-meeting-report";
import { ItemsByMeetingTypeChart } from "@/components/reports/item-by-meeting-type";

async function getStatusSummary() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return prisma.meetingItemStatus.groupBy({
    by: ["status"],
    where: {
      meeting: {
        date: {
          gte: thirtyDaysAgo,
        },
      },
    },
    _count: {
      status: true,
    },
  });
}

async function getPersons() {
  return prisma.person.findMany();
}

async function getMeetings() {
  return prisma.meeting.findMany({
    orderBy: {
      date: "desc",
    },
    take: 10,
  });
}

async function getMeetingTypes() {
  return prisma.meetingType.findMany();
}

export default async function ReportsPage() {
  const [statusSummary, persons, meetings, meetingTypes] = await Promise.all([
    getStatusSummary(),
    getPersons(),
    getMeetings(),
    getMeetingTypes(),
  ]);

  return (
    <div className="space-y-6">
      <Heading
        title="Reports Dashboard"
        description="View insights from your meetings and action items"
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Status Summary (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusSummaryChart data={statusSummary} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items by Person</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemsByPersonChart persons={persons} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items by Meeting</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemsByMeetingChart meetings={meetings} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Items by Meeting Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemsByMeetingTypeChart meetingTypes={meetingTypes} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
