import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import localforage from 'localforage'; // Using localforage for robust IndexedDB storage

import type {
  Extension,
  Workspace,
  Project,
  Feature,
  Chat,
} from '../types/conversation'; // Adjust path if necessary

// Define the shape of the active parent (Project or Feature)
export type ActiveParent = { id: string; type: 'project' | 'feature' } | null;

// Define the state structure including actions
export interface ConversationState {
  // Data Arrays
  extensions: Extension[];
  workspaces: Workspace[];
  projects: Project[]; // Holds only 'personal' projects
  features: Feature[]; // Holds only 'business' features
  chats: Chat[];

  // Active Context IDs
  activeExtensionId: string | null;
  activeWorkspaceId: string | null;
  activeParent: ActiveParent; // Tracks the active Project or Feature
  activeChatId: string | null;

  // Actions - functions to update the state
  setExtensions: (extensions: Extension[]) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setProjects: (projects: Project[]) => void;
  setFeatures: (features: Feature[]) => void;
  setChats: (chats: Chat[]) => void;

  setActiveExtensionId: (id: string | null) => void;
  setActiveWorkspaceId: (id: string | null) => void;
  setActiveParent: (parent: ActiveParent) => void;
  setActiveChatId: (id: string | null) => void;

  // TODO: Add actions for CRUD operations (addWorkspace, addProject, addChat, etc.) later
}

// --- Store Implementation ---

export const useConversationStore = create<ConversationState>()(
  persist(
    (set) => ({
      // --- Initial State ---
      extensions: [],
      workspaces: [],
      projects: [],
      features: [],
      chats: [],
      activeExtensionId: null,
      activeWorkspaceId: null,
      activeParent: null,
      activeChatId: null,

      // --- Actions ---
      setExtensions: (extensions) => set({ extensions }),
      setWorkspaces: (workspaces) => set({ workspaces }),
      setProjects: (projects) => set({ projects }),
      setFeatures: (features) => set({ features }),
      setChats: (chats) => set({ chats }),

      setActiveExtensionId: (id) => set({ activeExtensionId: id }),
      setActiveWorkspaceId: (id) => set({ activeWorkspaceId: id }),
      setActiveParent: (parent) => set({ activeParent: parent }),
      setActiveChatId: (id) => set({ activeChatId: id }),

      // TODO: Implement CRUD actions
    }),
    {
      name: 'bizzy-conversation-storage', // Unique name for the storage instance
      storage: createJSONStorage(() => localforage), // Use IndexedDB via localforage
      partialize: (state) => ({
        // Persist only the core data and active IDs
        extensions: state.extensions,
        workspaces: state.workspaces,
        projects: state.projects,
        features: state.features,
        chats: state.chats,
        activeExtensionId: state.activeExtensionId,
        activeWorkspaceId: state.activeWorkspaceId,
        activeParent: state.activeParent,
        activeChatId: state.activeChatId,
      }),
      version: 1, // Optional: Add versioning for migrations
      // Optional: Add migration logic if needed in the future
      // migrate: (persistedState, version) => { ... }
    }
  )
);

// --- Optional: Selectors for derived state ---
// Example: Get the currently active workspace object
export const selectActiveWorkspace = (state: ConversationState): Workspace | undefined => {
    return state.workspaces.find(ws => ws.id === state.activeWorkspaceId);
}

// Add other selectors as needed... 