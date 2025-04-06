
import React from "react";
import { ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const TokenUsage = () => {
  return (
    <div className="border-t border-gray-200 p-4">
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="text-sm font-semibold text-gray-500">TOKEN USAGE</h3>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Model:</span>
            <span>Claude 3.7 Sonnet</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Est. Cost:</span>
            <span>$0.0250</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Input Tokens:</span>
            <span>3,250</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>Output Tokens:</span>
            <span>2,860</span>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TokenUsage;
