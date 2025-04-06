
import React, { useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChatHeaderProps {
  activeExtension: string;
  handleExtensionChange: (extension: "farm" | "personal" | "bank") => void;
}

const ChatHeader = ({ activeExtension, handleExtensionChange }: ChatHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Claude 3.7 Sonnet");

  return (
    <div className="border-b border-gray-200 px-6 py-3 flex justify-between items-center shrink-0">
      <div className="flex items-center">
        <div className="relative">
          <button 
            className="flex items-center text-lg font-medium hover:bg-gray-100 p-1 rounded"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>
              {activeExtension === "farm" && "🌾 BizzyFarmer"}
              {activeExtension === "personal" && "🏠 Personal"}
              {activeExtension === "bank" && "🏦 Bank Management"}
            </span>
            <ChevronDown className="w-4 h-4 ml-1 text-gray-500" />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
              {activeExtension !== "farm" && (
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleExtensionChange("farm")}
                >
                  🌾 BizzyFarmer
                </a>
              )}
              {activeExtension !== "bank" && (
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleExtensionChange("bank")}
                >
                  🏦 Bank Management
                </a>
              )}
              {activeExtension !== "personal" && (
                <a 
                  href="#" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleExtensionChange("personal")}
                >
                  🏠 Personal
                </a>
              )}
            </div>
          )}
        </div>
        <span className="ml-4 text-sm text-gray-500">» Crop Planning</span>
        <span className="ml-4 text-sm text-gray-500">» Early blight treatment options</span>
      </div>
      <div className="flex space-x-2 items-center">
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
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
