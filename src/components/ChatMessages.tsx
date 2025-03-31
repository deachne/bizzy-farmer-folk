
import { RefObject, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Message } from "@/pages/ChatPage";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Save, 
  ChevronDown, 
  ChevronUp, 
  MoreHorizontal,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  Maximize
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import ArtifactTrigger from "./ArtifactTrigger";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ChatMessagesProps {
  messages: Message[];
  isAiTyping: boolean;
  onSaveAsNote: (messageId: string) => void;
  messagesEndRef: RefObject<HTMLDivElement>;
  uploadProgress?: Record<string, number>;
  onViewArtifact: (messageId: string, artifactIndex: number) => void;
  onAddImageToContext?: (imageUrl: string, imageName: string) => void;
}

const ChatMessages = ({ 
  messages, 
  isAiTyping, 
  onSaveAsNote, 
  messagesEndRef,
  uploadProgress = {},
  onViewArtifact,
  onAddImageToContext
}: ChatMessagesProps) => {
  const [expandedMessages, setExpandedMessages] = useState<Record<string, boolean>>({});
  
  const toggleMessageExpansion = (messageId: string) => {
    setExpandedMessages(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };
  
  const copyMessageToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-6 pb-6">
        {messages.map(message => (
          <div 
            key={message.id} 
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
                  open={expandedMessages[message.id] !== false}
                  className="mt-2"
                >
                  <div className="text-gray-700 whitespace-pre-wrap">
                    {message.content}
                  </div>
                  
                  {/* Display message attachments (images) */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.attachments.map(attachment => (
                        attachment.type.startsWith('image/') ? (
                          <div key={attachment.id} className="relative">
                            <Dialog>
                              <DialogTrigger asChild>
                                <div className="group relative cursor-pointer">
                                  <img 
                                    src={attachment.url} 
                                    alt={attachment.name}
                                    className="h-24 w-24 object-cover rounded border border-gray-200"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                                    <Maximize className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl p-1 bg-transparent border-0">
                                <img 
                                  src={attachment.url} 
                                  alt={attachment.name}
                                  className="max-h-[80vh] max-w-full rounded"
                                />
                              </DialogContent>
                            </Dialog>
                            {onAddImageToContext && (
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute -bottom-2 -right-2 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => onAddImageToContext(attachment.url, attachment.name)}
                              >
                                Add to context
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div key={attachment.id} className="p-2 border border-gray-200 rounded text-xs flex items-center gap-1">
                            <FileText className="h-4 w-4" />
                            {attachment.name}
                          </div>
                        )
                      ))}
                    </div>
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
                        onClick={() => toggleMessageExpansion(message.id)}
                      >
                        {expandedMessages[message.id] === false ? (
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
              
              <div className="flex-shrink-0 ml-4 flex flex-col space-y-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500"
                  onClick={() => copyMessageToClipboard(message.content)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                
                {message.sender === "ai" && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500"
                    onClick={() => onSaveAsNote(message.id)}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Add to context</DropdownMenuItem>
                    <DropdownMenuItem>Regenerate response</DropdownMenuItem>
                    <DropdownMenuItem>Share message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
        
        {isAiTyping && (
          <div className="rounded-lg p-4 bg-white border border-blue-100 animate-pulse">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <Avatar>
                  <div className="text-white font-medium">AI</div>
                </Avatar>
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900">Claude</div>
                  <div className="text-sm text-gray-500">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      Typing...
                    </Badge>
                  </div>
                </div>
                
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
