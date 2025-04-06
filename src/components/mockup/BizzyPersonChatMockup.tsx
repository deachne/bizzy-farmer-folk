
import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import ChatHeader from "./chat/ChatHeader";
import ChatMessages from "./chat/ChatMessages";
import ChatInput from "./chat/ChatInput";
import ContextPanel from "./context-panel/ContextPanel";

const BizzyPersonChatMockup = () => {
  const [activeExtension, setActiveExtension] = useState("farm");
  const [expandedProject, setExpandedProject] = useState<string | null>("crop-planning");
  const [activeProject, setActiveProject] = useState({
    id: "crop-planning",
    name: "Crop Planning"
  });

  const extensionProjects = {
    farm: [
      { id: "crop-planning", name: "Crop Planning", active: true, conversations: 3, conversations_list: ["Early blight treatment options", "Irrigation scheduling", "Crop rotation planning"] },
      { id: "pest-management", name: "Pest Management", active: false, conversations: 5, conversations_list: ["Aphid control methods", "Integrated pest management", "Beneficial insects", "Organic treatments", "Prevention strategies"] },
      { id: "field-health", name: "Field Health Monitoring", active: false, conversations: 2, conversations_list: ["Soil test results for North Field", "Nutrient deficiency signs"] }
    ],
    personal: [
      { id: "home-renovation", name: "Home Renovation", active: false, conversations: 8, conversations_list: ["Kitchen design ideas", "Bathroom contractors", "Flooring options"] },
      { id: "vacation", name: "Vacation Planning", active: false, conversations: 4, conversations_list: ["Hotel bookings", "Flight options", "Local attractions", "Packing list"] }
    ],
    bank: [
      { id: "budgeting", name: "Budgeting", active: false, conversations: 2, conversations_list: ["Monthly expense tracking", "Savings goals"] },
      { id: "investments", name: "Investments", active: false, conversations: 3, conversations_list: ["Portfolio diversification", "Retirement planning", "Tax strategies"] }
    ]
  };

  const handleExtensionChange = (extension: "farm" | "personal" | "bank") => {
    setActiveExtension(extension);
  };

  const toggleProjectExpansion = (projectId: string) => {
    if (expandedProject === projectId) {
      setExpandedProject(null);
    } else {
      setExpandedProject(projectId);
      
      const project = extensionProjects[activeExtension as keyof typeof extensionProjects].find(
        p => p.id === projectId
      );
      
      if (project) {
        setActiveProject({
          id: project.id,
          name: project.name
        });
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col bg-white">
        <ChatHeader 
          activeExtension={activeExtension}
          handleExtensionChange={handleExtensionChange}
        />

        <ChatMessages />

        <ChatInput />
      </div>

      <ContextPanel 
        activeProject={activeProject}
        extensionProjects={extensionProjects}
        activeExtension={activeExtension}
        expandedProject={expandedProject}
        toggleProjectExpansion={toggleProjectExpansion}
      />
    </div>
  );
};

export default BizzyPersonChatMockup;
