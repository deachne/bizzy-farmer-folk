
import React from "react";
import { Button } from "@/components/ui/button";
import { Clipboard, Image, FileText } from "lucide-react";

interface PasteMenuProps {
  isOpen: boolean;
  onPaste: () => void;
}

const PasteMenu = ({ isOpen, onPaste }: PasteMenuProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="absolute bottom-16 left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 animate-fade-in-up">
      <div className="p-2 text-sm font-medium border-b">Paste from clipboard</div>
      <div className="p-2">
        <Button 
          variant="outline" 
          className="flex items-center w-full justify-start mb-2"
          onClick={onPaste}
        >
          <Clipboard className="h-4 w-4 mr-2" />
          <span>Paste all content</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center w-full justify-start mb-2"
          onClick={onPaste}
        >
          <Image className="h-4 w-4 mr-2" />
          <span>Paste images only</span>
        </Button>
        <Button 
          variant="outline" 
          className="flex items-center w-full justify-start"
          onClick={onPaste}
        >
          <FileText className="h-4 w-4 mr-2" />
          <span>Paste text only</span>
        </Button>
      </div>
    </div>
  );
};

export default PasteMenu;
