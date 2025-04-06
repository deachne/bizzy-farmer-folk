
import { useState } from "react";
import { ChatSession, Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";

export function useChatSessions(
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) {
  const [activeChatSession, setActiveChatSession] = useState<ChatSession>({
    id: "cs1",
    name: "Farm Management",
    model: "Claude 3.7 Sonnet",
    extension: "farm",
    path: "Early Blight"
  });

  const [availableSessions, setAvailableSessions] = useState<ChatSession[]>([
    {
      id: "cs1",
      name: "Farm Management",
      model: "Claude 3.7 Sonnet",
      extension: "farm",
      path: "Early Blight"
    },
    {
      id: "cs2",
      name: "Crop Planning",
      model: "Claude 3.7 Sonnet",
      extension: "farm",
      path: "Crop Planning"
    },
    {
      id: "cs3",
      name: "Equipment Maintenance",
      model: "Claude 3.7 Sonnet",
      extension: "farm",
      path: "Equipment"
    }
  ]);

  const createNewChat = () => {
    setMessages([{
      id: Date.now().toString(),
      content: "Hello! How can I help with your farm management today? Feel free to ask about soil conditions, crop planning, or equipment maintenance.",
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "delivered"
    }]);
    
    toast({
      title: "New Chat Created",
      description: "You can start a fresh conversation",
      duration: 3000,
    });
  };

  const switchChatSession = (sessionId: string) => {
    const session = availableSessions.find(s => s.id === sessionId);
    if (session) {
      setActiveChatSession(session);
      toast({
        title: "Chat Session Changed",
        description: `Switched to ${session.name}`,
        duration: 3000,
      });
    }
  };

  return {
    activeChatSession,
    availableSessions,
    createNewChat,
    switchChatSession
  };
}
