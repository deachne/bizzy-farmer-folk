
export interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: string;
  artifacts?: Artifact[];
  attachments?: {
    id: string;
    name: string;
    type: string;
    url: string;
  }[];
  isNew?: boolean;
  status?: "sending" | "sent" | "delivered" | "error";
}

export interface Artifact {
  id: string;
  type: "table" | "image" | "chart";
  content: any;
  title?: string;
}

export interface ChatSession {
  id: string;
  name: string;
  model: string;
}

export interface ContextItem {
  id: string;
  url: string;
  name: string;
  type: "image" | "document";
  addedAt: string;
}
