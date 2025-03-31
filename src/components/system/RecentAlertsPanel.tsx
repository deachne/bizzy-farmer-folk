
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: number;
  title: string;
  timestamp: string;
  status: "active" | "acknowledged";
  severity: "critical" | "high" | "medium" | "low";
}

const alerts: Alert[] = [
  { 
    id: 1, 
    title: "High CPU Usage", 
    timestamp: "2023-06-15 14:32:45", 
    status: "active", 
    severity: "high" 
  },
  { 
    id: 2, 
    title: "Database Connection Error", 
    timestamp: "2023-06-15 13:45:12", 
    status: "active", 
    severity: "critical" 
  },
  { 
    id: 3, 
    title: "File Storage Approaching Capacity", 
    timestamp: "2023-06-15 12:15:00", 
    status: "acknowledged", 
    severity: "medium" 
  }
];

const RecentAlertsPanel = () => {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
          <span className="font-medium">Recent Alerts</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="flex flex-col py-2 border-b last:border-0"
            >
              <div className="flex items-start">
                <span 
                  className={cn(
                    "mr-2 h-2 w-2 mt-1.5 rounded-full",
                    alert.severity === "critical" && "bg-red-500",
                    alert.severity === "high" && "bg-amber-500",
                    alert.severity === "medium" && "bg-yellow-500",
                    alert.severity === "low" && "bg-blue-500",
                  )}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{alert.title}</span>
                    <span 
                      className={cn(
                        "text-xs",
                        alert.status === "active" && "text-red-600",
                        alert.status === "acknowledged" && "text-gray-500"
                      )}
                    >
                      {alert.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">{alert.timestamp}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentAlertsPanel;
