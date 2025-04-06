
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectsTab from "./ProjectsTab";
import KnowledgeTab from "./KnowledgeTab";
import TokenUsage from "./TokenUsage";

interface ContextPanelProps {
  activeProject: {
    id: string;
    name: string;
  };
  extensionProjects: any;
  activeExtension: string;
  expandedProject: string | null;
  toggleProjectExpansion: (projectId: string) => void;
  onClose?: () => void;
}

const ContextPanel = ({ 
  activeProject, 
  extensionProjects, 
  activeExtension, 
  expandedProject, 
  toggleProjectExpansion,
  onClose 
}: ContextPanelProps) => {
  const [activeTab, setActiveTab] = useState("projects");
  
  const createNewChat = () => {
    console.log("Creating new chat in project:", activeProject.name);
  };

  return (
    <div className="w-80 border-l border-gray-200 bg-gray-50 flex flex-col shrink-0">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="font-medium text-lg">Context</h3>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-8 text-xs"
            onClick={() => console.log("Create new project")}
          >
            <Plus className="h-4 w-4 mr-1" />
            New Project
          </Button>
          {onClose && (
            <button className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex border-b border-gray-200 bg-white text-sm font-medium text-center text-gray-500">
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'projects' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'knowledge' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('knowledge')}
        >
          Knowledge
        </button>
      </div>

      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <span className="font-medium text-sm text-gray-700">
            {activeProject.name}
            {activeTab === 'projects' && (
              <span className="ml-1.5 text-xs text-gray-500">
                {activeExtension === "farm" && "🌾"}
                {activeExtension === "personal" && "🏠"}
                {activeExtension === "bank" && "🏦"}
              </span>
            )}
          </span>
          {activeTab === 'projects' ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => console.log("Create new chat in project:", activeProject.name)}
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              New Chat
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => console.log("Create new project")}
            >
              <Plus className="h-3 w-3 mr-1" />
              New Project
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'projects' ? (
          <ProjectsTab 
            activeExtension={activeExtension}
            extensionProjects={extensionProjects}
            expandedProject={expandedProject}
            toggleProjectExpansion={toggleProjectExpansion}
          />
        ) : (
          <KnowledgeTab 
            activeProject={activeProject}
            createNewChat={createNewChat}
          />
        )}
      </div>
      
      <TokenUsage />
    </div>
  );
};

export default ContextPanel;
