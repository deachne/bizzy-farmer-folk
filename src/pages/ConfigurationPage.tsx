
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import ConfigurationHeader from "@/components/configuration/ConfigurationHeader";
import ConfigurationTabs from "@/components/configuration/ConfigurationTabs";

const ConfigurationPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <ConfigurationHeader />
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Configuration Management</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <ConfigurationTabs />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ConfigurationPage;
