
import { useState, useRef, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import ChatMessages from "@/components/ChatMessages";
import ChatInputBar from "@/components/ChatInputBar";
import ChatHeader from "@/components/ChatHeader";
import ChatContextPanel from "@/components/ChatContextPanel";
import { toast } from "@/components/ui/use-toast";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  artifacts?: Artifact[];
  isNew?: boolean;
}

export interface Artifact {
  id: string;
  type: "table" | "image" | "chart";
  content: any;
  title?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  model: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help with your farm management today? Feel free to ask about soil conditions, crop planning, or equipment maintenance.",
      sender: "ai",
      timestamp: "9:30 AM"
    },
    {
      id: "2",
      content: "I noticed some spots on my tomato plants this morning. The leaves have yellow patches with brown spots. What could it be?",
      sender: "user",
      timestamp: "9:32 AM"
    },
    {
      id: "3",
      content: "Based on your description, it sounds like your tomato plants may have early blight, a common fungal disease. Here's a table of treatment options:",
      sender: "ai",
      timestamp: "9:33 AM",
      artifacts: [
        {
          id: "a1",
          type: "table",
          title: "TREATMENT OPTIONS",
          content: {
            headers: ["", ""],
            rows: [
              ["Organic", "Copper fungicide, neem oil, remove affected leaves"],
              ["Chemical", "Chlorothalonil, mancozeb, or proprietary fungicides"]
            ]
          }
        }
      ]
    }
  ]);

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [activeChatSession, setActiveChatSession] = useState<ChatSession>({
    id: "cs1",
    name: "Farm Management",
    model: "Claude 3.7 Sonnet"
  });
  const [availableSessions, setAvailableSessions] = useState<ChatSession[]>([
    {
      id: "cs1",
      name: "Farm Management",
      model: "Claude 3.7 Sonnet"
    },
    {
      id: "cs2",
      name: "Crop Planning",
      model: "Claude 3.7 Sonnet"
    },
    {
      id: "cs3",
      name: "Equipment Maintenance",
      model: "Claude 3.7 Sonnet"
    }
  ]);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (content: string, attachments?: File[]) => {
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString() + "-user",
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isNew: true
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate AI typing
    setIsAiTyping(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const newAiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: generateAiResponse(content),
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isNew: true
      };
      
      setMessages(prev => [...prev, newAiMessage]);
      setIsAiTyping(false);
      
      // Show notification for new message
      toast({
        title: "New message received",
        description: "Claude has responded to your message",
        duration: 3000,
      });
    }, 1500);
  };

  const generateAiResponse = (userMessage: string): string => {
    // Simple response generation for demo purposes
    if (userMessage.toLowerCase().includes("tomato")) {
      return "Tomato plants are susceptible to several diseases. Based on your description, it could be early blight or septoria leaf spot. I recommend examining the affected leaves more closely.";
    } else if (userMessage.toLowerCase().includes("soil")) {
      return "Proper soil management is crucial for farm productivity. Consider getting a soil test to check nutrient levels and pH.";
    } else if (userMessage.toLowerCase().includes("crop")) {
      return "Crop rotation is an important practice to prevent soil-borne diseases and maintain soil fertility.";
    } else {
      return "That's an interesting question about farm management. Could you provide more details so I can give you a more specific answer?";
    }
  };

  const saveMessageAsNote = (messageId: string) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      toast({
        title: "Saved to Notes",
        description: "Message has been saved to your notes",
        duration: 3000,
      });
    }
  };

  const createNewChat = () => {
    setMessages([]);
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
      // In a real app, we would load messages for this session
      toast({
        title: "Chat Session Changed",
        description: `Switched to ${session.name}`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <ChatHeader 
            activeChatSession={activeChatSession}
            availableSessions={availableSessions}
            onCreateNewChat={createNewChat}
            onSwitchSession={switchChatSession}
          />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Chat Messages Area */}
            <div className="w-2/3 flex flex-col border-r">
              <div className="flex-1 overflow-y-auto p-4">
                <ChatMessages 
                  messages={messages}
                  isAiTyping={isAiTyping}
                  onSaveAsNote={saveMessageAsNote}
                  messagesEndRef={messagesEndRef}
                />
              </div>
              
              {/* Chat Input Area */}
              <div className="border-t p-4">
                <ChatInputBar 
                  onSendMessage={sendMessage}
                  connectionStatus={connectionStatus}
                />
              </div>
            </div>
            
            {/* Context Panel */}
            <div className="w-1/3">
              <ChatContextPanel />
            </div>
          </div>
          
          {/* Action Log Footer */}
          <div className="border-t p-2 text-sm text-gray-500 flex justify-end">
            <div>
              <span className="font-medium">Action Log:</span> 
              <span className="ml-2">Chat session active</span>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ChatPage;
