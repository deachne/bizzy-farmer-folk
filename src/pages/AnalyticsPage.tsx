
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import { BarChart, BarChart2, LineChart } from "lucide-react";

const AnalyticsPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <div className="border-b px-6 py-4">
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Analytics Card 1 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Usage Stats</h3>
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-400">Usage chart will appear here</p>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Last 30 days</span>
                    <span className="text-blue-600 font-medium">+24%</span>
                  </div>
                </div>
                
                {/* Analytics Card 2 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">AI Interactions</h3>
                    <LineChart className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-400">AI metrics chart will appear here</p>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Last 30 days</span>
                    <span className="text-green-600 font-medium">+42%</span>
                  </div>
                </div>
                
                {/* Analytics Card 3 */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Extension Activity</h3>
                    <BarChart className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="h-40 flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-400">Extension activity chart will appear here</p>
                  </div>
                  <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Last 30 days</span>
                    <span className="text-purple-600 font-medium">+18%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Detailed Analytics</h3>
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                    <p className="text-gray-400">Detailed metrics and analytics will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default AnalyticsPage;
