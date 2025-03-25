
import { useState, useRef, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import ChatMessages from "@/components/ChatMessages";
import ChatInputBar from "@/components/ChatInputBar";
import ChatHeader from "@/components/ChatHeader";
import ChatContextPanel from "@/components/ChatContextPanel";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  artifacts?: Artifact[];
  isNew?: boolean;
  status?: "sending" | "sent" | "delivered" | "error";
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
      timestamp: "9:30 AM",
      status: "delivered"
    },
    {
      id: "2",
      content: "I noticed some spots on my tomato plants this morning. The leaves have yellow patches with brown spots. What could it be?",
      sender: "user",
      timestamp: "9:32 AM",
      status: "delivered"
    },
    {
      id: "3",
      content: "Based on your description, it sounds like your tomato plants may have early blight, a common fungal disease. Here's a table of treatment options:",
      sender: "ai",
      timestamp: "9:33 AM",
      status: "delivered",
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
  const [showContextPanel, setShowContextPanel] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Effect to handle context panel visibility based on screen size
  useEffect(() => {
    if (isMobile) {
      setShowContextPanel(false);
    } else {
      setShowContextPanel(true);
    }
  }, [isMobile]);

  // Effect to scroll to bottom on new messages
  useEffect(() => {
    if (messages.some(msg => msg.isNew)) {
      scrollToBottom();
    }
  }, [messages]);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Preserve scroll position when switching chats
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});

  // Save scroll position before switching chats
  useEffect(() => {
    if (messagesContainerRef.current && activeChatSession) {
      return () => {
        setScrollPositions(prev => ({
          ...prev,
          [activeChatSession.id]: messagesContainerRef.current?.scrollTop || 0
        }));
      };
    }
  }, [activeChatSession]);

  // Restore scroll position when chat is loaded
  useEffect(() => {
    if (messagesContainerRef.current && scrollPositions[activeChatSession.id]) {
      messagesContainerRef.current.scrollTop = scrollPositions[activeChatSession.id];
    } else {
      scrollToBottom();
    }
  }, [activeChatSession.id, scrollPositions]);

  const sendMessage = (content: string, attachments?: File[]) => {
    // Process attachments if any
    const fileUploads: Promise<void>[] = [];
    const uploadIds: string[] = [];
    
    if (attachments && attachments.length > 0) {
      attachments.forEach(file => {
        const uploadId = Date.now().toString() + file.name;
        uploadIds.push(uploadId);
        
        // Initialize progress for this upload
        setUploadProgress(prev => ({
          ...prev,
          [uploadId]: 0
        }));
        
        // Simulate file upload with progress
        const uploadPromise = new Promise<void>((resolve) => {
          let progress = 0;
          const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(prev => ({
              ...prev,
              [uploadId]: progress
            }));
            
            if (progress >= 100) {
              clearInterval(interval);
              resolve();
            }
          }, 300);
        });
        
        fileUploads.push(uploadPromise);
      });
    }
    
    // Add user message immediately with "sending" status
    const newUserMessage: Message = {
      id: Date.now().toString() + "-user",
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isNew: true,
      status: "sending"
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    // After all files are uploaded, update message status to "sent"
    Promise.all(fileUploads).then(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newUserMessage.id 
            ? { ...msg, status: "delivered" } 
            : msg
        )
      );
      
      // Clear upload progress
      uploadIds.forEach(id => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[id];
          return newProgress;
        });
      });
      
      // Simulate AI typing
      setIsAiTyping(true);
      
      // Simulate AI response after a short delay
      setTimeout(() => {
        const newAiMessage: Message = {
          id: Date.now().toString() + "-ai",
          content: generateAiResponse(content),
          sender: "ai",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isNew: true,
          status: "sending"
        };
        
        setMessages(prev => [...prev, newAiMessage]);
        
        // Update AI message status to "delivered" after a short delay
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newAiMessage.id 
                ? { ...msg, status: "delivered" } 
                : msg
            )
          );
          setIsAiTyping(false);
          
          // Show notification for new message
          toast({
            title: "New message received",
            description: "Claude has responded to your message",
            duration: 3000,
          });
        }, 500);
      }, 1500);
    });
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
    // Reset messages and scroll position for new chat
    setMessages([]);
    scrollToBottom();
    
    toast({
      title: "New Chat Created",
      description: "You can start a fresh conversation",
      duration: 3000,
    });
  };

  const switchChatSession = (sessionId: string) => {
    const session = availableSessions.find(s => s.id === sessionId);
    if (session) {
      // Save current scroll position before switching
      if (messagesContainerRef.current) {
        setScrollPositions(prev => ({
          ...prev,
          [activeChatSession.id]: messagesContainerRef.current?.scrollTop || 0
        }));
      }
      
      setActiveChatSession(session);
      // In a real app, we would load messages for this session
      toast({
        title: "Chat Session Changed",
        description: `Switched to ${session.name}`,
        duration: 3000,
      });
    }
  };

  const toggleContextPanel = () => {
    setShowContextPanel(prev => !prev);
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
            onToggleContextPanel={toggleContextPanel}
            showContextPanel={showContextPanel}
          />
          
          <div className="flex flex-1 overflow-hidden">
            {/* Chat Messages Area */}
            <div className={`${showContextPanel ? "w-full md:w-2/3" : "w-full"} flex flex-col border-r transition-all duration-300`}>
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 scroll-smooth"
              >
                <ChatMessages 
                  messages={messages}
                  isAiTyping={isAiTyping}
                  onSaveAsNote={saveMessageAsNote}
                  messagesEndRef={messagesEndRef}
                  uploadProgress={uploadProgress}
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
            {showContextPanel && (
              <div className="hidden md:block md:w-1/3 transition-all duration-300">
                <ChatContextPanel />
              </div>
            )}
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
