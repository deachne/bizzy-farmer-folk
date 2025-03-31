
import React from "react";
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Paperclip, Mic, Camera, Clipboard, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatInputControlsProps {
  onOpenFileInput: () => void;
  onTogglePasteMenu: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onOpenCamera: () => void;
  onSendMessage: () => void;
  isRecording: boolean;
  canSend: boolean;
}

const ChatInputControls = ({
  onOpenFileInput,
  onTogglePasteMenu,
  onStartRecording,
  onStopRecording,
  onOpenCamera,
  onSendMessage,
  isRecording,
  canSend
}: ChatInputControlsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center space-x-1">
      {/* File upload button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
              onClick={onOpenFileInput}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Attach files</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      {/* Paste button - hide on mobile */}
      {!isMobile && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={onTogglePasteMenu}
              >
                <Clipboard className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Paste from clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Voice input button */}
      {!isMobile && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "text-gray-500 hover:text-gray-700",
                  isRecording && "bg-red-100 text-red-600"
                )}
                onClick={isRecording ? onStopRecording : onStartRecording}
              >
                <Mic className="h-5 w-5" />
                {isRecording && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRecording ? "Stop recording" : "Voice input"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Camera button */}
      {!isMobile && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={onOpenCamera}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Send button */}
      <Button
        className="bg-blue-600 hover:bg-blue-700 px-3"
        disabled={!canSend}
        onClick={onSendMessage}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInputControls;
