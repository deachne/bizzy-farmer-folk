
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { File, Maximize, ExternalLink, Plus } from "lucide-react";

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

  const handleOpenDocument = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {attachments.map(attachment => (
        attachment.type.startsWith('image/') ? (
          <div key={attachment.id} className="group relative">
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
                <Plus className="h-3 w-3 mr-1" />
                Add to context
              </Button>
            )}
          </div>
        ) : (
          <div key={attachment.id} className="relative group">
            <div 
              className="p-3 border border-gray-200 rounded bg-gray-50 text-sm flex items-center gap-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOpenDocument(attachment.url)}
            >
              <File className="h-5 w-5 text-blue-600" />
              <span className="max-w-[180px] truncate">{attachment.name}</span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default MessageAttachments;
