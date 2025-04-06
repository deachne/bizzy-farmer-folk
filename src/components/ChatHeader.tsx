
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
import { useState } from "react";

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

  return (
    <div className="flex items-center justify-between px-6 py-3 border-b bg-white">
      <div className="flex items-center">
        <div className="flex items-center text-lg font-medium">
          <span>
            {activeChatSession.extension === "farm" && "🌾 BizzyFarmer"}
            {activeChatSession.extension === "personal" && "🏠 Personal"}
            {activeChatSession.extension === "bank" && "🏦 Bank Management"}
            {!activeChatSession.extension && "BizzyPerson"}
          </span>
        </div>
        {activeChatSession.path && (
          <>
            <span className="ml-4 text-sm text-gray-500">» {activeChatSession.path}</span>
            <span className="ml-4 text-sm text-gray-500">» {activeChatSession.name}</span>
          </>
        )}
      </div>
      
      <div className="flex space-x-2 items-center">
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
        
        {/* Context Panel Toggle */}
        <Button
          variant={showContextPanel ? "secondary" : "outline"}
          className="flex items-center gap-2 border-gray-300 h-8"
          onClick={onToggleContextPanel}
        >
          {showContextPanel ? (
            <>
              <SidebarClose className="h-4 w-4" />
              {!isMobile && "Hide Context"}
            </>
          ) : (
            <>
              <SidebarOpen className="h-4 w-4" />
              {!isMobile && "Show Context"}
            </>
          )}
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
