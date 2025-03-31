
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, Shield, Network, Bell, BarChart, Cpu } from "lucide-react";
import SystemSettingsPanel from "./SystemSettingsPanel";
import AIModelsPanel from "./AIModelsPanel";

const ConfigurationTabs = () => {
  return (
    <Tabs defaultValue="system" className="w-full mb-6">
      <TabsList className="grid grid-cols-6 gap-4 bg-transparent">
        <TabsTrigger value="system" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
          <Settings className="h-4 w-4" />
          <span>System Settings</span>
          <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
        </TabsTrigger>
        <TabsTrigger value="security" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          <span>Security Settings</span>
          <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
        </TabsTrigger>
        <TabsTrigger value="integration" className="flex items-center gap-2">
          <Network className="h-4 w-4" />
          <span>Integration Settings</span>
          <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">4</span>
        </TabsTrigger>
        <TabsTrigger value="ai-models" className="flex items-center gap-2">
          <Cpu className="h-4 w-4" />
          <span>AI Models</span>
          <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
        </TabsTrigger>
        <TabsTrigger value="notification" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>Notification Settings</span>
          <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">5</span>
        </TabsTrigger>
        <TabsTrigger value="performance" className="flex items-center gap-2">
          <BarChart className="h-4 w-4" />
          <span>Performance</span>
          <span className="bg-gray-100 text-gray-700 rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="system">
        <SystemSettingsPanel />
      </TabsContent>
      
      <TabsContent value="security">
        <div className="text-gray-500 p-4 text-center">Security settings coming soon...</div>
      </TabsContent>
      
      <TabsContent value="integration">
        <div className="text-gray-500 p-4 text-center">Integration settings coming soon...</div>
      </TabsContent>
      
      <TabsContent value="ai-models">
        <AIModelsPanel />
      </TabsContent>
      
      <TabsContent value="notification">
        <div className="text-gray-500 p-4 text-center">Notification settings coming soon...</div>
      </TabsContent>
      
      <TabsContent value="performance">
        <div className="text-gray-500 p-4 text-center">Performance settings coming soon...</div>
      </TabsContent>
    </Tabs>
  );
};

export default ConfigurationTabs;
