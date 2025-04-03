
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function useContextPanel() {
  const [showContextPanel, setShowContextPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<"knowledge" | "conversations" | "media">("knowledge");
  const isMobile = useIsMobile();

  useEffect(() => {
    // On mobile, start with panel closed
    if (isMobile) {
      setShowContextPanel(false);
    } else {
      setShowContextPanel(true);
    }
  }, [isMobile]);

  const toggleContextPanel = () => {
    setShowContextPanel(prev => !prev);
  };

  return {
    showContextPanel,
    setShowContextPanel,
    toggleContextPanel,
    activeTab,
    setActiveTab
  };
}
