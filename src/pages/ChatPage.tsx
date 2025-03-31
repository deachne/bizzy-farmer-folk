import { useState, useRef, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import ChatMessages from "@/components/ChatMessages";
import ChatInputBar from "@/components/ChatInputBar";
import ChatHeader from "@/components/ChatHeader";
import ChatContextPanel from "@/components/ChatContextPanel";
import ArtifactPanel from "@/components/ArtifactPanel";
import { toast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  artifacts?: Artifact[];
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
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

interface ContextImage {
  id: string;
  url: string;
  name: string;
  addedAt: string;
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
    },
    {
      id: "4",
      content: "Thanks for the information. How often should I apply the copper fungicide?",
      sender: "user",
      timestamp: "9:35 AM",
      status: "delivered"
    },
    {
      id: "5",
      content: "For copper fungicide, you should typically apply it every 7-10 days during dry weather, and more frequently (every 5-7 days) during wet weather. Always follow the specific product instructions for exact timing and concentration. Make sure to cover both sides of the leaves thoroughly.",
      sender: "ai",
      timestamp: "9:36 AM",
      status: "delivered"
    },
    {
      id: "6",
      content: "Should I remove the affected leaves before applying the treatment?",
      sender: "user",
      timestamp: "9:38 AM",
      status: "delivered"
    },
    {
      id: "7",
      content: "Yes, removing affected leaves is recommended before applying fungicide. This helps reduce the spread of the disease. Be sure to:\n\n1. Cut off affected leaves with clean, sterilized scissors or pruners\n2. Dispose of infected material in the trash (not compost)\n3. Wash your hands and sterilize tools after handling infected plants\n4. Apply the fungicide after removing the affected foliage",
      sender: "ai",
      timestamp: "9:40 AM",
      status: "delivered"
    },
    {
      id: "8",
      content: "What's the best time of day to apply fungicide?",
      sender: "user",
      timestamp: "9:42 AM",
      status: "delivered"
    },
    {
      id: "9",
      content: "The best time to apply fungicide is in the early morning or late evening when temperatures are cooler. This timing provides several benefits:\n\n- Avoids peak sun hours that could cause leaf burn\n- Allows better absorption as the product dries slowly\n- Reduces the risk of evaporation before the product is effective\n- Minimizes exposure to beneficial insects that are most active midday\n\nAvoid application when rain is forecast within 24 hours for best results.",
      sender: "ai",
      timestamp: "9:44 AM",
      status: "delivered"
    },
    {
      id: "10",
      content: "Are there any preventative measures I can take to avoid this issue next season?",
      sender: "user",
      timestamp: "9:47 AM",
      status: "delivered"
    },
    {
      id: "11",
      content: "Absolutely! Here are some preventative measures for next season to minimize early blight risk:",
      sender: "ai",
      timestamp: "9:49 AM",
      status: "delivered",
      artifacts: [
        {
          id: "a2",
          type: "table",
          title: "PREVENTATIVE MEASURES",
          content: {
            headers: ["", ""],
            rows: [
              ["Crop Rotation", "Avoid planting tomatoes in the same location for 2-3 years"],
              ["Plant Spacing", "Ensure adequate spacing for good air circulation"],
              ["Mulching", "Apply mulch to prevent soil splash onto lower leaves"],
              ["Watering", "Use drip irrigation or soaker hoses to keep foliage dry"],
              ["Resistant Varieties", "Choose tomato varieties with early blight resistance"],
              ["Staking/Trellising", "Keep plants off the ground to reduce disease exposure"],
              ["Fall Cleanup", "Remove and destroy all plant debris after harvest"]
            ]
          }
        }
      ]
    },
    {
      id: "12",
      content: "This is very helpful information. Do you know any resistant tomato varieties I could try next year?",
      sender: "user",
      timestamp: "9:52 AM",
      status: "delivered"
    },
    {
      id: "13",
      content: "Here are some tomato varieties with good resistance to early blight that you might consider for next season:\n\n1. Iron Lady - Highly resistant to early blight, late blight, and septoria leaf spot\n2. Jasper - Cherry tomato with excellent disease resistance\n3. Mountain Magic - Campari-type with resistance to early and late blight\n4. Defiant PhR - Medium-sized slicing tomato with good disease resistance\n5. Mountain Merit - Large slicing tomato with multiple disease resistances\n6. Plum Regal - Roma/paste type with good blight resistance\n7. Valentine - Red grape tomato with improved disease resistance\n\nWhen purchasing seeds or plants, look for varieties labeled with 'EB' for early blight resistance in their disease resistance codes.",
      sender: "ai",
      timestamp: "9:55 AM",
      status: "delivered"
    },
    {
      id: "14",
      content: "I've been considering switching to drip irrigation. Is that something you'd recommend?",
      sender: "user",
      timestamp: "10:00 AM",
      status: "delivered"
    },
    {
      id: "15",
      content: "Yes, I highly recommend switching to drip irrigation for your tomatoes and other vegetables. It offers several significant advantages:",
      sender: "ai",
      timestamp: "10:03 AM",
      status: "delivered",
      artifacts: [
        {
          id: "a3",
          type: "table",
          title: "DRIP IRRIGATION BENEFITS",
          content: {
            headers: ["Benefit", "Description"],
            rows: [
              ["Disease Prevention", "Keeps foliage dry, significantly reducing fungal disease risk"],
              ["Water Conservation", "Reduces water usage by 30-50% compared to sprinkler irrigation"],
              ["Fertilizer Efficiency", "Allows precise fertigation (fertilizer application through irrigation)"],
              ["Weed Reduction", "Waters only the crop root zone, not surrounding areas where weeds grow"],
              ["Soil Structure", "Prevents soil compaction and erosion from water impact"],
              ["Convenience", "Can be automated with timers for consistent watering"]
            ]
          }
        }
      ]
    },
    {
      id: "16",
      content: "Thanks for all this information. One last question - what's the expected crop yield loss from early blight if I treat it promptly?",
      sender: "user",
      timestamp: "10:10 AM",
      status: "delivered"
    },
    {
      id: "17",
      content: "With prompt treatment of early blight, you can expect to minimize yield losses significantly. Here's what you might expect:\n\n- Prompt treatment (at first signs): Typically limits yield loss to 5-15%\n- Delayed treatment (disease well-established): May result in 20-40% yield loss\n- No treatment: Can lead to 50-80% yield reduction in severe cases\n\nFactors affecting the impact include:\n- Weather conditions (wet, humid conditions worsen spread)\n- Variety susceptibility\n- Plant vigor and overall health\n- Treatment effectiveness\n- Thoroughness of affected leaf removal\n\nBy implementing the preventative measures we discussed and treating promptly at the first signs of disease, you should be able to maintain good productivity despite the current infection.",
      sender: "ai",
      timestamp: "10:13 AM",
      status: "delivered"
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
  const [artifactPanelOpen, setArtifactPanelOpen] = useState(false);
  const [currentMessageArtifacts, setCurrentMessageArtifacts] = useState<Artifact[]>([]);
  const [initialArtifactIndex, setInitialArtifactIndex] = useState(0);
  const [contextImages, setContextImages] = useState<ContextImage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setShowContextPanel(false);
    } else {
      setShowContextPanel(true);
    }
  }, [isMobile]);

  useEffect(() => {
    if (messages.some(msg => msg.isNew)) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});

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

  useEffect(() => {
    if (messagesContainerRef.current && scrollPositions[activeChatSession.id]) {
      messagesContainerRef.current.scrollTop = scrollPositions[activeChatSession.id];
    } else {
      scrollToBottom();
    }
  }, [activeChatSession.id, scrollPositions]);

  const sendMessage = (content: string, attachments?: File[]) => {
    const fileUploads: Promise<void>[] = [];
    const uploadIds: string[] = [];
    let messageAttachments: Message['attachments'] = [];
    
    if (attachments && attachments.length > 0) {
      attachments.forEach(file => {
        const uploadId = Date.now().toString() + file.name;
        uploadIds.push(uploadId);
        
        messageAttachments.push({
          id: uploadId,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file)
        });
        
        setUploadProgress(prev => ({
          ...prev,
          [uploadId]: 0
        }));
        
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
    
    const newUserMessage: Message = {
      id: Date.now().toString() + "-user",
      content,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments: messageAttachments,
      isNew: true,
      status: "sending"
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    
    Promise.all(fileUploads).then(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newUserMessage.id 
            ? { ...msg, status: "delivered" } 
            : msg
        )
      );
      
      uploadIds.forEach(id => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[id];
          return newProgress;
        });
      });
      
      setIsAiTyping(true);
      
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
        
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newAiMessage.id 
                ? { ...msg, status: "delivered" } 
                : msg
            )
          );
          setIsAiTyping(false);
          
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
      if (messagesContainerRef.current) {
        setScrollPositions(prev => ({
          ...prev,
          [activeChatSession.id]: messagesContainerRef.current?.scrollTop || 0
        }));
      }
      
      setActiveChatSession(session);
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

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      return; // Let event propagate to parent
    }
    
    e.stopPropagation();
  };

  const handleViewArtifact = (messageId: string, artifactIndex: number) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message?.artifacts) {
      setCurrentMessageArtifacts(message.artifacts);
      setInitialArtifactIndex(artifactIndex);
      setArtifactPanelOpen(true);
      
      if (isMobile && showContextPanel) {
        setShowContextPanel(false);
      }
    }
  };

  const closeArtifactPanel = () => {
    setArtifactPanelOpen(false);
  };

  const addImageToContext = (imageUrl: string, imageName: string) => {
    const newContextImage: ContextImage = {
      id: Date.now().toString(),
      url: imageUrl,
      name: imageName,
      addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setContextImages(prev => {
      if (prev.some(img => img.url === imageUrl)) {
        toast({
          title: "Image already in context",
          description: "This image is already in your context panel",
          duration: 3000,
        });
        return prev;
      }
      
      toast({
        title: "Image added to context",
        description: "The image has been added to your context panel",
        duration: 3000,
      });
      return [...prev, newContextImage];
    });
  };

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          <ChatHeader 
            activeChatSession={activeChatSession}
            availableSessions={availableSessions}
            onCreateNewChat={createNewChat}
            onSwitchSession={switchChatSession}
            onToggleContextPanel={toggleContextPanel}
            showContextPanel={showContextPanel}
          />
          
          <div className="flex flex-1 overflow-hidden relative">
            <div className={cn(
              "flex flex-col transition-all duration-300 overflow-hidden",
              isMobile ? "w-full" : 
                artifactPanelOpen ? "w-[60%]" : 
                  showContextPanel ? "w-2/3 border-r" : "w-full"
            )}>
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 pb-20 scroll-smooth"
                onWheel={handleWheel}
              >
                <ChatMessages 
                  messages={messages}
                  isAiTyping={isAiTyping}
                  onSaveAsNote={saveMessageAsNote}
                  messagesEndRef={messagesEndRef}
                  uploadProgress={uploadProgress}
                  onViewArtifact={handleViewArtifact}
                  onAddImageToContext={addImageToContext}
                />
              </div>
              
              <div className="sticky bottom-0 left-0 right-0 border-t p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-10">
                <ChatInputBar 
                  onSendMessage={sendMessage}
                  connectionStatus={connectionStatus}
                />
              </div>
            </div>
            
            {showContextPanel && !(isMobile && artifactPanelOpen) && (
              <div className="hidden md:block md:w-1/3 h-full overflow-hidden transition-all duration-300">
                <ChatContextPanel contextImages={contextImages} />
              </div>
            )}
          </div>
          
          <div className="border-t p-2 text-sm text-gray-500 flex justify-end">
            <div>
              <span className="font-medium">Action Log:</span> 
              <span className="ml-2">Chat session active</span>
            </div>
          </div>
        </div>
      </SidebarProvider>
      
      <ArtifactPanel 
        isOpen={artifactPanelOpen}
        onClose={closeArtifactPanel}
        artifacts={currentMessageArtifacts}
        initialArtifactIndex={initialArtifactIndex}
      />
    </div>
  );
};

export default ChatPage;
