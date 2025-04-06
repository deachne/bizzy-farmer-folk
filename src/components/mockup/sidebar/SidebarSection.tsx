
import React, { ReactNode } from "react";
import { Plus } from "lucide-react";

interface SidebarSectionProps {
  title: string;
  children: ReactNode;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

const SidebarSection = ({ title, children, showAddButton = false, onAddClick }: SidebarSectionProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between px-2 py-1">
        <span className="text-xs font-semibold text-blue-200 uppercase">{title}</span>
        {showAddButton && (
          <button 
            className="text-blue-200 hover:text-white p-1"
            onClick={onAddClick}
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarSection;
