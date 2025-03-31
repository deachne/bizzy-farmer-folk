
import { useState, useRef, ChangeEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { AttachmentFile } from "@/types/chat-input";

export function useAttachments() {
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const clearAttachments = () => {
    setAttachments([]);
  };

  return {
    attachments,
    fileInputRef,
    handleFileUpload,
    triggerFileInput,
    removeAttachment,
    clearAttachments
  };
}
