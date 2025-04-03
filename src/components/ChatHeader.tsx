
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChatSession } from "@/types/chat";
import { ChevronDown, PlusCircle, SidebarOpen, SidebarClose } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <div className="flex items-center">
        <div className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded-md">
          BizzyPerson
        </div>
        <div className="text-xl font-semibold ml-2 text-gray-700">Chat</div>
      </div>
      
      <div className="flex space-x-3">
        {/* Session Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300">
              {activeChatSession.name}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {availableSessions.map(session => (
              <DropdownMenuItem 
                key={session.id}
                onClick={() => onSwitchSession(session.id)}
              >
                {session.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Model Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 border-gray-300">
              {activeChatSession.model}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Claude 3.7 Sonnet</DropdownMenuItem>
            <DropdownMenuItem>Claude 3.5 Sonnet</DropdownMenuItem>
            <DropdownMenuItem>Claude 3 Opus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Context Panel Toggle */}
        <Button
          variant={showContextPanel ? "secondary" : "outline"}
          className="flex items-center gap-2 border-gray-300"
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
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onCreateNewChat}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
