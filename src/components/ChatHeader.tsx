
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChatSession } from "@/types/chat";
import { ChevronDown, PlusCircle, SidebarOpen, SidebarClose, MoreHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";

interface ChatHeaderProps {
  activeChatSession: ChatSession;
  availableSessions: ChatSession[];
  onCreateNewChat: () => void;
  onSwitchSession: (sessionId: string) => void;
  onToggleContextPanel: () => void;
  showContextPanel: boolean;
}

const ChatHeader = ({ 
  activeChatSession,
  availableSessions,
  onCreateNewChat,
  onSwitchSession,
  onToggleContextPanel,
  showContextPanel
}: ChatHeaderProps) => {
  const isMobile = useIsMobile();
  const [selectedModel, setSelectedModel] = useState(activeChatSession.model || "Claude 3.7 Sonnet");
  
  // Update selectedModel when activeChatSession changes
  useEffect(() => {
    if (activeChatSession.model) {
      setSelectedModel(activeChatSession.model);
    }
  }, [activeChatSession]);
  
  const getExtensionEmoji = (extension?: string) => {
    switch(extension) {
      case "farm": return "🌾";
      case "personal": return "🏠";
      case "bank": return "🏦";
      default: return "";
    }
  };
  
  const getExtensionName = (extension?: string) => {
    switch(extension) {
      case "farm": return "BizzyFarmer";
      case "personal": return "Personal";
      case "bank": return "Bank Management";
      default: return "BizzyPerson";
    }
  };
  
  const handleExtensionSelect = (extension: string) => {
    console.log("Selecting extension:", extension);
    // Find a session with the requested extension or create one
    const session = availableSessions.find(s => s.extension === extension);
    if (session) {
      console.log("Found existing session:", session);
      onSwitchSession(session.id);
    } else {
      // This would create a new session with the selected extension
      console.log("Creating new session for extension:", extension);
      // Create a temporary session ID to prevent race conditions
      const tempSession: ChatSession = {
        id: `new-${Date.now()}`,
        name: getExtensionName(extension),
        model: selectedModel,
        extension: extension
      };
      // Call onCreateNewChat which should handle creating a new session
      onCreateNewChat();
    }
  };
  
  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center text-lg font-medium hover:bg-gray-100 p-1 rounded">
              <span>
                {getExtensionEmoji(activeChatSession.extension)} {getExtensionName(activeChatSession.extension)}
              </span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white border shadow-md rounded-md z-50">
            {activeChatSession.extension !== "farm" && (
              <DropdownMenuItem onClick={() => handleExtensionSelect("farm")}>
                🌾 BizzyFarmer
              </DropdownMenuItem>
            )}
            {activeChatSession.extension !== "bank" && (
              <DropdownMenuItem onClick={() => handleExtensionSelect("bank")}>
                🏦 Bank Management
              </DropdownMenuItem>
            )}
            {activeChatSession.extension !== "personal" && (
              <DropdownMenuItem onClick={() => handleExtensionSelect("personal")}>
                🏠 Personal
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {activeChatSession.path && (
          <>
            <span className="ml-4 text-sm text-gray-500">» {activeChatSession.path}</span>
          </>
        )}
        
        {activeChatSession.name && (
          <span className="ml-4 text-sm text-gray-500">» {activeChatSession.name}</span>
        )}
      </div>
      
      <div className="flex space-x-3 items-center">
        {/* Model Selector */}
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px] h-8 text-sm">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</SelectItem>
            <SelectItem value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</SelectItem>
            <SelectItem value="GPT-4o">GPT-4o</SelectItem>
            <SelectItem value="GPT-4o Mini">GPT-4o Mini</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Hide/Show Context Panel Button */}
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gray-300 h-8"
          onClick={onToggleContextPanel}
        >
          {showContextPanel ? "Hide Context" : "Show Context"}
        </Button>
        
        {/* New Chat Button */}
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white h-8"
          onClick={onCreateNewChat}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        
        {/* More Options */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
