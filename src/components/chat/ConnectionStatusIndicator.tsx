
import React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ConnectionStatus } from "@/types/chat-input";

interface ConnectionStatusIndicatorProps {
  status: ConnectionStatus;
}

const ConnectionStatusIndicator = ({ status }: ConnectionStatusIndicatorProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center mx-1">
            {status === 'connected' ? (
              <Wifi className="h-4 w-4 text-green-600" />
            ) : status === 'connecting' ? (
              <Wifi className="h-4 w-4 text-yellow-500 animate-pulse" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">
            {status === 'connected' 
              ? 'Connected to server' 
              : status === 'connecting' 
                ? 'Connecting...' 
                : 'Disconnected'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ConnectionStatusIndicator;
