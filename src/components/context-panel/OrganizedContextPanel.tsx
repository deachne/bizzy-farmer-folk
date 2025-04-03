
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ContextItem } from "@/types/chat";
import { Plus, Upload, Image, FileText } from "lucide-react";

interface OrganizedContextPanelProps {
  contextItems?: ContextItem[];
  conversations?: { name: string; count: number; active?: boolean }[];
  onAddSource?: () => void;
  onUploadMedia?: () => void;
}

const OrganizedContextPanel = ({ 
  contextItems = [], 
  conversations = [], 
  onAddSource,
  onUploadMedia 
}: OrganizedContextPanelProps) => {
  const [activeTab, setActiveTab] = useState("knowledge");
  
  return (
    <div className="flex flex-col h-full">
      <Tabs 
        defaultValue="knowledge" 
        className="flex-1 flex flex-col"
        onValueChange={setActiveTab}
      >
        <TabsList className="flex w-full rounded-none border-b bg-white">
          <TabsTrigger 
            value="knowledge" 
            className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Knowledge
          </TabsTrigger>
          <TabsTrigger 
            value="conversations" 
            className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Conversations
          </TabsTrigger>
          <TabsTrigger 
            value="media" 
            className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Media
          </TabsTrigger>
        </TabsList>
        
        {/* Knowledge Sources Tab */}
        <TabsContent value="knowledge" className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-800">Knowledge Sources</h4>
            {onAddSource && (
              <Button 
                onClick={onAddSource} 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Source
              </Button>
            )}
          </div>
          
          {contextItems.filter(item => item.type === "document").length > 0 ? (
            <div className="space-y-2">
              {contextItems.filter(item => item.type === "document").map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-2 bg-white rounded border hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600" defaultChecked />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No knowledge sources added yet</p>
              <p className="text-xs mt-1">Add documents to enhance your context</p>
            </div>
          )}
        </TabsContent>
        
        {/* Conversations Tab */}
        <TabsContent value="conversations" className="flex-1 overflow-y-auto p-4 space-y-4">
          {conversations.length > 0 ? (
            <div className="space-y-4">
              {/* Active Project Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-800 flex items-center">🌾 Farm Management</h4>
                </div>
                <div className="space-y-2">
                  {conversations
                    .filter(conv => conv.active)
                    .map((conv, idx) => (
                      <div 
                        key={idx} 
                        className="bg-blue-50 border border-blue-200 rounded-md p-3 cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-blue-800">{conv.name}</span>
                          <span className="text-xs text-green-700 px-2 py-0.5 bg-green-100 rounded-full font-medium">Active</span>
                        </div>
                        <div className="text-xs text-blue-600 mt-1">{conv.count} conversations</div>
                      </div>
                    ))
                  }
                  
                  {conversations
                    .filter(conv => !conv.active)
                    .map((conv, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white border rounded-md p-3 hover:border-blue-400 cursor-pointer hover:bg-blue-50/30"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">{conv.name}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{conv.count} conversations</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p className="text-sm">No conversations in this context</p>
            </div>
          )}
        </TabsContent>
        
        {/* Media Tab */}
        <TabsContent value="media" className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-800">Media</h4>
            {onUploadMedia && (
              <Button 
                onClick={onUploadMedia} 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            )}
          </div>
          
          {contextItems.filter(item => item.type === "image").length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {contextItems.filter(item => item.type === "image").map((item, index) => (
                <div 
                  key={index} 
                  className="relative aspect-square rounded overflow-hidden border bg-white"
                >
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="object-cover w-full h-full" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                    <p className="text-xs text-white truncate">{item.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Image className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No media files yet</p>
              <p className="text-xs mt-1">Upload images to enhance your context</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizedContextPanel;
