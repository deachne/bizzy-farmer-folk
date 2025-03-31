
import React from "react";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttachmentFile } from "@/types/chat-input";

interface AttachmentPreviewProps {
  attachments: AttachmentFile[];
  onRemoveAttachment: (index: number) => void;
}

const AttachmentPreview = ({ attachments, onRemoveAttachment }: AttachmentPreviewProps) => {
  if (attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
      {attachments.map((file, index) => (
        <div 
          key={index} 
          className="relative flex items-center p-2 bg-white border border-gray-300 rounded-md"
        >
          {file.type.startsWith('image/') ? (
            <div className="relative h-10 w-10 mr-2">
              <img 
                src={URL.createObjectURL(file)} 
                alt={file.name}
                className="h-full w-full object-cover rounded-sm"
              />
            </div>
          ) : (
            <File className="h-5 w-5 mr-2 text-gray-500" />
          )}
          
          <div className="max-w-[150px] truncate text-sm">
            {file.name}
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-2 h-6 w-6 p-0 rounded-full"
            onClick={() => onRemoveAttachment(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AttachmentPreview;
