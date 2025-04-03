
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextItem } from "@/types/chat";
import ContextPanelContainer from "./context-panel/ContextPanelContainer";
import { KnowledgeSource } from "./context-panel/KnowledgeSourceItem";
import MediaGallery from "./context-panel/MediaGallery";
import TokenUsagePanel from "./context-panel/TokenUsagePanel";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronDown, Plus, Upload } from "lucide-react";

interface ChatContextPanelProps {
  contextItems?: ContextItem[];
  onClose?: () => void;
}

const ChatContextPanel = ({ contextItems = [], onClose }: ChatContextPanelProps) => {
  const [activeTab, setActiveTab] = useState<'sources' | 'context' | 'documents'>('sources');
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

  const addDocument = () => {
    toast({
      title: "Add document to context",
      description: "You can upload documents to enhance the conversation context",
      duration: 3000,
    });
  };
  
  const handleViewDocument = (item: ContextItem) => {
    if (item.type === "document") {
      window.open(item.url, "_blank");
      toast({
        title: "Opening document",
        description: `${item.name} opened in a new tab`,
        duration: 3000,
      });
    }
  };
  
  return (
    <ContextPanelContainer onClose={onClose}>
      {/* Tabbed Navigation */}
      <div className="flex border-b border-gray-200 bg-white text-sm font-medium text-center text-gray-500">
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'sources' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('sources')}
        >
          Knowledge
        </button>
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'context' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('context')}
        >
          Conversations
        </button>
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'documents' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('documents')}
        >
          Media
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Knowledge Sources Tab */}
        {activeTab === 'sources' && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Knowledge Sources</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshContext}
                disabled={isRefreshing}
                className="h-8 text-xs"
              >
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
            
            <div className="space-y-2 text-sm">
              {knowledgeSources.map(source => (
                <div key={source.id} className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50">
                  <span>{source.title}</span>
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-blue-600"
                    checked={source.active}
                    onChange={() => toggleKnowledgeSource(source.id)}
                  />
                </div>
              ))}
            </div>

            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 text-sm"
                onClick={addDocument}
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Document to Context
              </Button>
            </div>
          </div>
        )}
        
        {/* Conversations Tab */}
        {activeTab === 'context' && (
          <div className="p-4 space-y-6">
            {/* Project Content */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-800">Farm Management Conversations</h4>
              </div>
              <div className="space-y-2">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 cursor-pointer shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-800">Crop Planning</span>
                    <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full font-medium">Active</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-1">3 conversations</div>
                </div>
                <div className="bg-white border rounded-md p-3 hover:border-blue-400 cursor-pointer hover:bg-blue-50/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Pest Management</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">5 conversations</div>
                </div>
                <div className="bg-white border rounded-md p-3 hover:border-blue-400 cursor-pointer hover:bg-blue-50/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Field Health Monitoring</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">2 conversations</div>
                </div>
              </div>
            </div>

            {/* Recent Conversations */}
            <div>
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Recent Conversations</h4>
              <div className="space-y-3">
                <div className="p-2 border rounded bg-white">
                  <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 font-medium">Early blight treatment options</a>
                  <div className="text-xs text-gray-400 mt-1">Today, 2:45 PM • Crop Planning</div>
                </div>
                <div className="p-2 border rounded bg-white">
                  <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 font-medium">Soil test results for North Field</a>
                  <div className="text-xs text-gray-400 mt-1">Yesterday, 11:10 AM • Field Health</div>
                </div>
                <div className="p-2 border rounded bg-white">
                  <a href="#" className="block text-sm text-gray-700 hover:text-blue-600 font-medium">Irrigation scheduling</a>
                  <div className="text-xs text-gray-400 mt-1">2 days ago • Crop Planning</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="sm"
                className="w-fit text-sm"
              >
                <Plus className="h-4 w-4 mr-1" />
                New Conversation
              </Button>
            </div>
          </div>
        )}
        
        {/* Media and Documents Tab */}
        {activeTab === 'documents' && (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Images & Documents</h3>
            
            {contextItems && contextItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {contextItems.map(item => (
                  <div 
                    key={item.id} 
                    className="border rounded cursor-pointer hover:border-blue-400 overflow-hidden"
                    onClick={() => handleViewDocument(item)}
                  >
                    {item.type === 'image' ? (
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        <img 
                          src={item.url} 
                          alt={item.name} 
                          className="max-w-full max-h-full object-contain" 
                        />
                      </div>
                    ) : (
                      <div className="h-24 bg-gray-50 flex items-center justify-center">
                        <span className="text-xs text-gray-600">{item.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm border rounded bg-white">
                No media shared in this conversation
              </div>
            )}
            
            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 text-sm"
                onClick={addDocument}
              >
                <Upload className="h-4 w-4 mr-2" />
                Add Media to Context
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Token Usage Panel */}
      <TokenUsagePanel />
    </ContextPanelContainer>
  );
};

export default ChatContextPanel;
