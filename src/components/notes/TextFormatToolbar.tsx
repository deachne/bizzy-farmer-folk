
import { Button } from "@/components/ui/button";
import { Bold, Italic, Underline, List } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface TextFormatToolbarProps {
  onFormat: (formatType: string) => void;
  isPreview: boolean;
  onTogglePreview: () => void;
}

const TextFormatToolbar = ({ 
  onFormat,
  isPreview,
  onTogglePreview
}: TextFormatToolbarProps) => {
  return (
    <div className="mb-4 border-b pb-2 flex justify-between">
      <div className="flex">
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-md h-8"
          onClick={() => onFormat("Bold")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-md h-8"
          onClick={() => onFormat("Italic")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-md h-8"
          onClick={() => onFormat("Underline")}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="rounded-md h-8"
          onClick={() => onFormat("List")}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={onTogglePreview}
        className="text-xs"
      >
        {isPreview ? "Edit" : "Preview"}
      </Button>
    </div>
  );
};

export default TextFormatToolbar;
