
import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Mic, Paperclip, Send, ClipboardCopy } from "lucide-react";

interface ChatInputControlsProps {
  onOpenFileInput: () => void;
  onTogglePasteMenu: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onOpenCamera: () => void;
  onSendMessage: () => void;
  isRecording: boolean;
  canSend: boolean;
}

const ChatInputControls = ({
  onOpenFileInput,
  onTogglePasteMenu,
  onStartRecording,
  onStopRecording,
  onOpenCamera,
  onSendMessage,
  isRecording,
  canSend
}: ChatInputControlsProps) => {
  return (
    <div className="flex items-center">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onOpenFileInput}
        className="text-gray-500 hover:text-gray-700"
      >
        <Paperclip className="h-5 w-5" />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onTogglePasteMenu}
        className="text-gray-500 hover:text-gray-700"
      >
        <ClipboardCopy className="h-5 w-5" />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={isRecording ? onStopRecording : onStartRecording}
        className={isRecording ? "text-red-500 hover:text-red-700" : "text-gray-500 hover:text-gray-700"}
      >
        <Mic className="h-5 w-5" />
      </Button>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onOpenCamera}
        className="text-gray-500 hover:text-gray-700"
      >
        <Camera className="h-5 w-5" />
      </Button>
      
      <Button
        type="button"
        size="icon"
        onClick={onSendMessage}
        disabled={!canSend}
        className={canSend ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-300 text-gray-500"}
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInputControls;
