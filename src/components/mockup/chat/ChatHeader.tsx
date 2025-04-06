
import React, { useState, useEffect } from "react";
import { ChevronDown, MoreHorizontal, PlusCircle, SidebarOpen, SidebarClose } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  activeExtension: string;
  handleExtensionChange: (extension: "farm" | "personal" | "bank") => void;
}

const ChatHeader = ({ activeExtension, handleExtensionChange }: ChatHeaderProps) => {
  const [selectedModel, setSelectedModel] = useState("Claude 3.7 Sonnet");
  const [showContextPanel, setShowContextPanel] = useState(true);

  const getExtensionEmoji = (extension: string) => {
    switch(extension) {
      case "farm": return "🌾";
      case "personal": return "🏠";
      case "bank": return "🏦";
      default: return "";
    }
  };
  
  const getExtensionName = (extension: string) => {
    switch(extension) {
      case "farm": return "BizzyFarmer";
      case "personal": return "Personal";
      case "bank": return "Bank Management";
      default: return "BizzyPerson";
    }
  };

  const toggleContextPanel = () => {
    setShowContextPanel(!showContextPanel);
  };

  const createNewChat = () => {
    console.log("Creating new chat");
  };

  return (
    <div className="border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0 bg-white">
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center text-lg font-medium hover:bg-gray-100 p-1 rounded">
              <span>
                {getExtensionEmoji(activeExtension)} {getExtensionName(activeExtension)}
              </span>
              <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white border shadow-md rounded-md z-50">
            {activeExtension !== "farm" && (
              <DropdownMenuItem onClick={() => handleExtensionChange("farm")}>
                🌾 BizzyFarmer
              </DropdownMenuItem>
            )}
            {activeExtension !== "bank" && (
              <DropdownMenuItem onClick={() => handleExtensionChange("bank")}>
                🏦 Bank Management
              </DropdownMenuItem>
            )}
            {activeExtension !== "personal" && (
              <DropdownMenuItem onClick={() => handleExtensionChange("personal")}>
                🏠 Personal
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <span className="ml-4 text-sm text-gray-500">» Crop Planning</span>
        <span className="ml-4 text-sm text-gray-500">» Early blight treatment options</span>
      </div>
      
      <div className="flex space-x-3 items-center">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-[180px] h-8 text-sm">
            <SelectValue placeholder="Select model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</SelectItem>
            <SelectItem value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</SelectItem>
            <SelectItem value="GPT-4o">GPT-4o</SelectItem>
            <SelectItem value="GPT-4o Mini">GPT-4o Mini</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gray-300 h-8"
          onClick={toggleContextPanel}
        >
          {showContextPanel ? "Hide Context" : "Show Context"}
        </Button>
        
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white h-8"
          onClick={createNewChat}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Chat
        </Button>
        
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
