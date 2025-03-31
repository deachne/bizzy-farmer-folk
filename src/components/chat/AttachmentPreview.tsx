
import React from "react";
import { Button } from "@/components/ui/button";
import { FilePlus } from "lucide-react";
import { AttachmentFile } from "@/types/chat-input";

interface AttachmentPreviewProps {
  attachments: AttachmentFile[];
  onRemoveAttachment: (index: number) => void;
}

const AttachmentPreview = ({ attachments, onRemoveAttachment }: AttachmentPreviewProps) => {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <div className="absolute bottom-full left-0 w-full p-2 bg-white border border-gray-200 rounded-t-md">
      <div className="flex flex-wrap gap-2">
        {attachments.map((file, index) => (
          <div key={index} className="relative">
            {file.type.startsWith('image/') ? (
              <div className="w-16 h-16 rounded overflow-hidden border border-gray-300">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Attachment ${index}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded border border-gray-300">
                <FilePlus className="h-6 w-6 text-gray-500" />
              </div>
            )}
            <Button
              variant="destructive"
              size="sm"
              className="h-5 w-5 p-0 absolute -top-2 -right-2 rounded-full"
              onClick={() => onRemoveAttachment(index)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttachmentPreview;
