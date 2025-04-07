import React, { useCallback } from 'react';

// Switch sessions
const switchChatSession = useCallback((sessionId: string) => {
  console.log("ATTEMPTING to switch to session ID:", sessionId);
  const session = availableSessions.find(s => s.id === sessionId);
  if (session) {
    console.log("FOUND session to switch to:", session.id, session.name, session.currentConversation);
    
    // Get the conversation name directly from the session
    const conversationName = session.currentConversation || "Selected Conversation"; // Fallback if somehow undefined
    
    // Use the sessionId directly as the message key
    const messageKey = sessionId;
    console.log("Looking for messages with key:", messageKey);
    
    // Set messages for the current session - check both direct match and if there's a key that includes the sessionId
    let sessionMessages = initialMessages[messageKey] || [];
    
    // If we don't find messages for the exact ID, try to find messages by partial match
    if (sessionMessages.length === 0) {
      const alternateKey = Object.keys(initialMessages).find(key => 
        key.includes(sessionId) || sessionId.includes(key)
      );
      if (alternateKey) {
        console.log(`Found messages under alternate key: ${alternateKey}`);
        sessionMessages = initialMessages[alternateKey] || [];
      }
    }
    
    console.log(`Loading ${sessionMessages.length} messages for conversation:`, messageKey);
    
    // Create default messages if this is an empty conversation
    if (sessionMessages.length === 0 && conversationName !== 'New Conversation') {
      console.log("No messages found - creating default welcome message");
      sessionMessages = createDefaultMessages(session.name, conversationName);
      initialMessages[messageKey] = sessionMessages; // Cache the default messages
    } else if (sessionMessages.length > 0) {
      console.log("First message:", sessionMessages[0].content.substring(0, 50) + "...");
    }
    
    // IMPORTANT: Set messages BEFORE updating the active session
    setMessages(sessionMessages);
    
    // Set context items for the current session
    setContextItems(mockContextItems[messageKey] || []);
    
    // Prepare the updated session object with the proper name and conversation
    const updatedSession = { 
      ...session,
      currentConversation: conversationName
    };
    
    // Update document title
    document.title = `${conversationName} | ${updatedSession.name} | BizzyPerson`;
    
    console.log("UPDATING active chat session to:", updatedSession);
    
    // IMPORTANT: Update active chat session state
    setActiveChatSession(updatedSession);
    
    // Return true to indicate success
    return true;
  } else {
    console.error(`ERROR: Session not found for ID: ${sessionId}`);
    return false;
  }
}, [availableSessions]); 