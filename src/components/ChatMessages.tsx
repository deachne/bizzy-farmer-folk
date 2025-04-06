
import { RefObject } from "react";
import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./chat/MessageItem";
import TypingIndicator from "./chat/TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  isAiTyping: boolean;
  onSaveAsNote: (messageId: string) => void;
  messagesEndRef: RefObject<HTMLDivElement>;
  uploadProgress?: Record<string, number>;
  onViewArtifact: (messageId: string, artifactIndex: number) => void;
  onAddImageToContext?: (imageUrl: string, imageName: string) => void;
}

const ChatMessages = ({ 
  messages, 
  isAiTyping, 
  onSaveAsNote, 
  messagesEndRef,
  uploadProgress = {},
  onViewArtifact,
  onAddImageToContext
}: ChatMessagesProps) => {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col space-y-6 pb-6 px-4 max-w-4xl mx-auto">
        {messages.map(message => (
          <MessageItem
            key={message.id}
            message={message}
            onSaveAsNote={onSaveAsNote}
            uploadProgress={uploadProgress}
            onViewArtifact={onViewArtifact}
            onAddImageToContext={onAddImageToContext}
          />
        ))}
        
        {isAiTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
