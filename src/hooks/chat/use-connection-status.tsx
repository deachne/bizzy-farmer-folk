
import { useState, useEffect } from "react";

export function useConnectionStatus() {
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connected");

  // This could be expanded in the future to actually monitor connection status
  // For now, it just returns a static "connected" state
  
  return {
    connectionStatus
  };
}
