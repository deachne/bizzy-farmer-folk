
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, HardDrive, Server, BarChart2, AlertTriangle, FileText } from "lucide-react";

const SystemTabs = () => {
  return (
    <TabsList className="grid grid-cols-6 h-auto p-0">
      <TabsTrigger value="dashboard" className="flex items-center gap-2 py-2">
        <LayoutDashboard className="h-4 w-4" />
        <span>Dashboard</span>
      </TabsTrigger>
      <TabsTrigger value="resources" className="flex items-center gap-2 py-2">
        <HardDrive className="h-4 w-4" />
        <span>Resources</span>
      </TabsTrigger>
      <TabsTrigger value="services" className="flex items-center gap-2 py-2">
        <Server className="h-4 w-4" />
        <span>Services</span>
      </TabsTrigger>
      <TabsTrigger value="performance" className="flex items-center gap-2 py-2">
        <BarChart2 className="h-4 w-4" />
        <span>Performance</span>
      </TabsTrigger>
      <TabsTrigger value="alerts" className="flex items-center gap-2 py-2">
        <AlertTriangle className="h-4 w-4" />
        <span>Alerts</span>
      </TabsTrigger>
      <TabsTrigger value="logs" className="flex items-center gap-2 py-2">
        <FileText className="h-4 w-4" />
        <span>Logs</span>
      </TabsTrigger>
    </TabsList>
  );
};

export default SystemTabs;
