
import { useState, useEffect } from "react";
import { Message, ChatSession, ContextItem } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";
import { useChatSessions } from "@/hooks/chat/use-chat-sessions";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help with your farm management today? Feel free to ask about soil conditions, crop planning, or equipment maintenance.",
      sender: "ai",
      timestamp: "9:30 AM",
      status: "delivered"
    }
  ]);

  const {
    activeChatSession,
    availableSessions,
    createNewChat,
    switchChatSession
  } = useChatSessions(setMessages);
  
  const [isAiTyping, setIsAiTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [contextItems, setContextItems] = useState<ContextItem[]>([]);

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

  const sendMessage = (content: string, attachments?: File[]) => {
    const fileUploads: Promise<void>[] = [];
    const uploadIds: string[] = [];
    let messageAttachments: Message['attachments'] = [];
    
    if (attachments && attachments.length > 0) {
      attachments.forEach(file => {
        const uploadId = Date.now().toString() + file.name;
        uploadIds.push(uploadId);
        
        const attachment = {
          id: uploadId,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file)
        };
        
        messageAttachments.push(attachment);
        
        if (file.type.startsWith('image/')) {
          addItemToContext(attachment.url, attachment.name, "image");
        } else {
          addItemToContext(attachment.url, attachment.name, "document");
        }
        
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

  const addItemToContext = (url: string, name: string, type: "image" | "document") => {
    const newContextItem: ContextItem = {
      id: Date.now().toString(),
      url: url,
      name: name,
      type: type,
      addedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setContextItems(prev => {
      if (prev.some(item => item.url === url)) {
        toast({
          title: `${type === 'image' ? 'Image' : 'Document'} already in context`,
          description: `This ${type} is already in your context panel`,
          duration: 3000,
        });
        return prev;
      }
      
      toast({
        title: `${type === 'image' ? 'Image' : 'Document'} added to context`,
        description: `The ${type} has been added to your context panel`,
        duration: 3000,
      });
      return [...prev, newContextItem];
    });
  };

  return {
    messages,
    isAiTyping,
    activeChatSession,
    availableSessions,
    connectionStatus,
    uploadProgress,
    contextItems,
    sendMessage,
    saveMessageAsNote,
    createNewChat,
    switchChatSession,
    addItemToContext
  };
}
