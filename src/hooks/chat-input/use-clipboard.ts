
import { useState, ClipboardEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { AttachmentFile } from "@/types/chat-input";

export function useClipboard(setMessage: (value: React.SetStateAction<string>) => void, addAttachments: (files: AttachmentFile[]) => void) {
  const [isPasteMenuOpen, setIsPasteMenuOpen] = useState(false);

  const togglePasteMenu = () => {
    setIsPasteMenuOpen(!isPasteMenuOpen);
  };

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      let added = false;
      
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const file = new File([blob], `pasted-image-${Date.now()}.png`, { type }) as AttachmentFile;
            addAttachments([file]);
            added = true;
          }
        }
      }
      
      if (added) {
        toast({
          title: "Image pasted",
          description: "Image from clipboard added to message",
          duration: 3000,
        });
      } else {
        const text = await navigator.clipboard.readText();
        if (text) {
          setMessage(prev => prev + text);
          toast({
            title: "Text pasted",
            description: "Text from clipboard added to message",
            duration: 3000,
          });
        }
      }
      
      setIsPasteMenuOpen(false);
    } catch (err) {
      console.error("Paste failed:", err);
      toast({
        title: "Paste failed",
        description: "Could not access clipboard content",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleDirectPaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    try {
      const items = e.clipboardData.items;
      let hasImage = false;
      
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          hasImage = true;
          const blob = items[i].getAsFile();
          if (blob) {
            e.preventDefault(); // Prevent default paste only for images
            const file = blob as AttachmentFile;
            addAttachments([file]);
            toast({
              title: "Image pasted",
              description: "Image from clipboard added to message",
              duration: 3000,
            });
          }
        }
      }
      
      // If there's no image, let the default paste behavior handle text
      if (!hasImage) {
        // The text will be pasted by the default behavior
      }
    } catch (err) {
      console.error("Error handling paste:", err);
      // Allow default paste behavior if our handler fails
    }
  };

  return {
    isPasteMenuOpen,
    togglePasteMenu,
    handlePaste,
    handleDirectPaste
  };
}
