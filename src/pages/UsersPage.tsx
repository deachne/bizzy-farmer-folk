
import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import UsersHeader from "@/components/users/UsersHeader";
import UsersTable from "@/components/users/UsersTable";

const UsersPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <UsersHeader />
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">User Management</h2>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <UsersTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default UsersPage;
