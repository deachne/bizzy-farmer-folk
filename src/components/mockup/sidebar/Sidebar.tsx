
import React from "react";
import { FileText, CheckSquare, MessageSquare, Settings, Home, Folder } from "lucide-react";
import SidebarSection from "./SidebarSection";
import SidebarExtension from "./SidebarExtension";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-4 flex flex-col shrink-0">
      <div className="mb-6">
        <div className="flex items-center">
          <span className="text-xl font-bold">BizzyPerson</span>
        </div>
      </div>

      <SidebarSection title="Core Features">
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50">
          <FileText className="h-4 w-4 mr-3 text-blue-300" />Notes
        </a>
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50">
          <FileText className="h-4 w-4 mr-3 text-blue-300" />Documents
        </a>
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50">
          <CheckSquare className="h-4 w-4 mr-3 text-blue-300" />Tasks
        </a>
        <a href="#" className="flex items-center px-3 py-2 text-sm font-medium bg-blue-700 text-white rounded-md">
          <MessageSquare className="h-4 w-4 mr-3 text-white" />Chat
        </a>
      </SidebarSection>

      <SidebarSection title="Personal" showAddButton={true}>
        <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
          <Home className="h-4 w-4 mr-2 text-blue-300" />
          <span>Home Renovation</span>
        </a>
        <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
          <FileText className="h-4 w-4 mr-2 text-blue-300" />
          <span>Work Projects</span>
        </a>
      </SidebarSection>

      <SidebarSection title="Extensions">
        <SidebarExtension 
          title="BizzyFarmer" 
          icon="🌾"
          items={[
            { name: "2024 Season", icon: <Folder /> },
            { name: "2023 Season", icon: <Folder /> },
          ]}
        />
        <SidebarExtension 
          title="BizzyBank" 
          icon="🏦"
        />
      </SidebarSection>

      <SidebarSection title="Admin">
        <a href="#" className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40">
          <Settings className="h-4 w-4 mr-2 text-blue-300" />
          <span>Manage Extensions</span>
        </a>
      </SidebarSection>

      <div className="mt-auto p-4 border-t border-blue-700/50">
        <button className="flex items-center text-sm text-blue-200 hover:text-white w-full">
          <Settings className="h-5 w-5 mr-2" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
