// Function to handle clicking on a conversation
const handleConversationClick = (conversationId: string) => {
  console.log("Conversation clicked (using direct ID):", conversationId);
  
  // Find the conversation title from projects data for logging
  let conversationTitle = "";
  let projectName = "";
  const projectWithConvo = projects.find(project => {
    const convo = project.conversations.find(c => c.id === conversationId);
    if (convo) {
      conversationTitle = convo.title;
      projectName = project.name;
      return true;
    }
    return false;
  });
  
  if (projectWithConvo) {
    console.log(`Switching to conversation "${conversationTitle}" (ID: ${conversationId}) in project "${projectName}"`);
  } else {
    // This might happen if the conversation is from "Recent Conversations"
    console.warn(`Could not find project for conversation ID: ${conversationId} in the current project list.`);
  }
  
  // Log available session information to help debug
  console.log("Available sessions:");
  availableSessions.forEach(session => {
    console.log(`- Session ${session.id}: ${session.name} / ${session.currentConversation}`);
  });

  // Call switchChatSession with the standardized ID
  switchChatSession(conversationId);
  
  // Force update the UI by directly setting the active project ID if we know it
  if (projectWithConvo && projectWithConvo.storeId && onProjectSelect) {
    console.log(`Forcing project selection update to: ${projectWithConvo.storeId}`);
    onProjectSelect(projectWithConvo.storeId);
  }
}; 