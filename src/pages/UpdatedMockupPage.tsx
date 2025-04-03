
import React from "react";
import { useContextPanel } from "@/hooks/use-context-panel";
import ContextPanelContainer from "@/components/context-panel/ContextPanelContainer";
import OrganizedContextPanel from "@/components/context-panel/OrganizedContextPanel";

const UpdatedMockupPage = () => {
  const { showContextPanel, toggleContextPanel } = useContextPanel();
  
  // Sample data for the context panel
  const mockContextItems = [
    { id: "1", name: "Your Notes", type: "document", url: "#", addedAt: "2:45 PM" },
    { id: "2", name: "Field Observation (Yesterday)", type: "document", url: "#", addedAt: "11:30 AM" },
    { id: "3", name: "Crop Knowledge Base", type: "document", url: "#", addedAt: "Yesterday" },
    { id: "4", name: "Tomato Diseases PDF", type: "document", url: "#", addedAt: "2 days ago" },
    { id: "5", name: "Field photo 1", type: "image", url: "https://images.unsplash.com/photo-1601410459457-fde3ae84c658?q=80&w=400", addedAt: "Today" },
    { id: "6", name: "Disease sample", type: "image", url: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=400", addedAt: "Yesterday" },
  ];
  
  const mockConversations = [
    { name: "Crop Planning", count: 3, active: true },
    { name: "Pest Management", count: 5 },
    { name: "Field Health Monitoring", count: 2 },
  ];
  
  return (
    <div className="flex h-screen bg-white">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Updated Context Panel Example</h1>
          <p className="text-gray-600">This page demonstrates the updated context panel layout with the new tab organization.</p>
        </div>
        
        <div className="mb-4">
          <button 
            onClick={toggleContextPanel}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {showContextPanel ? "Hide Context Panel" : "Show Context Panel"}
          </button>
        </div>
        
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2">New Features:</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Organized tabs: Knowledge, Conversations, and Media</li>
            <li>Clearer project organization</li>
            <li>Upload and source buttons</li>
            <li>Better visual distinction between active and inactive projects</li>
          </ul>
        </div>
      </div>
      
      {showContextPanel && (
        <div className="w-80 border-l border-gray-200">
          <ContextPanelContainer onClose={toggleContextPanel}>
            <OrganizedContextPanel 
              contextItems={mockContextItems}
              conversations={mockConversations}
              onAddSource={() => alert('Adding source')}
              onUploadMedia={() => alert('Uploading media')}
            />
          </ContextPanelContainer>
        </div>
      )}
    </div>
  );
};

export default UpdatedMockupPage;
