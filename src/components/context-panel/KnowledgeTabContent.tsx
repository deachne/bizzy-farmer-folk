
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { RefreshCw, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { KnowledgeSource } from "./KnowledgeSourceItem";

interface KnowledgeTabContentProps {
  isRefreshing: boolean;
  knowledgeSources: KnowledgeSource[];
  onRefresh: () => void;
  onToggleKnowledgeSource: (id: string) => void;
  onAddDocument: () => void;
}

const KnowledgeTabContent = ({
  isRefreshing,
  knowledgeSources,
  onRefresh,
  onToggleKnowledgeSource,
  onAddDocument
}: KnowledgeTabContentProps) => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-700">Knowledge Sources</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRefresh}
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
              onChange={() => onToggleKnowledgeSource(source.id)}
            />
          </div>
        ))}
      </div>

      <div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-sm"
          onClick={onAddDocument}
        >
          <Upload className="h-4 w-4 mr-2" />
          Add Document to Context
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeTabContent;
