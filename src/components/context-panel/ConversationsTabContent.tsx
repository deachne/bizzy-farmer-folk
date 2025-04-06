
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  project: string;
}

interface Project {
  id: string;
  name: string;
  conversationsCount: number;
  isActive: boolean;
  conversations: Conversation[];
}

const ConversationsTabContent = () => {
  // Sample data for personal projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "personal-notes",
      name: "Personal Notes",
      conversationsCount: 3,
      isActive: true,
      conversations: [
        { id: "c1", title: "Note taking strategy", timestamp: "Today, 2:45 PM", project: "Personal Notes" },
        { id: "c2", title: "Productivity tips", timestamp: "Yesterday, 11:10 AM", project: "Personal Notes" },
        { id: "c3", title: "Book recommendations", timestamp: "2 days ago", project: "Personal Notes" }
      ]
    },
    {
      id: "home-renovation",
      name: "Home Renovation",
      conversationsCount: 2,
      isActive: false,
      conversations: [
        { id: "c4", title: "Kitchen design ideas", timestamp: "3 days ago", project: "Home Renovation" },
        { id: "c5", title: "Contractor quotes", timestamp: "5 days ago", project: "Home Renovation" }
      ]
    },
    {
      id: "travel-planning",
      name: "Travel Planning",
      conversationsCount: 2,
      isActive: false,
      conversations: [
        { id: "c6", title: "Europe itinerary", timestamp: "1 week ago", project: "Travel Planning" },
        { id: "c7", title: "Packing list", timestamp: "1 week ago", project: "Travel Planning" }
      ]
    }
  ]);

  const [expandedProjectId, setExpandedProjectId] = useState<string | null>("personal-notes");

  // Function to toggle project expansion
  const toggleProject = (projectId: string) => {
    setExpandedProjectId(prevId => prevId === projectId ? null : projectId);
  };

  // Function to set a project as active
  const setActiveProject = (projectId: string) => {
    setProjects(prev => 
      prev.map(project => ({
        ...project,
        isActive: project.id === projectId
      }))
    );
  };

  // Get all conversations for display in the Recent Conversations section
  const allConversations = projects.flatMap(project => 
    project.conversations.map(conv => ({
      ...conv,
      project: project.name
    }))
  ).sort((a, b) => {
    // Sort by timestamp (in a real app, you'd use actual date objects)
    if (a.timestamp.includes("Today")) return -1;
    if (b.timestamp.includes("Today")) return 1;
    if (a.timestamp.includes("Yesterday")) return -1;
    if (b.timestamp.includes("Yesterday")) return 1;
    return 0;
  }).slice(0, 3); // Get only the 3 most recent

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {projects.map(project => (
          <div 
            key={project.id}
            className={cn(
              "border rounded p-3 cursor-pointer transition-all duration-200",
              project.isActive 
                ? "bg-blue-50 border-blue-200" 
                : "bg-white hover:border-blue-400 hover:bg-blue-50/30"
            )}
            onClick={() => {
              toggleProject(project.id);
              setActiveProject(project.id);
            }}
          >
            <div className="flex items-center justify-between">
              <span className={cn(
                "text-sm font-medium",
                project.isActive ? "text-blue-800" : "text-gray-700"
              )}>
                {project.name}
              </span>
              {project.isActive && (
                <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full">Active</span>
              )}
            </div>
            <div className={cn(
              "text-xs mt-1",
              project.isActive ? "text-blue-600" : "text-gray-500"
            )}>
              {project.conversationsCount} conversations
            </div>

            {/* Show conversations when project is expanded */}
            {expandedProjectId === project.id && (
              <div className="mt-3 space-y-2 pl-2">
                {project.conversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className="p-2 border rounded bg-white hover:bg-blue-50 cursor-pointer"
                  >
                    <div className="text-sm text-gray-700 font-medium">{conversation.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{conversation.timestamp}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <h4 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Recent Conversations</h4>
      
      <div className="space-y-2">
        {allConversations.map(conversation => (
          <div 
            key={conversation.id}
            className="p-2 border rounded bg-white hover:bg-blue-50 cursor-pointer"
          >
            <div className="text-sm text-gray-700 font-medium">{conversation.title}</div>
            <div className="text-xs text-gray-400 mt-1">{conversation.timestamp} • {conversation.project}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationsTabContent;
