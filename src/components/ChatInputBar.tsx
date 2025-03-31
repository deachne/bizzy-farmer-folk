
import React from "react";
import { Textarea } from "@/components/ui/textarea"; 
import { cn } from "@/lib/utils";
import AttachmentPreview from "./chat/AttachmentPreview";
import ConnectionStatusIndicator from "./chat/ConnectionStatusIndicator";
import PasteMenu from "./chat/PasteMenu";
import ChatInputControls from "./chat/ChatInputControls";
import { useChatInput } from "@/hooks/use-chat-input";
import { ConnectionStatus } from "@/types/chat-input";

interface ChatInputBarProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  connectionStatus: ConnectionStatus;
}

const ChatInputBar = ({ onSendMessage, connectionStatus }: ChatInputBarProps) => {
  const {
    message,
    attachments,
    isRecording,
    isPasteMenuOpen,
    fileInputRef,
    textareaRef,
    canSend,
    handleSend,
    handleKeyPress,
    handleFileUpload,
    handlePaste,
    handleDirectPaste,
    triggerFileInput,
    togglePasteMenu,
    startRecording,
    stopRecording,
    openCamera,
    removeAttachment,
    handleMessageChange
  } = useChatInput(onSendMessage);
  
  return (
    <div className="relative">
      {/* Attachments preview */}
      <AttachmentPreview 
        attachments={attachments} 
        onRemoveAttachment={removeAttachment} 
      />
      
      <div className={cn(
        "flex items-center gap-2 p-2 border border-gray-300 rounded-lg bg-white",
        isRecording && "border-red-500"
      )}>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileUpload}
        />
        
        {/* Paste menu */}
        <PasteMenu 
          isOpen={isPasteMenuOpen} 
          onPaste={handlePaste} 
        />
        
        {/* Input field */}
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyPress}
          onPaste={handleDirectPaste}
          placeholder="Type your message here..."
          className="flex-1 border-0 shadow-none focus-visible:ring-0 min-h-[40px] max-h-[150px] overflow-y-auto resize-none py-2"
          rows={1}
        />
        
        {/* Input controls */}
        <ChatInputControls 
          onOpenFileInput={triggerFileInput}
          onTogglePasteMenu={togglePasteMenu}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onOpenCamera={openCamera}
          onSendMessage={handleSend}
          isRecording={isRecording}
          canSend={canSend}
        />
        
        {/* Connection status */}
        <ConnectionStatusIndicator status={connectionStatus} />
      </div>
    </div>
  );
};

export default ChatInputBar;
