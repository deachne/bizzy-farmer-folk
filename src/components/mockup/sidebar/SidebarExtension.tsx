
import React from "react";
import { ChevronDown, Folder, Plus } from "lucide-react";

interface SidebarExtensionProps {
  title: string;
  icon: string;
  items?: { name: string; icon: React.ReactNode }[];
}

const SidebarExtension = ({ title, icon, items = [] }: SidebarExtensionProps) => {
  return (
    <div>
      <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-blue-100 rounded-md hover:bg-blue-700/50 cursor-pointer">
        <div className="flex items-center">
          <ChevronDown className="h-4 w-4 mr-2 text-blue-300" />
          <span>{icon} {title}</span>
        </div>
        <button className="text-blue-200 hover:text-white p-1">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {items.length > 0 && (
        <div className="ml-6 mt-1 space-y-1 border-l border-blue-700 pl-3">
          {items.map((item, index) => (
            <a 
              key={index}
              href="#" 
              className="flex items-center px-3 py-1.5 text-sm text-blue-100 rounded-md hover:bg-blue-700/40"
            >
              <Folder className="h-4 w-4 mr-2 text-blue-300" />
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarExtension;
