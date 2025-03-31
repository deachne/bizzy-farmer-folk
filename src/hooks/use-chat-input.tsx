
import { useState, useRef, useEffect, ChangeEvent, ClipboardEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { AttachmentFile } from "@/types/chat-input";

export function useChatInput(onSendMessage: (content: string, attachments?: File[]) => void) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPasteMenuOpen, setIsPasteMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize the textarea based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  };
  
  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage("");
      setAttachments([]);
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files) as AttachmentFile[];
      setAttachments(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files attached",
        description: `${newFiles.length} file(s) added to message`,
        duration: 3000,
      });
    }
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
            setAttachments(prev => [...prev, file]);
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
          adjustTextareaHeight();
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
            setAttachments(prev => [...prev, file]);
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
        setTimeout(adjustTextareaHeight, 0);
      }
    } catch (err) {
      console.error("Error handling paste:", err);
      // Allow default paste behavior if our handler fails
    }
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const togglePasteMenu = () => {
    setIsPasteMenuOpen(!isPasteMenuOpen);
  };
  
  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Voice recording started",
      description: "Speak now...",
      duration: 3000,
    });
    
    // In a real app, we would start recording here
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Voice recording stopped",
      description: "Recording processed and added to message",
      duration: 3000,
    });
    
    // In a real app, we would stop recording and process the audio here
    setMessage(prev => prev + " [Voice transcription: I need help with crop rotation planning.]");
    
    // Adjust textarea height after adding transcription
    setTimeout(adjustTextareaHeight, 0);
  };
  
  const openCamera = () => {
    // In a real app, we would open the camera here
    toast({
      title: "Camera activated",
      description: "Take a picture to add to your message",
      duration: 3000,
    });
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };
  
  const canSend = message.trim().length > 0 || attachments.length > 0;
  
  return {
    message,
    attachments,
    isRecording,
    isPasteMenuOpen,
    fileInputRef,
    textareaRef,
    canSend,
    handleSend,
    handleKeyPress,
    handleFileUpload,
    handlePaste,
    handleDirectPaste,
    triggerFileInput,
    togglePasteMenu,
    startRecording,
    stopRecording,
    openCamera,
    removeAttachment,
    handleMessageChange
  };
}
