
import React from "react";
import { cn } from "@/lib/utils";

interface Project {
  id: string;
  name: string;
  active: boolean;
  conversations: number;
  conversations_list: string[];
}

interface ProjectsTabProps {
  activeExtension: string;
  extensionProjects: Record<string, Project[]>;
  expandedProject: string | null;
  toggleProjectExpansion: (projectId: string) => void;
}

const ProjectsTab = ({ 
  activeExtension, 
  extensionProjects, 
  expandedProject, 
  toggleProjectExpansion 
}: ProjectsTabProps) => {
  return (
    <div className="space-y-6">
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          {activeExtension === "farm" && <h4 className="text-sm font-semibold text-gray-800 flex items-center">🌾 BizzyFarmer</h4>}
          {activeExtension === "personal" && <h4 className="text-sm font-semibold text-gray-800 flex items-center">🏠 Personal</h4>}
          {activeExtension === "bank" && <h4 className="text-sm font-semibold text-gray-800 flex items-center">🏦 BizzyBank</h4>}
        </div>
        
        <div className="space-y-2">
          {extensionProjects[activeExtension as keyof typeof extensionProjects].map((project) => (
            <div 
              key={project.id} 
              className={`${project.active ? 'bg-blue-50 border-blue-200' : 'bg-white hover:border-blue-400 hover:bg-blue-50/30'} border rounded-md p-3 cursor-pointer`}
              onClick={() => toggleProjectExpansion(project.id)}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${project.active ? 'text-blue-800' : 'text-gray-700'}`}>{project.name}</span>
                {project.active && (
                  <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full font-medium">Active</span>
                )}
              </div>
              <div className={`text-xs ${project.active ? 'text-blue-600' : 'text-gray-500'} mt-1`}>{project.conversations} conversations</div>
              {expandedProject === project.id && (
                <div className="ml-4 mt-2 space-y-1.5">
                  {project.conversations_list.map((conversation, idx) => (
                    <div 
                      key={idx} 
                      className="p-2 bg-white border rounded-md text-sm hover:bg-blue-50 cursor-pointer"
                    >
                      {conversation}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsTab;
