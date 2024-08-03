"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import apiClient from "@/lib/apiClient";
import { Meeting } from "@prisma/client";

interface ItemsByMeetingData {
  meetingItem: {
    description: string;
  };
  status: string;
}

interface ChartData {
  name: string;
  value: number;
  status: string;
}

interface ItemsByMeetingChartProps {
  meetings: Meeting[];
}

const STATUS_COLORS: { [key: string]: string } = {
  Open: "#82ca9d",
  "In Progress": "#8884d8",
  Closed: "#ffc658",
  // Add more status colors as needed
};

export function ItemsByMeetingChart({ meetings }: ItemsByMeetingChartProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<string>("");
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (selectedMeeting) {
      fetchItemsByMeeting();
    }
  }, [selectedMeeting]);

  const fetchItemsByMeeting = async () => {
    const response = await apiClient.get<ItemsByMeetingData[]>(
      `/reports/items-by-meeting?meetingId=${selectedMeeting}`,
    );
    const data = response.data;

    // Transform the data for the chart
    const transformedData: ChartData[] = data.map((item) => ({
      name: item.meetingItem.description,
      value: 1, // Each item counts as 1
      status: item.status,
    }));

    setChartData(transformedData);
  };

  return (
    <div>
      <Select onValueChange={setSelectedMeeting} value={selectedMeeting}>
        <SelectTrigger>
          <SelectValue placeholder="Select a meeting" />
        </SelectTrigger>
        <SelectContent>
          {meetings.map((meeting) => (
            <SelectItem key={meeting.id} value={meeting.id}>
              {meeting.formattedId}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STATUS_COLORS[entry.status] || "#000000"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
