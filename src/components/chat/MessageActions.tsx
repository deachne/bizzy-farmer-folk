
import { Button } from "@/components/ui/button";
import { Copy, Save, MoreHorizontal } from "lucide-react";
import { Message } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface MessageActionsProps {
  message: Message;
  onSaveAsNote: (messageId: string) => void;
}

const MessageActions = ({ message, onSaveAsNote }: MessageActionsProps) => {
  const copyMessageToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message content copied to clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="flex-shrink-0 ml-4 flex flex-col space-y-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-gray-500"
        onClick={() => copyMessageToClipboard(message.content)}
      >
        <Copy className="h-4 w-4" />
      </Button>
      
      {message.sender === "ai" && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500"
          onClick={() => onSaveAsNote(message.id)}
        >
          <Save className="h-4 w-4" />
        </Button>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Add to context</DropdownMenuItem>
          <DropdownMenuItem>Regenerate response</DropdownMenuItem>
          <DropdownMenuItem>Share message</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default MessageActions;
