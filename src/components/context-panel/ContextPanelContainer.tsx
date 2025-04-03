
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContextPanelContainerProps {
  children: ReactNode;
  onClose?: () => void;
}

const ContextPanelContainer = ({ children, onClose }: ContextPanelContainerProps) => {
  return (
    <div className="h-full border-l flex flex-col bg-gray-50">
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h3 className="font-medium text-lg">Context</h3>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default ContextPanelContainer;
