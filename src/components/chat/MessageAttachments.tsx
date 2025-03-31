
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Maximize } from "lucide-react";

interface Attachment {
  id: string;
  name: string;
  type: string;
  url: string;
}

interface MessageAttachmentsProps {
  attachments: Attachment[];
  onAddImageToContext?: (imageUrl: string, imageName: string) => void;
}

const MessageAttachments = ({ attachments, onAddImageToContext }: MessageAttachmentsProps) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {attachments.map(attachment => (
        attachment.type.startsWith('image/') ? (
          <div key={attachment.id} className="relative">
            <Dialog>
              <DialogTrigger asChild>
                <div className="group relative cursor-pointer">
                  <img 
                    src={attachment.url} 
                    alt={attachment.name}
                    className="h-24 w-24 object-cover rounded border border-gray-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <Maximize className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-3xl p-1 bg-transparent border-0">
                <img 
                  src={attachment.url} 
                  alt={attachment.name}
                  className="max-h-[80vh] max-w-full rounded"
                />
              </DialogContent>
            </Dialog>
            {onAddImageToContext && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute -bottom-2 -right-2 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onAddImageToContext(attachment.url, attachment.name)}
              >
                Add to context
              </Button>
            )}
          </div>
        ) : (
          <div key={attachment.id} className="p-2 border border-gray-200 rounded text-xs flex items-center gap-1">
            <File className="h-4 w-4" />
            {attachment.name}
          </div>
        )
      ))}
    </div>
  );
};

export default MessageAttachments;
