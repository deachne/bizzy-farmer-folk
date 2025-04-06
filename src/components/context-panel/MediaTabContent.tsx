
import { ContextItem } from "@/types/chat";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MediaTabContentProps {
  contextItems: ContextItem[];
  onAddDocument: () => void;
}

const MediaTabContent = ({ contextItems, onAddDocument }: MediaTabContentProps) => {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-sm font-semibold text-gray-700">Images & Documents</h3>
      
      {contextItems && contextItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-2">
          {contextItems.map(item => (
            <div 
              key={item.id} 
              className="border rounded overflow-hidden"
            >
              {item.type === 'image' ? (
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img 
                    src={item.url} 
                    alt={item.name} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
              ) : (
                <div className="h-24 bg-gray-50 flex items-center justify-center">
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-gray-500 text-sm border rounded bg-white">
          No media shared in this conversation
        </div>
      )}
      
      <div>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-sm"
          onClick={onAddDocument}
        >
          <Upload className="h-4 w-4 mr-2" />
          Add Media to Context
        </Button>
      </div>
    </div>
  );
};

export default MediaTabContent;
