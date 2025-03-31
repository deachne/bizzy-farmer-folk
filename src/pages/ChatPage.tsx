import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Message, ChatSession, Artifact, ContextImage } from "@/types/chat";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInputBar from "@/components/ChatInputBar";
import ChatContextPanel from "@/components/ChatContextPanel";
import ArtifactPanel from "@/components/ArtifactPanel";
import { useIsMobile } from "@/hooks/use-mobile";

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [contextImages, setContextImages] = useState<ContextImage[]>([]);
  const [selectedArtifact, setSelectedArtifact] = useState<{messageId: string, artifactIndex: number} | null>(null);
  const [showArtifactPanel, setShowArtifactPanel] = useState(false);
  const [activeChatSession, setActiveChatSession] = useState<ChatSession>({
    id: "session-1",
    name: "General Chat",
    model: "Claude 3.5 Sonnet",
    messages: [],
    contextImages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
  const [availableSessions, setAvailableSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      name: "General Chat",
      model: "Claude 3.5 Sonnet",
      messages: [],
      contextImages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "session-2",
      name: "Field Issues",
      model: "Claude 3.5 Sonnet",
      messages: [],
      contextImages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");
  
  useEffect(() => {
    setShowContextPanel(!isMobile);
  }, [isMobile]);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiTyping]);
  
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
  
  const handleSendMessage = (content: string, attachments: any[] = []) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments,
      isNew: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    attachments.forEach(attachment => {
      if (attachment.type.startsWith('image/')) {
        addImageToContext(attachment.url, attachment.name);
      }
    });
    
    setIsAiTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: "ai",
        content: "This is a simulated AI response. In the actual application, the AI would analyze your message and respond accordingly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isNew: true,
        artifacts: [
          {
            id: "artifact-1",
            type: "table",
            title: "Sample Data Table",
            content: {
              headers: ["Name", "Value", "Status"],
              rows: [
                ["Item 1", "45.0", "Active"],
                ["Item 2", "23.5", "Inactive"],
                ["Item 3", "78.2", "Active"]
              ]
            }
          }
        ]
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsAiTyping(false);
    }, 2000);
  };
  
  const handleSaveAsNote = (messageId: string) => {
    const messageToSave = messages.find(m => m.id === messageId);
    if (messageToSave) {
      toast({
        title: "Note Saved",
        description: "The message has been saved as a note",
        duration: 3000,
      });
    }
  };
  
  const handleCreateNewChat = () => {
    const newSessionId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newSessionId,
      name: `New Chat ${availableSessions.length + 1}`,
      model: "Claude 3.5 Sonnet",
      messages: [],
      contextImages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setAvailableSessions(prev => [...prev, newSession]);
    setActiveChatSession(newSession);
    setMessages([]);
    setContextImages([]);
  };
  
  const handleSwitchSession = (sessionId: string) => {
    const session = availableSessions.find(s => s.id === sessionId);
    if (session) {
      setActiveChatSession(session);
      setMessages([]);
    }
  };
  
  const handleToggleContextPanel = () => {
    setShowContextPanel(prev => !prev);
  };
  
  const handleViewArtifact = (messageId: string, artifactIndex: number) => {
    setSelectedArtifact({ messageId, artifactIndex });
    setShowArtifactPanel(true);
  };
  
  const currentArtifacts = selectedArtifact 
    ? messages.find(m => m.id === selectedArtifact.messageId)?.artifacts || []
    : [];
  
  return (
    <div className="flex flex-col h-screen">
      <ChatHeader 
        activeChatSession={activeChatSession}
        availableSessions={availableSessions}
        onCreateNewChat={handleCreateNewChat}
        onSwitchSession={handleSwitchSession}
        onToggleContextPanel={handleToggleContextPanel}
        showContextPanel={showContextPanel}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 flex flex-col ${showContextPanel ? 'lg:mr-80' : ''}`}>
          <ChatMessages 
            messages={messages}
            isAiTyping={isAiTyping}
            onSaveAsNote={handleSaveAsNote}
            messagesEndRef={messagesEndRef}
            onViewArtifact={handleViewArtifact}
            onAddImageToContext={addImageToContext}
          />
          
          <ChatInputBar 
            onSendMessage={handleSendMessage} 
            connectionStatus={connectionStatus}
          />
        </div>
        
        {showContextPanel && (
          <div 
            className={`w-80 absolute right-0 top-16 bottom-0 z-10 bg-white lg:relative lg:top-0 transition-all duration-300 ease-in-out ${
              showContextPanel ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
            }`}
          >
            <ChatContextPanel contextImages={contextImages} />
          </div>
        )}
      </div>
      
      <ArtifactPanel
        isOpen={showArtifactPanel}
        onClose={() => setShowArtifactPanel(false)}
        artifacts={currentArtifacts}
        initialArtifactIndex={selectedArtifact?.artifactIndex || 0}
      />
    </div>
  );
};

export default ChatPage;
