
import { useState } from "react";
import { Artifact } from "@/types/chat";
import { useIsMobile } from "@/hooks/use-mobile";

export function useArtifacts(showContextPanel: boolean, setShowContextPanel: (show: boolean) => void) {
  const [artifactPanelOpen, setArtifactPanelOpen] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [currentMessageArtifacts, setCurrentMessageArtifacts] = useState<Artifact[]>([]);
  const [initialArtifactIndex, setInitialArtifactIndex] = useState(0);
  const isMobile = useIsMobile();

  const handleViewArtifact = (messageId: string, artifactIndex: number, messages: any[]) => {
    const message = messages.find(msg => msg.id === messageId);
    if (message?.artifacts) {
      setCurrentMessageArtifacts(message.artifacts);
      setInitialArtifactIndex(artifactIndex);
      setArtifactPanelOpen(true);
      setIsPanelMinimized(false);
      
      if (isMobile && showContextPanel) {
        setShowContextPanel(false);
      }
    }
  };

  const closeArtifactPanel = () => {
    // Just close the panel but keep the artifacts in memory
    setArtifactPanelOpen(false);
    setIsPanelMinimized(false);
  };

  const minimizeArtifactPanel = () => {
    setIsPanelMinimized(true);
  };

  const maximizeArtifactPanel = () => {
    setIsPanelMinimized(false);
  };

  return {
    artifactPanelOpen,
    isPanelMinimized,
    currentMessageArtifacts,
    initialArtifactIndex,
    handleViewArtifact,
    closeArtifactPanel,
    minimizeArtifactPanel,
    maximizeArtifactPanel
  };
}
