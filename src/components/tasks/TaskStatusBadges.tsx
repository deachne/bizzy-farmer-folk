
import React from "react";
import { Task } from "@/pages/TasksPage";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getStatusConfig, getPriorityConfig } from "./TaskDetailUtils";
import { Flag } from "lucide-react";

interface TaskStatusBadgesProps {
  task: Task;
  priority: "high" | "medium" | "normal";
  priorityOpen: boolean;
  setPriorityOpen: (open: boolean) => void;
  onUpdateTask: (task: Task) => void;
}

const TaskStatusBadges = ({ 
  task, 
  priority, 
  priorityOpen, 
  setPriorityOpen,
  onUpdateTask 
}: TaskStatusBadgesProps) => {
  const statusConfig = getStatusConfig(task.status);
  const availableStatuses: Task['status'][] = ["todo", "field-tasks", "parts-list", "in-progress", "completed"];
  const priorityConfig = getPriorityConfig(priority);

  const handleStatusChange = (newStatus: Task['status']) => {
    const updatedTask = {
      ...task,
      status: newStatus
    };
    onUpdateTask(updatedTask);
  };

  const handlePriorityChange = (newPriority: "high" | "medium" | "normal") => {
    setPriorityOpen(false);
    
    // Always update parent component
    const updatedTask = {
      ...task,
      priority: newPriority
    };
    onUpdateTask(updatedTask);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Popover>
        <PopoverTrigger asChild>
          <div 
            className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${statusConfig.bg} ${statusConfig.text}`}
          >
            {statusConfig.label}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto z-50 bg-white" align="start">
          <div className="py-1">
            {availableStatuses
              .filter(status => status !== task.status)
              .map((status) => (
                <div
                  key={status}
                  className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleStatusChange(status)}
                >
                  {getStatusConfig(status).label}
                </div>
              ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
        <PopoverTrigger asChild>
          <div 
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${priorityConfig.bg} ${priorityConfig.text}`}
          >
            {priorityConfig.icon}
            {priorityConfig.label}
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto z-50 bg-white" align="start">
          <div className="py-1">
            <div 
              className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handlePriorityChange("high")}
            >
              <Flag className="h-4 w-4 text-red-500" fill="currentColor" />
              <span>High</span>
            </div>
            <div 
              className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handlePriorityChange("medium")}
            >
              <Flag className="h-4 w-4 text-yellow-500" />
              <span>Medium</span>
            </div>
            <div 
              className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handlePriorityChange("normal")}
            >
              <Flag className="h-4 w-4 text-green-500" />
              <span>Normal</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TaskStatusBadges;
