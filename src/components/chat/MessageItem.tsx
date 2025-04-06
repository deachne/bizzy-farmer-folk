
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Message } from "@/types/chat";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Eye, Save } from "lucide-react";
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
  const [showActions, setShowActions] = useState(false);
  
  const toggleMessageExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  // Format the timestamp to show only the time (e.g. 10:15 AM)
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div 
      className={cn(
        "rounded-lg p-5 bg-white", 
        message.sender === "user" 
          ? "bg-gray-100" 
          : "bg-white",
        message.isNew && "animate-fade-in-up"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="font-semibold text-gray-900">
              {message.sender === "user" ? "You" : "Claude"}
            </div>
            <div className="text-sm text-gray-500">{formatTime(message.timestamp)}</div>
          </div>
          
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
            
          {message.artifacts && message.artifacts.length > 0 && (
            <div className="mt-3">
              <ArtifactTrigger 
                artifacts={message.artifacts}
                onViewInPanel={(artifactIndex) => onViewArtifact(message.id, artifactIndex)}
              />
            </div>
          )}
          
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
        
        {showActions && (
          <div className="flex space-x-1 ml-4">
            {message.sender === "ai" && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => onSaveAsNote(message.id)}
                title="Save as note"
              >
                <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {message.content.length > 200 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-2"
          onClick={toggleMessageExpansion}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              Show more
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default MessageItem;
