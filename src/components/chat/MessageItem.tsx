
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Message } from "@/types/chat";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import ArtifactTrigger from "../ArtifactTrigger";
import MessageAttachments from "./MessageAttachments";
import MessageActions from "./MessageActions";

interface MessageItemProps {
  message: Message;
  onSaveAsNote: (messageId: string) => void;
  uploadProgress?: Record<string, number>;
  onViewArtifact: (messageId: string, artifactIndex: number) => void;
  onAddImageToContext?: (imageUrl: string, imageName: string) => void;
}

const MessageItem = ({
  message,
  onSaveAsNote,
  uploadProgress = {},
  onViewArtifact,
  onAddImageToContext
}: MessageItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleMessageExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      className={cn(
        "rounded-lg p-4 animate-fade-in",
        message.sender === "user" 
          ? "bg-gray-100" 
          : "bg-white border border-blue-100",
        message.isNew && "animate-fade-in-up"
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {message.sender === "user" ? (
            <Avatar>
              <div className="text-white font-medium">U</div>
            </Avatar>
          ) : (
            <Avatar>
              <div className="text-white font-medium">AI</div>
            </Avatar>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900">
              {message.sender === "user" ? "You" : "Claude"}
            </div>
            <div className="text-sm text-gray-500">{message.timestamp}</div>
          </div>
          
          <Collapsible
            open={isExpanded}
            className="mt-2"
          >
            <div className="text-gray-700 whitespace-pre-wrap">
              {message.content}
            </div>
            
            {/* Display message attachments (images) */}
            {message.attachments && message.attachments.length > 0 && (
              <MessageAttachments 
                attachments={message.attachments} 
                onAddImageToContext={onAddImageToContext} 
              />
            )}
            
            <CollapsibleContent>
              {message.artifacts && message.artifacts.length > 0 && (
                <ArtifactTrigger 
                  artifacts={message.artifacts}
                  onViewInPanel={(artifactIndex) => onViewArtifact(message.id, artifactIndex)}
                />
              )}
            </CollapsibleContent>
            
            {message.content.length > 100 && (
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2"
                  onClick={toggleMessageExpansion}
                >
                  {!isExpanded ? (
                    <>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      Show more
                    </>
                  ) : (
                    <>
                      <ChevronUp className="h-4 w-4 mr-1" />
                      Show less
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
            )}
          </Collapsible>
          
          {Object.keys(uploadProgress).length > 0 && message.sender === "user" && message.status === "sending" && (
            <div className="mt-3">
              {Object.entries(uploadProgress).map(([id, progress]) => (
                <div key={id} className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Uploading file...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <MessageActions 
          message={message} 
          onSaveAsNote={onSaveAsNote} 
        />
      </div>
    </div>
  );
};

export default MessageItem;
