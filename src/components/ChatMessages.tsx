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
  AlertCircle
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

interface ChatMessagesProps {
  messages: Message[];
  isAiTyping: boolean;
  onSaveAsNote: (messageId: string) => void;
  messagesEndRef: RefObject<HTMLDivElement>;
  uploadProgress?: Record<string, number>;
}

const ChatMessages = ({ 
  messages, 
  isAiTyping, 
  onSaveAsNote, 
  messagesEndRef,
  uploadProgress = {}
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

  const renderStatusIcon = (status?: string) => {
    switch (status) {
      case "sending":
        return <Clock className="h-4 w-4 text-gray-400" />;
      case "sent":
        return <CheckCircle className="h-4 w-4 text-gray-400" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
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
                  <Avatar className="h-10 w-10 bg-gray-300">
                    <div className="text-white font-medium">U</div>
                  </Avatar>
                ) : (
                  <Avatar className="h-10 w-10 bg-blue-600">
                    <div className="text-white font-medium">AI</div>
                  </Avatar>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-gray-900 flex items-center">
                    {message.sender === "user" ? "You" : "Claude"}
                    {message.status && (
                      <span className="ml-2" title={message.status}>
                        {renderStatusIcon(message.status)}
                      </span>
                    )}
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
                  
                  <CollapsibleContent>
                    {message.artifacts && message.artifacts.length > 0 && (
                      <div className="mt-4 space-y-4">
                        {message.artifacts.map(artifact => (
                          <div key={artifact.id} className="border rounded-md overflow-hidden">
                            {artifact.type === "table" && (
                              <div>
                                {artifact.title && (
                                  <div className="bg-gray-50 p-3 font-medium text-gray-700 border-b">
                                    {artifact.title}
                                  </div>
                                )}
                                <div className="overflow-x-auto">
                                  <table className="w-full">
                                    <tbody>
                                      {artifact.content.rows.map((row: string[], i: number) => (
                                        <tr key={i} className="border-b">
                                          {row.map((cell, j) => (
                                            <td 
                                              key={`${i}-${j}`} 
                                              className={cn(
                                                "p-3",
                                                j === 0 && "font-medium bg-gray-50"
                                              )}
                                            >
                                              {cell}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                                <div className="bg-gray-50 p-2 flex justify-end border-t">
                                  <Button variant="ghost" size="sm">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open in Notes
                                  </Button>
                                </div>
                              </div>
                            )}
                            
                            {artifact.type === "chart" && (
                              <div className="p-4">
                                <div className="text-center font-medium mb-2">{artifact.title}</div>
                                <div className="bg-gray-100 h-40 flex items-center justify-center">
                                  [Chart Visualization]
                                </div>
                              </div>
                            )}
                            
                            {artifact.type === "image" && (
                              <div>
                                <div className="text-center font-medium mb-2">{artifact.title}</div>
                                <img 
                                  src={typeof artifact.content === 'string' ? artifact.content : ''}
                                  alt={artifact.title || "Image"} 
                                  className="max-w-full"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
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
                <Avatar className="h-10 w-10 bg-blue-600">
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
