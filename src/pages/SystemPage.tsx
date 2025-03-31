
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import SystemHeader from "@/components/system/SystemHeader";
import SystemHealthMonitor from "@/components/system/SystemHealthMonitor";
import SystemTabs from "@/components/system/SystemTabs";
import ResourcesPanel from "@/components/system/ResourcesPanel";
import ServicesPanel from "@/components/system/ServicesPanel";
import RecentAlertsPanel from "@/components/system/RecentAlertsPanel";
import PerformanceOverview from "@/components/system/PerformanceOverview";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const SystemPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <SystemHeader />
          
          <div className="flex-1 p-6 overflow-y-auto">
            <h1 className="text-xl font-bold mb-4">System Health Monitor</h1>
            
            <SystemHealthMonitor />
            
            <Tabs defaultValue="dashboard" className="mt-6">
              <SystemTabs />
              
              <TabsContent value="dashboard" className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  <ResourcesPanel />
                  <ServicesPanel />
                  <RecentAlertsPanel />
                </div>
                
                <PerformanceOverview />
              </TabsContent>
              
              <TabsContent value="resources">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Detailed Resources Information</h2>
                  <p className="text-gray-500">Extended view of system resources would be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="services">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Detailed Services Information</h2>
                  <p className="text-gray-500">Extended view of system services would be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="performance">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Detailed Performance Information</h2>
                  <p className="text-gray-500">Extended view of system performance metrics would be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="alerts">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">Detailed Alerts Log</h2>
                  <p className="text-gray-500">Extended view of system alerts would be displayed here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="logs">
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-4">System Logs</h2>
                  <p className="text-gray-500">System logs would be displayed here.</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 pt-4 border-t">
              <h3 className="text-sm font-medium text-gray-500">Action Log:</h3>
              <div className="text-sm text-gray-600 mt-2">
                <p>Navigated to System Monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default SystemPage;
