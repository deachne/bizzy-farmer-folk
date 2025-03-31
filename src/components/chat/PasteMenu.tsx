
import React from "react";
import { Button } from "@/components/ui/button";
import { Image } from "lucide-react";

interface PasteMenuProps {
  isOpen: boolean;
  onPaste: () => void;
}

const PasteMenu = ({ isOpen, onPaste }: PasteMenuProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute bottom-16 left-0 w-48 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
      <Button 
        variant="ghost" 
        className="w-full justify-start" 
        onClick={onPaste}
      >
        <Image className="h-4 w-4 mr-2" />
        Paste image or text
      </Button>
    </div>
  );
};

export default PasteMenu;
