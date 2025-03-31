
import React from "react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Wifi, WifiOff } from "lucide-react";
import { ConnectionStatus } from "@/types/chat-input";

interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
}

const ConnectionStatusIndicator = ({ status }: ConnectionStatusIndicatorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            {status === "connected" ? (
              <Wifi className="h-5 w-5 text-green-500" />
            ) : status === "connecting" ? (
              <Wifi className="h-5 w-5 text-amber-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-500" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {status === "connected" 
              ? "Connected to AI" 
              : status === "connecting" 
                ? "Connecting..."
                : "Disconnected"
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConnectionStatusIndicator;
