
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Server, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceStatus = "healthy" | "warning" | "critical";

interface ServiceItem {
  name: string;
  status: ServiceStatus;
}

const services: ServiceItem[] = [
  { name: "API Server", status: "healthy" },
  { name: "Database Server", status: "healthy" },
  { name: "Vector Store", status: "warning" },
  { name: "File Storage", status: "healthy" },
  { name: "Chat Server", status: "healthy" },
];

const ServicesPanel = () => {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <Server className="h-4 w-4 mr-2 text-purple-500" />
          <span className="font-medium">Services</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-3">
          {services.map((service) => (
            <div 
              key={service.name} 
              className="flex items-center justify-between py-1 border-b last:border-0"
            >
              <span className="text-sm">{service.name}</span>
              <span 
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  service.status === "healthy" && "bg-green-100 text-green-700",
                  service.status === "warning" && "bg-amber-100 text-amber-700",
                  service.status === "critical" && "bg-red-100 text-red-700",
                )}
              >
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServicesPanel;
