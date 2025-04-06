
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextItem } from "@/types/chat";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import ContextPanelTabs from "./context-panel/ContextPanelTabs";
import KnowledgeTabContent from "./context-panel/KnowledgeTabContent";
import ConversationsTabContent from "./context-panel/ConversationsTabContent";
import { KnowledgeSource } from "./context-panel/KnowledgeSourceItem";

interface ChatContextPanelProps {
  contextItems?: ContextItem[];
  onClose?: () => void;
  activeProject?: {
    id: string;
    name: string;
  };
}

const ChatContextPanel = ({ 
  contextItems = [], 
  onClose,
  activeProject = { id: "personal-notes", name: "Personal Notes" }
}: ChatContextPanelProps) => {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'projects'>('knowledge');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Update knowledge sources based on active project
  const getProjectKnowledgeSources = (projectId: string): KnowledgeSource[] => {
    switch (projectId) {
      case "home-renovation":
        return [
          {
            id: "hr1",
            type: "note",
            title: "Kitchen Measurements",
            active: true
          },
          {
            id: "hr2",
            type: "document",
            title: "Contractor Quotes PDF",
            active: true
          },
          {
            id: "hr3",
            type: "web",
            title: "Home Improvement Articles",
            active: true,
            source: "homedepot.com"
          }
        ];
      case "travel-planning":
        return [
          {
            id: "tp1",
            type: "note",
            title: "Trip Itinerary",
            active: true
          },
          {
            id: "tp2",
            type: "document",
            title: "Flight Confirmations",
            active: true
          },
          {
            id: "tp3",
            type: "web",
            title: "Travel Guides",
            active: true,
            source: "tripadvisor.com"
          }
        ];
      case "personal-notes":
      default:
        return [
          {
            id: "pn1",
            type: "note",
            title: "Meeting Notes",
            active: true
          },
          {
            id: "pn2",
            type: "document",
            title: "Reference Documents",
            active: true
          },
          {
            id: "pn3",
            type: "web",
            title: "Research Articles",
            active: true,
            source: "scholar.google.com"
          }
        ];
    }
  };
  
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>(
    getProjectKnowledgeSources(activeProject.id)
  );
  
  // Update knowledge sources when active project changes
  useState(() => {
    setKnowledgeSources(getProjectKnowledgeSources(activeProject.id));
  });
  
  const refreshContext = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing context
    setTimeout(() => {
      setIsRefreshing(false);
      setKnowledgeSources(getProjectKnowledgeSources(activeProject.id));
      toast({
        title: "Context refreshed",
        description: `Knowledge sources for ${activeProject.name} have been updated`,
        duration: 3000,
      });
    }, 1500);
  };
  
  const toggleKnowledgeSource = (id: string) => {
    setKnowledgeSources(prev => 
      prev.map(source => 
        source.id === id
          ? { ...source, active: !source.active }
          : source
      )
    );
  };

  const addDocument = () => {
    toast({
      title: "Add document to context",
      description: `You can upload documents to enhance the ${activeProject.name} context`,
      duration: 3000,
    });
  };
  
  return (
    <div className="h-full border-l flex flex-col bg-gray-50">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="font-medium text-lg">Context</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Tabbed Navigation */}
      <div className="flex border-b border-gray-200 bg-white text-sm font-medium text-center text-gray-500">
        <button 
          className={`flex-1 py-2.5 px-1 border-b-2 ${activeTab === 'projects' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-700 hover:border-gray-300'}`}
          onClick={() => setActiveTab('projects')}
        >
          Projects
        </button>
        <button 
          className={`flex-1 py-2.5 px-1 border-b-2 ${activeTab === 'knowledge' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-700 hover:border-gray-300'}`}
          onClick={() => setActiveTab('knowledge')}
        >
          Knowledge
        </button>
      </div>
      
      {/* Project Title Bar */}
      <div className="p-3 border-b border-gray-200 flex justify-between items-center">
        <span className="font-medium text-sm text-gray-700">
          {activeProject.name}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 text-xs"
        >
          + New Project
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'knowledge' && (
          <KnowledgeTabContent
            isRefreshing={isRefreshing}
            knowledgeSources={knowledgeSources}
            onRefresh={refreshContext}
            onToggleKnowledgeSource={toggleKnowledgeSource}
            onAddDocument={addDocument}
            activeProject={activeProject}
          />
        )}
        
        {activeTab === 'projects' && (
          <ConversationsTabContent />
        )}
      </div>
    </div>
  );
};

export default ChatContextPanel;
