
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import UpdateBanner from "@/components/dashboard/UpdateBanner";
import SystemOverviewCards from "@/components/dashboard/SystemOverviewCards";
import ExtensionManagement from "@/components/dashboard/ExtensionManagement";

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <UpdateBanner />
              
              <h2 className="text-xl font-bold mb-4">System Overview</h2>
              
              <SystemOverviewCards />
              
              <ExtensionManagement />
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
