
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { Part, Task } from "@/pages/TasksPage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuickAddPartsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tasks: Task[];
  onUpdateTask: (task: Task) => void;
}

// Define available categories for simple items
const CATEGORIES = ["Shop", "Grocery", "Cabin", "Hardware", "General"];

const QuickAddParts = ({ open, onOpenChange, tasks, onUpdateTask }: QuickAddPartsProps) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedTask, setSelectedTask] = useState<string>(tasks[0]?.id || "");
  const [selectedCategory, setSelectedCategory] = useState<string>("General");

  const handleAdd = () => {
    if (!inputValue.trim() || !selectedTask) return;
    
    // Find the selected task
    const task = tasks.find(t => t.id === selectedTask);
    if (!task) return;
    
    // Create new part with category
    const newPart: Part = {
      id: Date.now().toString(),
      name: inputValue.trim(),
      quantity: 1,
      ordered: false,
      received: false,
      category: selectedCategory  // Add the category to the part
    };
    
    // Update the task with the new part
    const updatedTask = { 
      ...task,
      parts: [...(task.parts || []), newPart]
    };
    
    onUpdateTask(updatedTask);
    setInputValue("");
    
    // Keep the dialog open for multiple additions
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quick Add Items</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Type item name and press Enter..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button onClick={handleAdd} disabled={!inputValue.trim()}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Add to task:</label>
              <Select 
                value={selectedTask}
                onValueChange={setSelectedTask}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent>
                  {tasks.map(task => (
                    <SelectItem key={task.id} value={task.id}>
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Category:</label>
              <Select 
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Quick add creates simple parts without vendor or part number information.
            Use categories to organize your items by location or purpose.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddParts;
