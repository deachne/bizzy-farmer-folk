
import React, { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { BarChart2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

const PerformanceOverview = () => {
  // Generate some sample data for the line chart
  const data = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      time: `${i}:00`,
      cpu: Math.floor(Math.random() * 40) + 20,
      memory: Math.floor(Math.random() * 30) + 30,
      network: Math.floor(Math.random() * 20) + 10,
    }));
  }, []);

  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <BarChart2 className="h-4 w-4 mr-2 text-blue-500" />
          <span className="font-medium">Performance Overview</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button variant="ghost" size="sm" className="rounded-none h-7 px-3 text-xs border-r">Day</Button>
            <Button variant="ghost" size="sm" className="rounded-none h-7 px-3 text-xs border-r">Week</Button>
            <Button variant="ghost" size="sm" className="rounded-none h-7 px-3 text-xs">Month</Button>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              cpu: {
                label: "CPU",
                color: "#3b82f6", // blue-500
              },
              memory: {
                label: "Memory",
                color: "#10b981", // emerald-500
              },
              network: {
                label: "Network",
                color: "#8b5cf6", // violet-500
              },
            }}
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis 
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <ChartTooltipContent 
                        active={active} 
                        payload={payload}
                        formatter={(value, name) => [`${value}%`, name]}
                      />
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cpu" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="memory" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Line 
                type="monotone" 
                dataKey="network" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </Card>
  );
};

export default PerformanceOverview;
