
import { Flag } from "lucide-react";
import { Task } from "@/pages/TasksPage";

// Define status colors and labels
export const getStatusConfig = (status: string) => {
  switch (status) {
    case "completed":
      return { 
        bg: "bg-gray-100", 
        text: "text-gray-700",
        label: "Completed"
      };
    case "in-progress":
      return { 
        bg: "bg-yellow-50", 
        text: "text-yellow-700",
        label: "In Progress"
      };
    case "field-tasks":
      return { 
        bg: "bg-green-50", 
        text: "text-green-700",
        label: "Field Tasks"
      };
    case "parts-list":
      return { 
        bg: "bg-orange-50", 
        text: "text-orange-700",
        label: "Parts List"
      };
    default:
      return { 
        bg: "bg-blue-50", 
        text: "text-blue-700",
        label: "To Do"
      };
  }
};

// Define priority colors and labels
export const getPriorityConfig = (priority: string) => {
  switch (priority) {
    case "high":
      return { 
        bg: "bg-red-50", 
        text: "text-red-700",
        label: "High",
        icon: <Flag className="h-4 w-4 text-red-500" fill="currentColor" />
      };
    case "medium":
      return { 
        bg: "bg-yellow-50", 
        text: "text-yellow-700",
        label: "Medium",
        icon: <Flag className="h-4 w-4 text-yellow-500" />
      };
    default:
      return { 
        bg: "bg-green-50", 
        text: "text-green-700",
        label: "Normal",
        icon: <Flag className="h-4 w-4 text-green-500" />
      };
  }
};
