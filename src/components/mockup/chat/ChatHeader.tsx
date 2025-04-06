
import React, { useState } from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";

interface ChatHeaderProps {
  activeExtension: string;
  handleExtensionChange: (extension: "farm" | "personal" | "bank") => void;
}

const ChatHeader = ({ activeExtension, handleExtensionChange }: ChatHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <div className="flex space-x-2">
        <span className="text-sm text-gray-500">Model: Claude 3.7 Sonnet</span>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
