
import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronRight, Edit, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const CustomInstructions = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [instructions, setInstructions] = useState(
    "BizzyPerson is a next-generation knowledge management platform that combines powerful AI capabilities with practical tools for real-world work. Use your knowledge about agricultural practices to assist with crop planning and field management."
  );
  const [editingValue, setEditingValue] = useState(instructions);

  const handleEdit = () => {
    setEditingValue(instructions);
    setIsEditing(true);
  };

  const handleSave = () => {
    setInstructions(editingValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingValue(instructions);
    setIsEditing(false);
  };

  return (
    <div className="border-t border-gray-200 pt-1">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-50">
          <h3 className="text-sm font-semibold text-gray-500">CUSTOM INSTRUCTIONS</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-90"
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <div className="px-4 pb-3">
            {isEditing ? (
              <div className="space-y-2">
                <Textarea 
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  className="min-h-[100px] text-sm focus:border-blue-400"
                  placeholder="Enter custom instructions for the AI..."
                />
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCancel}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm" 
                    onClick={handleSave}
                    className="text-xs bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="h-3.5 w-3.5 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded p-3 text-sm text-gray-700 relative group">
                <p>{instructions}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEdit}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-7 w-7"
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CustomInstructions;
