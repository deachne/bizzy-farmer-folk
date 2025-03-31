
export interface AttachmentFile extends File {
  id?: string;
  preview?: string;
}

export type ConnectionStatus = "connected" | "connecting" | "disconnected";
