
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextItem } from "@/types/chat";
import ContextPanelContainer from "./context-panel/ContextPanelContainer";
import ContextPanelTabs from "./context-panel/ContextPanelTabs";
import KnowledgeTabContent from "./context-panel/KnowledgeTabContent";
import ConversationsTabContent from "./context-panel/ConversationsTabContent";
import MediaTabContent from "./context-panel/MediaTabContent";
import ContextTokenUsage from "./context-panel/ContextTokenUsage";
import { KnowledgeSource } from "./context-panel/KnowledgeSourceItem";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

interface ChatContextPanelProps {
  contextItems?: ContextItem[];
  onClose?: () => void;
}

const ChatContextPanel = ({ contextItems = [], onClose }: ChatContextPanelProps) => {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'conversations' | 'media'>('knowledge');
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
            <span className="sr-only">Close</span>
            <ChevronDown className="h-5 w-5" />
          </Button>
        )}
      </div>
      
      {/* Tabbed Navigation */}
      <ContextPanelTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Knowledge Tab */}
        {activeTab === 'knowledge' && (
          <KnowledgeTabContent
            isRefreshing={isRefreshing}
            knowledgeSources={knowledgeSources}
            onRefresh={refreshContext}
            onToggleKnowledgeSource={toggleKnowledgeSource}
            onAddDocument={addDocument}
          />
        )}
        
        {/* Conversations Tab */}
        {activeTab === 'conversations' && (
          <ConversationsTabContent />
        )}
        
        {/* Media Tab */}
        {activeTab === 'media' && (
          <MediaTabContent 
            contextItems={contextItems}
            onAddDocument={addDocument}
          />
        )}
      </div>
      
      {/* Token Usage Panel */}
      <ContextTokenUsage />
    </div>
  );
};

export default ChatContextPanel;
