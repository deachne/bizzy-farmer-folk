
import { Image, File, ExternalLink, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ContextItem } from "@/types/chat";

interface MediaGalleryProps {
  contextItems: ContextItem[];
  onViewDocument: (item: ContextItem) => void;
}

const MediaGallery = ({ contextItems, onViewDocument }: MediaGalleryProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500">IMAGES & DOCUMENTS</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-90"
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-2">
          {contextItems.length === 0 ? (
            <div className="text-sm text-gray-500 italic">No media shared in this conversation</div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {contextItems.map(item => (
                item.type === "image" ? (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <div className="group relative cursor-pointer">
                        <img 
                          src={item.url} 
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded border border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                          <Image className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl p-1 bg-transparent border-0">
                      <img 
                        src={item.url} 
                        alt={item.name}
                        className="max-h-[80vh] max-w-full rounded"
                      />
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div 
                    key={item.id}
                    className="group relative cursor-pointer border rounded p-2 bg-gray-50 flex flex-col items-center"
                    onClick={() => onViewDocument(item)}
                  >
                    <File className="h-10 w-10 text-blue-600 mb-1" />
                    <div className="text-xs text-center truncate w-full">{item.name}</div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all flex items-center justify-center">
                      <ExternalLink className="h-4 w-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                )
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default MediaGallery;
