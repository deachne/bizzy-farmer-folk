
import { useState, useRef, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Paperclip, 
  Mic, 
  Camera, 
  Send,
  Clipboard,
  Wifi,
  WifiOff,
  Image,
  FilePlus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface ChatInputBarProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  connectionStatus: "connected" | "connecting" | "disconnected";
}

const ChatInputBar = ({ onSendMessage, connectionStatus }: ChatInputBarProps) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPasteMenuOpen, setIsPasteMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage("");
      setAttachments([]);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setAttachments(prev => [...prev, ...newFiles]);
      
      toast({
        title: "Files attached",
        description: `${newFiles.length} file(s) added to message`,
        duration: 3000,
      });
    }
  };
  
  const handlePaste = () => {
    navigator.clipboard.read().then(
      clipboardItems => {
        for (const clipboardItem of clipboardItems) {
          for (const type of clipboardItem.types) {
            if (type.startsWith('image/')) {
              clipboardItem.getType(type).then(blob => {
                const file = new File([blob], `pasted-image-${Date.now()}.png`, { type });
                setAttachments(prev => [...prev, file]);
                setIsPasteMenuOpen(false);
                
                toast({
                  title: "Image pasted",
                  description: "Image from clipboard added to message",
                  duration: 3000,
                });
              });
            }
          }
        }
      },
      () => {
        toast({
          title: "Paste failed",
          description: "Could not access clipboard content",
          variant: "destructive",
          duration: 3000,
        });
      }
    );
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Voice recording started",
      description: "Speak now...",
      duration: 3000,
    });
    
    // In a real app, we would start recording here
    setTimeout(() => {
      stopRecording();
    }, 3000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Voice recording stopped",
      description: "Recording processed and added to message",
      duration: 3000,
    });
    
    // In a real app, we would stop recording and process the audio here
    setMessage(prev => prev + " [Voice transcription: I need help with crop rotation planning.]");
  };
  
  const openCamera = () => {
    // In a real app, we would open the camera here
    toast({
      title: "Camera activated",
      description: "Take a picture to add to your message",
      duration: 3000,
    });
  };
  
  return (
    <div className="relative">
      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div className="absolute bottom-full left-0 w-full p-2 bg-white border border-gray-200 rounded-t-md">
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div key={index} className="relative">
                {file.type.startsWith('image/') ? (
                  <div className="w-16 h-16 rounded overflow-hidden border border-gray-300">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Attachment ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded border border-gray-300">
                    <FilePlus className="h-6 w-6 text-gray-500" />
                  </div>
                )}
                <Button
                  variant="destructive"
                  size="sm"
                  className="h-5 w-5 p-0 absolute -top-2 -right-2 rounded-full"
                  onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      
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
        
        {/* Paste button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsPasteMenuOpen(!isPasteMenuOpen)}
              >
                <Clipboard className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Paste from clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {isPasteMenuOpen && (
          <div className="absolute bottom-16 left-0 w-48 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
            <Button 
              variant="ghost" 
              className="w-full justify-start" 
              onClick={handlePaste}
            >
              <Image className="h-4 w-4 mr-2" />
              Paste image
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => setIsPasteMenuOpen(false)}
            >
              <FilePlus className="h-4 w-4 mr-2" />
              Paste text
            </Button>
          </div>
        )}
        
        {/* Input field */}
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message here..."
          className="flex-1 border-0 shadow-none focus-visible:ring-0"
        />
        
        {/* File upload button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={triggerFileInput}
              >
                <Paperclip className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Attach files</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Voice input button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "text-gray-500 hover:text-gray-700",
                  isRecording && "bg-red-100 text-red-600"
                )}
                onClick={isRecording ? stopRecording : startRecording}
              >
                <Mic className="h-5 w-5" />
                {isRecording && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRecording ? "Stop recording" : "Voice input"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Camera button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 hover:text-gray-700"
                onClick={openCamera}
              >
                <Camera className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Camera</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Connection status */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center">
                {connectionStatus === "connected" ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : connectionStatus === "connecting" ? (
                  <Wifi className="h-5 w-5 text-amber-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-500" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {connectionStatus === "connected" 
                  ? "Connected to AI" 
                  : connectionStatus === "connecting" 
                    ? "Connecting..."
                    : "Disconnected"
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {/* Send button */}
        <Button
          className="bg-blue-600 hover:bg-blue-700 px-3"
          disabled={message.trim().length === 0 && attachments.length === 0}
          onClick={handleSend}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInputBar;
