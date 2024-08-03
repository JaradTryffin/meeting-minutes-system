"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface StatusSummaryData {
  status: string;
  _count: {
    status: number;
  };
}

interface ChartData {
  name: string;
  value: number;
}

interface StatusSummaryChartProps {
  data: StatusSummaryData[];
}

export function StatusSummaryChart({ data }: StatusSummaryChartProps) {
  const chartData: ChartData[] = data.map((item) => ({
    name: item.status,
    value: item._count.status,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
