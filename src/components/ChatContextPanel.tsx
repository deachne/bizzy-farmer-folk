
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextItem } from "@/types/chat";
import ContextPanelContainer from "./context-panel/ContextPanelContainer";
import { KnowledgeSource } from "./context-panel/KnowledgeSourceItem";
import MediaGallery from "./context-panel/MediaGallery";
import TokenUsagePanel from "./context-panel/TokenUsagePanel";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ChevronDown, Plus, Upload, RefreshCw } from "lucide-react";

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
      <div className="flex border-b border-gray-200 bg-white text-sm font-medium text-center text-gray-500">
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
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'conversations' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('conversations')}
        >
          Conversations
        </button>
        <button 
          className={cn(
            "flex-1 py-2.5 px-1 border-b-2",
            activeTab === 'media' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent hover:text-gray-700 hover:border-gray-300'
          )}
          onClick={() => setActiveTab('media')}
        >
          Media
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Knowledge Tab */}
        {activeTab === 'knowledge' && (
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-700">Knowledge Sources</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refreshContext}
                disabled={isRefreshing}
                className="h-8 text-xs"
              >
                <RefreshCw className={cn(
                  "h-3.5 w-3.5 mr-1.5",
                  isRefreshing && "animate-spin"
                )} />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
            
            <div className="space-y-2">
              {knowledgeSources.map(source => (
                <div key={source.id} className="flex items-center justify-between p-2 rounded border bg-white hover:bg-gray-50">
                  <span className="text-sm">{source.title}</span>
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
        {activeTab === 'conversations' && (
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">Crop Planning</span>
                  <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full">Active</span>
                </div>
                <div className="text-xs text-blue-600 mt-1">3 conversations</div>
              </div>
              
              <div className="bg-white border rounded p-3 hover:border-blue-400 hover:bg-blue-50/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Pest Management</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">5 conversations</div>
              </div>
              
              <div className="bg-white border rounded p-3 hover:border-blue-400 hover:bg-blue-50/30">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Field Health Monitoring</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">2 conversations</div>
              </div>
            </div>
            
            <h4 className="text-sm font-semibold text-gray-700 mt-6 mb-3">Recent Conversations</h4>
            
            <div className="space-y-2">
              <div className="p-2 border rounded bg-white">
                <div className="text-sm text-gray-700 font-medium">Early blight treatment options</div>
                <div className="text-xs text-gray-400 mt-1">Today, 2:45 PM • Crop Planning</div>
              </div>
              
              <div className="p-2 border rounded bg-white">
                <div className="text-sm text-gray-700 font-medium">Soil test results for North Field</div>
                <div className="text-xs text-gray-400 mt-1">Yesterday, 11:10 AM • Field Health</div>
              </div>
              
              <div className="p-2 border rounded bg-white">
                <div className="text-sm text-gray-700 font-medium">Irrigation scheduling</div>
                <div className="text-xs text-gray-400 mt-1">2 days ago • Crop Planning</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Media Tab */}
        {activeTab === 'media' && (
          <div className="p-4 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700">Images & Documents</h3>
            
            {contextItems && contextItems.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {contextItems.map(item => (
                  <div 
                    key={item.id} 
                    className="border rounded overflow-hidden"
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
      <div className="border-t p-3 bg-white">
        <div className="flex items-center justify-between mb-1">
          <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
            <span>TOKEN USAGE</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </button>
          <span className="text-xs text-gray-500">Est. Cost: $55.7050</span>
        </div>
        
        <div className="text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
            </div>
            <span className="ml-2">6,110 / 200,000 tokens</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-xs text-gray-400">Input</span>
              <div className="font-medium">3,250</div>
            </div>
            <div>
              <span className="text-xs text-gray-400">Output</span>
              <div className="font-medium">2,860</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContextPanel;
