export interface Extension {
  id: string; // 'personal', 'bizzy-farmer'
  name: string;
  type: 'personal' | 'business'; // Type determines child structure
  icon?: string; // Optional icon
  description?: string; // Optional description
}

export interface Workspace {
  id: string;
  name: string; // 'Personal', '2024 Season'
  description?: string;
  icon?: string;
  extensionId: string; // ID of the parent Extension
  createdAt: Date; // Use Date object
  updatedAt: Date; // Use Date object
}

// --- Used ONLY in 'personal' extensions ---
export interface Project {
  id: string;
  name: string; // 'Home Renovation'
  description?: string;
  icon?: string;
  workspaceId: string; // ID of the parent Workspace (must be in a 'personal' extension)
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean; // Optional: for UI state
}

// --- Used ONLY in 'business' extensions ---
export interface Feature {
  id: string;
  name: string; // 'Fields', 'Equipment'
  featureRef: string; // Mandatory identifier: 'bizzyfarmer.fields'
  description?: string;
  icon?: string;
  workspaceId: string; // ID of the parent Workspace (must be in a 'business' extension)
  createdAt: Date;
  updatedAt: Date;
  isActive?: boolean; // Optional: for UI state
}

// Chat needs to know its parent type
export interface Chat {
  id: string;
  title: string; // Keep 'title' for display name consistency? Or rename to 'name'? Let's keep title for now.
  snippet?: string; // Short preview of content
  parentId: string; // ID of the parent Project OR Feature
  parentType: 'project' | 'feature'; // Type of the parent
  workspaceId: string; // Denormalized for easier access? Or derive from parent? Let's keep it for now.
  extensionId: string; // Denormalized for easier access? Or derive from parent? Let's keep it for now.
  createdAt: Date;
  updatedAt: Date;
  tags?: string[]; // Optional tags
  messages?: Message[]; // Array of Message objects (or IDs)
}

// Define Attachment and Artifact types if needed, or import from elsewhere
// export interface Attachment { /* ... */ }
// export interface Artifact { /* ... */ }

export interface Message {
  id: string;
  chatId: string; // Renamed from conversationId
  content: string;
  sender: "user" | "ai";
  timestamp: Date; // Use Date object
  status?: "sending" | "delivered" | "error"; // Optional status
  // attachments?: Attachment[];
  // artifacts?: Artifact[];
} 