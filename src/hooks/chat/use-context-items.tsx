
import { useState } from "react";
import { ContextItem } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";

export function useContextItems() {
  const [contextItems, setContextItems] = useState<ContextItem[]>([]);

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
    contextItems,
    addItemToContext
  };
}
