
import { useState, useRef, useEffect } from "react";
import { ChatSession } from "@/types/chat";

export function useChatScroll(activeChatSession: ChatSession, messages: any[]) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});

  useEffect(() => {
    if (messages.some(msg => msg.isNew)) {
      scrollToBottom();
    }
  }, [messages]);

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  return {
    messagesEndRef,
    messagesContainerRef,
    handleWheel,
    scrollToBottom
  };
}
