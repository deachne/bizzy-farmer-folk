
import { useState } from "react";
import { Check, ChevronDown, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { KnowledgeSource } from "./KnowledgeSourceItem";

interface KnowledgeTabContentProps {
  isRefreshing: boolean;
  knowledgeSources: KnowledgeSource[];
  onRefresh: () => void;
  onToggleKnowledgeSource: (id: string) => void;
  onAddDocument: () => void;
  activeProject: {
    id: string;
    name: string;
  };
}

const KnowledgeTabContent = ({
  isRefreshing,
  knowledgeSources,
  onRefresh,
  onToggleKnowledgeSource,
  onAddDocument,
  activeProject
}: KnowledgeTabContentProps) => {
  // Group knowledge sources by type
  const notesSources = knowledgeSources.filter(source => source.type === "note");
  const documentSources = knowledgeSources.filter(source => source.type === "document");
  const webSources = knowledgeSources.filter(source => source.type === "web");
  
  return (
    <div className="space-y-6">
      {/* Knowledge Sources Section */}
      <Collapsible defaultOpen={true}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500">{activeProject.name.toUpperCase()} KNOWLEDGE</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronDown className="h-4 w-4 transition-transform" />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4">
          {/* Your Notes */}
          {notesSources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Your Notes</h4>
              {notesSources.map(source => (
                <div 
                  key={source.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{source.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "p-0 h-6 w-6",
                      source.active ? "text-green-600" : "text-gray-400"
                    )}
                    onClick={() => onToggleKnowledgeSource(source.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {notesSources.length === 0 && (
                <div className="text-sm text-gray-500">No notes available</div>
              )}
            </div>
          )}
          
          {/* Knowledge Base */}
          {documentSources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">{activeProject.name} Documents</h4>
              {documentSources.map(source => (
                <div 
                  key={source.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{source.title}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "p-0 h-6 w-6",
                      source.active ? "text-green-600" : "text-gray-400"
                    )}
                    onClick={() => onToggleKnowledgeSource(source.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          {/* Web Sources */}
          {webSources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Web Sources</h4>
              {webSources.map(source => (
                <div 
                  key={source.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{source.title}</span>
                    {source.source && (
                      <span className="text-xs text-gray-500 ml-1">({source.source})</span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "p-0 h-6 w-6",
                      source.active ? "text-green-600" : "text-gray-400"
                    )}
                    onClick={() => onToggleKnowledgeSource(source.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>

      {/* Images & Documents Section */}
      <Collapsible defaultOpen={true}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500">IMAGES & DOCUMENTS</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronDown className="h-4 w-4 transition-transform" />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 text-center text-gray-500 text-sm border rounded bg-white">
            No media shared in this conversation
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Custom Instructions */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500">CUSTOM INSTRUCTIONS</h3>
          <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Token Usage */}
      <div className="border-t pt-4 mt-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500">TOKEN USAGE</h3>
          <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeTabContent;
