
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { HardDrive, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ResourcesPanel = () => {
  return (
    <Card className="border shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center">
          <HardDrive className="h-4 w-4 mr-2 text-blue-500" />
          <span className="font-medium">Resources</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>CPU Usage</span>
              <span className="font-medium">42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory Usage</span>
              <span className="font-medium">6.2GB</span>
            </div>
            <Progress value={45} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Storage Usage</span>
              <span className={cn("font-medium", 78 > 75 ? "text-amber-600" : "")}>78%</span>
            </div>
            <Progress value={78} className={cn(78 > 75 ? "bg-amber-100" : "")}>
              <div className={cn("h-full", 78 > 75 ? "bg-amber-500" : "bg-primary")} style={{ width: '78%' }} />
            </Progress>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesPanel;
