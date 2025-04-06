
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
    },
    {
      id: "cs4",
      name: "Personal Notes",
      model: "Claude 3.7 Sonnet",
      extension: "personal",
      path: "Personal Management"
    },
    {
      id: "cs5",
      name: "Financial Planning",
      model: "Claude 3.7 Sonnet",
      extension: "bank",
      path: "Financial Management"
    }
  ]);

  const createNewChat = () => {
    // Create a new chat with default welcome message
    const newSessionId = `cs${availableSessions.length + 1}`;
    const newSession: ChatSession = {
      id: newSessionId,
      name: "New Chat",
      model: "Claude 3.7 Sonnet",
      extension: activeChatSession.extension // Maintain the current extension
    };
    
    setAvailableSessions(prev => [...prev, newSession]);
    setActiveChatSession(newSession);
    
    setMessages([{
      id: Date.now().toString(),
      content: "Hello! How can I help with your farm management today? Feel free to ask about soil conditions, crop planning, or equipment maintenance.",
      sender: "ai",
      timestamp: new Date().toISOString(),
      status: "delivered"
    }]);
    
    toast({
      title: "New Chat Created",
      description: "You can start a fresh conversation",
      duration: 3000,
    });
  };

  const switchChatSession = (sessionId: string) => {
    console.log("Switching to session ID:", sessionId);
    const session = availableSessions.find(s => s.id === sessionId);
    if (session) {
      console.log("Found session:", session);
      setActiveChatSession(session);
      
      // Set welcome message based on the extension
      let welcomeMessage = "Hello! How can I help you today?";
      
      if (session.extension === "farm") {
        welcomeMessage = "Hello! How can I help with your farm management today? Feel free to ask about soil conditions, crop planning, or equipment maintenance.";
      } else if (session.extension === "personal") {
        welcomeMessage = "Hello! How can I help with your personal tasks today?";
      } else if (session.extension === "bank") {
        welcomeMessage = "Hello! How can I help with your financial management today?";
      }
      
      setMessages([{
        id: Date.now().toString(),
        content: welcomeMessage,
        sender: "ai",
        timestamp: new Date().toISOString(),
        status: "delivered"
      }]);
      
      toast({
        title: "Chat Session Changed",
        description: `Switched to ${session.name}`,
        duration: 3000,
      });
    } else {
      console.error("Session not found:", sessionId);
    }
  };

  return {
    activeChatSession,
    availableSessions,
    createNewChat,
    switchChatSession
  };
}
