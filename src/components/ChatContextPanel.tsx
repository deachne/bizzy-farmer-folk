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
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([
    {
      id: "ks1",
      type: "note",
      title: "Field Observation (Yesterday)",
      active: true
    },
    {
      id: "ks2",
      type: "document",
      title: "Tomato Diseases PDF",
      active: true
    },
    {
      id: "ks3",
      type: "web",
      title: "University Extension Articles",
      active: true,
      source: "extension.org"
    }
  ]);
  
  const refreshContext = () => {
    setIsRefreshing(true);
    
    // Simulate refreshing context
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Context refreshed",
        description: "Knowledge sources have been updated",
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
      description: "You can upload documents to enhance the conversation context",
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
