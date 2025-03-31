
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function useContextPanel() {
  const [showContextPanel, setShowContextPanel] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
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
    toggleContextPanel
  };
}
