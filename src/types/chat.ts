
export interface ContextImage {
  id: string;
  url: string;
  name: string;
  addedAt: string;
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
  status?: "sending" | "sent" | "error";
  isNew?: boolean;
  attachments?: {
    id: string;
    type: string;
    name: string;
    url: string;
  }[];
  artifacts?: Artifact[];
}

export interface Artifact {
  id: string;
  type: "table" | "chart" | "image" | "text";
  title?: string;
  content: any;
}

export interface ChatSession {
  id: string;
  name: string;
  model: string;
  messages: Message[];
  contextImages?: ContextImage[];
  createdAt: string;
  updatedAt: string;
}
