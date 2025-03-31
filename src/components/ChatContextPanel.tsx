
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextItem } from "@/types/chat";
import ContextPanelContainer from "./context-panel/ContextPanelContainer";
import ContextPanelHeader from "./context-panel/ContextPanelHeader";
import KnowledgeSourcesPanel, { KnowledgeSource } from "./context-panel/KnowledgeSourcesPanel";
import MediaGallery from "./context-panel/MediaGallery";
import TokenUsagePanel from "./context-panel/TokenUsagePanel";

interface ChatContextPanelProps {
  contextItems?: ContextItem[];
}

const ChatContextPanel = ({ contextItems = [] }: ChatContextPanelProps) => {
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
    
    const source = knowledgeSources.find(s => s.id === id);
    if (source) {
      toast({
        title: source.active ? "Source deactivated" : "Source activated",
        description: `${source.title} is now ${source.active ? "excluded from" : "included in"} context`,
        duration: 3000,
      });
    }
  };
  
  const handleViewDocument = (item: ContextItem) => {
    if (item.type === "document") {
      // For documents, we could open in a new tab or download
      window.open(item.url, "_blank");
      toast({
        title: "Opening document",
        description: `${item.name} opened in a new tab`,
        duration: 3000,
      });
    }
  };
  
  return (
    <ContextPanelContainer>
      <ContextPanelHeader 
        isRefreshing={isRefreshing} 
        onRefresh={refreshContext} 
      />
      
      <div className="p-4 space-y-6 overflow-y-auto flex-1">
        {/* Knowledge Sources Panel */}
        <KnowledgeSourcesPanel 
          sources={knowledgeSources} 
          onToggleSource={toggleKnowledgeSource} 
        />
        
        {/* Media Gallery */}
        <MediaGallery 
          contextItems={contextItems} 
          onViewDocument={handleViewDocument} 
        />
      </div>
      
      {/* Token Usage Panel */}
      <TokenUsagePanel />
    </ContextPanelContainer>
  );
};

export default ChatContextPanel;
