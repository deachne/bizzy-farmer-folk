
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

export function useRecording(setMessage: (value: React.SetStateAction<string>) => void) {
  const [isRecording, setIsRecording] = useState(false);

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

  return {
    isRecording,
    startRecording,
    stopRecording
  };
}
