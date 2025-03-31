import { useState } from "react";
import { Message, ChatSession, ContextItem } from "@/types/chat";
import { toast } from "@/components/ui/use-toast";
import { useMessageHandling } from "./use-message-handling";
import { useChatSessions } from "./use-chat-sessions";
import { useContextItems } from "./use-context-items";
import { useConnectionStatus } from "./use-connection-status";

export function useChat() {
  // Initial messages state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help with your farm management today? Feel free to ask about soil conditions, crop planning, or equipment maintenance.",
      sender: "ai",
      timestamp: "9:30 AM",
      status: "delivered"
    },
    {
      id: "2",
      content: "I noticed some spots on my tomato plants this morning. The leaves have yellow patches with brown spots. What could it be?",
      sender: "user",
      timestamp: "9:32 AM",
      status: "delivered"
    },
    {
      id: "3",
      content: "Based on your description, it sounds like your tomato plants may have early blight, a common fungal disease. Here's a table of treatment options:",
      sender: "ai",
      timestamp: "9:33 AM",
      status: "delivered",
      artifacts: [
        {
          id: "a1",
          type: "table",
          title: "TREATMENT OPTIONS",
          content: {
            headers: ["", ""],
            rows: [
              ["Organic", "Copper fungicide, neem oil, remove affected leaves"],
              ["Chemical", "Chlorothalonil, mancozeb, or proprietary fungicides"]
            ]
          }
        }
      ]
    },
    {
      id: "4",
      content: "Thanks for the information. How often should I apply the copper fungicide?",
      sender: "user",
      timestamp: "9:35 AM",
      status: "delivered"
    },
    {
      id: "5",
      content: "For copper fungicide, you should typically apply it every 7-10 days during dry weather, and more frequently (every 5-7 days) during wet weather. Always follow the specific product instructions for exact timing and concentration. Make sure to cover both sides of the leaves thoroughly.",
      sender: "ai",
      timestamp: "9:36 AM",
      status: "delivered"
    },
    {
      id: "6",
      content: "Should I remove the affected leaves before applying the treatment?",
      sender: "user",
      timestamp: "9:38 AM",
      status: "delivered"
    },
    {
      id: "7",
      content: "Yes, removing affected leaves is recommended before applying fungicide. This helps reduce the spread of the disease. Be sure to:\n\n1. Cut off affected leaves with clean, sterilized scissors or pruners\n2. Dispose of infected material in the trash (not compost)\n3. Wash your hands and sterilize tools after handling infected plants\n4. Apply the fungicide after removing the affected foliage",
      sender: "ai",
      timestamp: "9:40 AM",
      status: "delivered"
    },
    {
      id: "8",
      content: "What's the best time of day to apply fungicide?",
      sender: "user",
      timestamp: "9:42 AM",
      status: "delivered"
    },
    {
      id: "9",
      content: "The best time to apply fungicide is in the early morning or late evening when temperatures are cooler. This timing provides several benefits:\n\n- Avoids peak sun hours that could cause leaf burn\n- Allows better absorption as the product dries slowly\n- Reduces the risk of evaporation before the product is effective\n- Minimizes exposure to beneficial insects that are most active midday\n\nAvoid application when rain is forecast within 24 hours for best results.",
      sender: "ai",
      timestamp: "9:44 AM",
      status: "delivered"
    },
    {
      id: "10",
      content: "Are there any preventative measures I can take to avoid this issue next season?",
      sender: "user",
      timestamp: "9:47 AM",
      status: "delivered"
    },
    {
      id: "11",
      content: "Absolutely! Here are some preventative measures for next season to minimize early blight risk:",
      sender: "ai",
      timestamp: "9:49 AM",
      status: "delivered",
      artifacts: [
        {
          id: "a2",
          type: "table",
          title: "PREVENTATIVE MEASURES",
          content: {
            headers: ["", ""],
            rows: [
              ["Crop Rotation", "Avoid planting tomatoes in the same location for 2-3 years"],
              ["Plant Spacing", "Ensure adequate spacing for good air circulation"],
              ["Mulching", "Apply mulch to prevent soil splash onto lower leaves"],
              ["Watering", "Use drip irrigation or soaker hoses to keep foliage dry"],
              ["Resistant Varieties", "Choose tomato varieties with early blight resistance"],
              ["Staking/Trellising", "Keep plants off the ground to reduce disease exposure"],
              ["Fall Cleanup", "Remove and destroy all plant debris after harvest"]
            ]
          }
        }
      ]
    },
    {
      id: "12",
      content: "This is very helpful information. Do you know any resistant tomato varieties I could try next year?",
      sender: "user",
      timestamp: "9:52 AM",
      status: "delivered"
    },
    {
      id: "13",
      content: "Here are some tomato varieties with good resistance to early blight that you might consider for next season:\n\n1. Iron Lady - Highly resistant to early blight, late blight, and septoria leaf spot\n2. Jasper - Cherry tomato with excellent disease resistance\n3. Mountain Magic - Campari-type with resistance to early and late blight\n4. Defiant PhR - Medium-sized slicing tomato with good disease resistance\n5. Mountain Merit - Large slicing tomato with multiple disease resistances\n6. Plum Regal - Roma/paste type with good blight resistance\n7. Valentine - Red grape tomato with improved disease resistance\n\nWhen purchasing seeds or plants, look for varieties labeled with 'EB' for early blight resistance in their disease resistance codes.",
      sender: "ai",
      timestamp: "9:55 AM",
      status: "delivered"
    },
    {
      id: "14",
      content: "I've been considering switching to drip irrigation. Is that something you'd recommend?",
      sender: "user",
      timestamp: "10:00 AM",
      status: "delivered"
    },
    {
      id: "15",
      content: "Yes, I highly recommend switching to drip irrigation for your tomatoes and other vegetables. It offers several significant advantages:",
      sender: "ai",
      timestamp: "10:03 AM",
      status: "delivered",
      artifacts: [
        {
          id: "a3",
          type: "table",
          title: "DRIP IRRIGATION BENEFITS",
          content: {
            headers: ["Benefit", "Description"],
            rows: [
              ["Disease Prevention", "Keeps foliage dry, significantly reducing fungal disease risk"],
              ["Water Conservation", "Reduces water usage by 30-50% compared to sprinkler irrigation"],
              ["Fertilizer Efficiency", "Allows precise fertigation (fertilizer application through irrigation)"],
              ["Weed Reduction", "Waters only the crop root zone, not surrounding areas where weeds grow"],
              ["Soil Structure", "Prevents soil compaction and erosion from water impact"],
              ["Convenience", "Can be automated with timers for consistent watering"]
            ]
          }
        }
      ]
    },
    {
      id: "16",
      content: "Thanks for all this information. One last question - what's the expected crop yield loss from early blight if I treat it promptly?",
      sender: "user",
      timestamp: "10:10 AM",
      status: "delivered"
    },
    {
      id: "17",
      content: "With prompt treatment of early blight, you can expect to minimize yield losses significantly. Here's what you might expect:\n\n- Prompt treatment (at first signs): Typically limits yield loss to 5-15%\n- Delayed treatment (disease well-established): May result in 20-40% yield loss\n- No treatment: Can lead to 50-80% yield reduction in severe cases\n\nFactors affecting the impact include:\n- Weather conditions (wet, humid conditions worsen spread)\n- Variety susceptibility\n- Plant vigor and overall health\n- Treatment effectiveness\n- Thoroughness of affected leaf removal\n\nBy implementing the preventative measures we discussed and treating promptly at the first signs of disease, you should be able to maintain good productivity despite the current infection.",
      sender: "ai",
      timestamp: "10:13 AM",
      status: "delivered"
    }
  ]);

  const [isAiTyping, setIsAiTyping] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  
  // Use our new focused hooks
  const { 
    activeChatSession, 
    availableSessions, 
    switchChatSession, 
    createNewChat 
  } = useChatSessions(setMessages);
  
  const { connectionStatus } = useConnectionStatus();
  
  const { 
    contextItems, 
    addItemToContext 
  } = useContextItems();
  
  const { 
    sendMessage, 
    saveMessageAsNote 
  } = useMessageHandling({
    messages,
    setMessages,
    setIsAiTyping,
    setUploadProgress,
    addItemToContext
  });

  return {
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
  };
}
