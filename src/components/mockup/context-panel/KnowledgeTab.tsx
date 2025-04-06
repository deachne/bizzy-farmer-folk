import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, FileText } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import CustomInstructions from "./CustomInstructions";

interface KnowledgeTabProps {
  activeProject: {
    id: string;
    name: string;
  };
  createNewChat: () => void;
}

const KnowledgeTab = ({ activeProject, createNewChat }: KnowledgeTabProps) => {
  return (
    <div className="space-y-6">
      {/* Knowledge Sources Section for the active project */}
      <Collapsible defaultOpen={true}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500">{activeProject.name.toUpperCase()} KNOWLEDGE</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronRight className={cn("h-4 w-4 transition-transform rotate-90")} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4">
          {/* Your Notes */}
          <div>
            <h4 className="text-sm font-medium mb-2">Your Notes</h4>
            <div 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm">Field Observation (Yesterday)</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 text-green-600"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Crop Knowledge Base */}
          <div>
            <h4 className="text-sm font-medium mb-2">Crop Knowledge Base</h4>
            <div 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm">Tomato Diseases PDF</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 text-green-600"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Web Sources */}
          <div>
            <h4 className="text-sm font-medium mb-2">Web Sources</h4>
            <div 
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm">University Extension Articles</span>
                <span className="text-xs text-gray-500 ml-1">(extension.org)</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-6 w-6 text-green-600"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Images & Documents Section */}
      <Collapsible defaultOpen={true}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500">IMAGES & DOCUMENTS</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronRight className={cn("h-4 w-4 transition-transform rotate-90")} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="p-4 text-center text-gray-500 text-sm border rounded bg-white">
            No media shared in this conversation
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Custom Instructions added at the bottom */}
      <CustomInstructions />
    </div>
  );
};

export default KnowledgeTab;
