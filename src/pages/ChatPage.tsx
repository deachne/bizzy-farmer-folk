import { useState, useEffect } from "react";
import NoteSidebar from "@/components/NoteSidebar";
import ChatMessages from "@/components/ChatMessages";
import ChatInputBar from "@/components/ChatInputBar";
import ChatHeader from "@/components/ChatHeader";
import ChatContextPanel from "@/components/ChatContextPanel";
import ArtifactPanel from "@/components/ArtifactPanel";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useChat } from "@/hooks/chat"; 
import { useChatScroll } from "@/hooks/use-chat-scroll";
import { useArtifacts } from "@/hooks/use-artifacts";
import { useContextPanel } from "@/hooks/use-context-panel";

const ChatPage = () => {
  const { 
    messages, 
    isAiTyping,
    activeChatSession,
    availableSessions,
    connectionStatus,
    uploadProgress,
    contextItems,
    sendMessage,
    saveMessageAsNote,
    createNewChat,
    switchChatSession,
    addItemToContext
  } = useChat();

  // Ensure activeChatSession has the extension field for the mockup
  if (!activeChatSession.extension && activeChatSession.name?.includes("Farm")) {
    activeChatSession.extension = "farm";
  } else if (!activeChatSession.extension) {
    activeChatSession.extension = "personal";
  }
  
  // Add a path field for the breadcrumb navigation if not present
  if (!activeChatSession.path && activeChatSession.name) {
    // Extract a path from the name for the breadcrumb
    if (activeChatSession.extension === "farm") {
      activeChatSession.path = "Crop Planning";
    } else if (activeChatSession.extension === "bank") {
      activeChatSession.path = "Financial Management";
    } else {
      activeChatSession.path = "Personal Management";
    }
  }

  const [activeProject, setActiveProject] = useState({
    id: "personal-notes",
    name: "Personal Notes"
  });

  useEffect(() => {
    switch (activeChatSession.name) {
      case "Travel Planning":
        setActiveProject({
          id: "travel-planning",
          name: "Travel Planning"
        });
        break;
      case "Home Renovation":
        setActiveProject({
          id: "home-renovation",
          name: "Home Renovation"
        });
        break;
      case "Personal Notes":
      default:
        setActiveProject({
          id: "personal-notes",
          name: "Personal Notes"
        });
        break;
    }
  }, [activeChatSession.name]);

  const { showContextPanel, setShowContextPanel, toggleContextPanel } = useContextPanel();
  
  const { 
    messagesEndRef, 
    messagesContainerRef, 
    handleWheel 
  } = useChatScroll(activeChatSession, messages);
  
  const { 
    artifactPanelOpen, 
    isPanelMinimized,
    currentMessageArtifacts, 
    initialArtifactIndex, 
    handleViewArtifact, 
    closeArtifactPanel,
    minimizeArtifactPanel,
    maximizeArtifactPanel 
  } = useArtifacts(showContextPanel, setShowContextPanel);

  const isMobile = useIsMobile();

  const viewArtifact = (messageId: string, artifactIndex: number) => {
    handleViewArtifact(messageId, artifactIndex, messages);
  };

  const handleCloseContextPanel = () => {
    setShowContextPanel(false);
  };

  return (
    <div className="flex min-h-screen max-h-screen overflow-hidden bg-gray-50">
      <NoteSidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <ChatHeader 
          activeChatSession={activeChatSession}
          availableSessions={availableSessions}
          onCreateNewChat={createNewChat}
          onSwitchSession={switchChatSession}
          onToggleContextPanel={toggleContextPanel}
          showContextPanel={showContextPanel}
        />
        
        <div className="flex flex-1 overflow-hidden relative bg-gray-100">
          <div className={cn(
            "flex flex-col transition-all duration-300 overflow-hidden",
            isMobile ? "w-full" : 
              artifactPanelOpen && !isPanelMinimized ? "w-[65%]" : 
                showContextPanel ? "w-[70%]" : "w-full"
          )}>
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 pb-20 scroll-smooth"
              onWheel={handleWheel}
            >
              <ChatMessages 
                messages={messages}
                isAiTyping={isAiTyping}
                onSaveAsNote={saveMessageAsNote}
                messagesEndRef={messagesEndRef}
                uploadProgress={uploadProgress}
                onViewArtifact={viewArtifact}
                onAddImageToContext={(imageUrl, imageName) => addItemToContext(imageUrl, imageName, "image")}
              />
            </div>
            
            <div className="sticky bottom-0 left-0 right-0 border-t p-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-10">
              <ChatInputBar 
                onSendMessage={sendMessage}
                connectionStatus={connectionStatus}
              />
            </div>
          </div>
          
          {showContextPanel && !(isMobile && artifactPanelOpen && !isPanelMinimized) && (
            <div className="hidden md:block md:w-[30%] h-full overflow-hidden transition-all duration-300 bg-gray-50">
              <ChatContextPanel 
                contextItems={contextItems} 
                onClose={isMobile ? handleCloseContextPanel : undefined}
                activeProject={activeProject}
              />
            </div>
          )}
        </div>
      </div>
      
      <ArtifactPanel 
        isOpen={artifactPanelOpen}
        isMinimized={isPanelMinimized}
        onClose={closeArtifactPanel}
        onMinimize={minimizeArtifactPanel}
        onMaximize={maximizeArtifactPanel}
        artifacts={currentMessageArtifacts}
        initialArtifactIndex={initialArtifactIndex}
      />
    </div>
  );
};

export default ChatPage;
