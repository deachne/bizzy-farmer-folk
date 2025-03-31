
import React, { useState } from "react";
import { X, Tag, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Task } from "@/pages/TasksPage";

interface TaskTagsProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
}

const TaskTags = ({ task, onUpdateTask }: TaskTagsProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagOptions] = useState([
    "Equipment", "Urgent", "North Field", "East Field", "South Field", 
    "Supplies", "Pricing", "Maintenance", "Planting", "Harvest"
  ]);

  const addTag = () => {
    if (tagInput.trim() && !task.tags.includes(tagInput.trim())) {
      const updatedTask = {
        ...task,
        tags: [...task.tags, tagInput.trim()],
      };
      onUpdateTask(updatedTask);
      setTagInput("");
    }
  };

  const addTagFromDropdown = (tag: string) => {
    if (!task.tags.includes(tag)) {
      const updatedTask = {
        ...task,
        tags: [...task.tags, tag],
      };
      onUpdateTask(updatedTask);
    }
    setTagDropdownOpen(false);
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTask = {
      ...task,
      tags: task.tags.filter(tag => tag !== tagToRemove),
    };
    onUpdateTask(updatedTask);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  // Filter tag options to only show tags that aren't already added
  const availableTags = tagOptions.filter(tag => !task.tags.includes(tag));

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <Tag className="h-4 w-4 text-gray-400 mr-2" />
        <span className="text-sm font-medium text-gray-700">Tags</span>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        {task.tags.map((tag, index) => (
          <Badge 
            key={index} 
            variant="outline" 
            className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
          >
            {tag}
            <button 
              onClick={() => removeTag(tag)}
              className="text-blue-400 hover:text-blue-700"
              aria-label={`Remove ${tag} tag`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Popover open={tagDropdownOpen} onOpenChange={setTagDropdownOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm h-8 border-dashed border-gray-300"
              disabled={availableTags.length === 0}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-auto z-50 bg-white" align="start">
            <div className="py-1 max-h-40 overflow-y-auto">
              {availableTags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => addTagFromDropdown(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        
        <div className="flex-1 flex">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Custom tag..."
            className="text-sm h-8 border-dashed border-gray-300"
          />
          <Button 
            size="sm" 
            variant="ghost" 
            className="ml-1 h-8"
            onClick={addTag}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskTags;
