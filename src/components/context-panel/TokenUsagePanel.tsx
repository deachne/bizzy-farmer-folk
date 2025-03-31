
import { MessageSquare, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TokenCounter from "@/components/TokenCounter";

const TokenUsagePanel = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mt-auto border-t">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between p-3 hover:bg-gray-50">
          <div className="flex items-center">
            <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
            <h3 className="text-sm font-medium">TOKEN USAGE</h3>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-90"
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="px-3 pb-3">
            <TokenCounter />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TokenUsagePanel;
