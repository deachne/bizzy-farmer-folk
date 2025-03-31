
import React from "react";
import { AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SystemHealthMonitor = () => {
  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="flex items-center mb-4">
        <span className="flex items-center text-red-600 font-medium">
          <AlertCircle className="h-5 w-5 mr-2" />
          System Status: Critical
        </span>
        <div className="ml-auto text-sm">
          <span className="bg-gray-100 px-2 py-1 rounded">2 active alerts</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Services Health (4/7)</span>
        </div>
        <Progress value={57} className="h-2 bg-red-100">
          <div className="h-full bg-red-500" style={{ width: '57%' }} />
        </Progress>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-2 text-center">
        <div>
          <div className="text-red-600 font-semibold">1</div>
          <div className="text-xs text-gray-500">Critical Alerts</div>
        </div>
        <div>
          <div className="text-amber-600 font-semibold">1</div>
          <div className="text-xs text-gray-500">High Alerts</div>
        </div>
        <div>
          <div className="text-gray-900 font-semibold">2</div>
          <div className="text-xs text-gray-500">Total Alerts</div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthMonitor;
