
import React from 'react';
import { Task } from "@/pages/TasksPage";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Flag, ShoppingBag } from "lucide-react";

interface TasksListProps {
  tasks: Task[];
  selectedTask: Task | null;
  onSelectTask: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
}

const TasksList = ({ tasks, selectedTask, onSelectTask, onCompleteTask }: TasksListProps) => {
  // Priority color mapping
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          border: "border-red-300",
          bg: "bg-red-50",
          text: "text-red-700",
          badgeBg: "bg-red-50",
          badgeText: "text-red-700",
          flagColor: "text-red-500"
        };
      case "medium":
        return {
          border: "border-yellow-300",
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          badgeBg: "bg-yellow-50",
          badgeText: "text-yellow-700",
          flagColor: "text-yellow-500"
        };
      default:
        return {
          border: "border-green-300",
          bg: "bg-green-50",
          text: "text-green-700",
          badgeBg: "bg-green-50",
          badgeText: "text-green-700",
          flagColor: "text-green-500"
        };
    }
  };

  // Handle task completion
  const handleCompleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selection of the task
    onCompleteTask(taskId);
  };

  return (
    <div className="space-y-2">
      {tasks.map((task) => {
        const priorityColors = getPriorityColor(task.priority);
        const isCompleted = task.status === "completed";
        const hasParts = task.parts && task.parts.length > 0;
        
        return (
          <div
            key={task.id}
            onClick={() => onSelectTask(task)}
            className={cn(
              "p-4 cursor-pointer rounded-lg border transition-all",
              isCompleted 
                ? "bg-gray-50 border-gray-200" 
                : `border-l-4 ${priorityColors.border} shadow-sm hover:shadow`,
              selectedTask?.id === task.id 
                ? "ring-2 ring-blue-300"
                : ""
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-6 w-6 rounded-md mt-1",
                    isCompleted 
                      ? "bg-green-500 border-green-500 text-white" 
                      : "border-gray-300"
                  )}
                  onClick={(e) => handleCompleteTask(task.id, e)}
                  aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                >
                  {isCompleted && <Check className="h-3 w-3" />}
                </Button>
                
                <div>
                  <h4 
                    className={cn(
                      "font-medium",
                      isCompleted 
                        ? "text-gray-500 line-through" 
                        : "text-gray-900"
                    )}
                  >
                    {task.title}
                  </h4>
                  
                  <p className="text-sm text-gray-500 mt-1">
                    {isCompleted 
                      ? `Completed: ${task.completedDate}` 
                      : `Due: ${task.dueDate}`
                    }
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {task.tags.length > 0 && task.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="outline" 
                        className={cn(
                          isCompleted 
                            ? "bg-gray-100 text-gray-500 border-gray-200" 
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        )}
                      >
                        {tag}
                      </Badge>
                    ))}
                    
                    {hasParts && (
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "flex items-center gap-1",
                          isCompleted 
                            ? "bg-gray-100 text-gray-500 border-gray-200" 
                            : "bg-green-50 text-green-700 border-green-200"
                        )}
                      >
                        <ShoppingBag className="h-3 w-3" /> 
                        {task.parts?.length} {task.parts?.length === 1 ? 'part' : 'parts'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-start space-x-1">
                {hasParts && !isCompleted && (
                  <ShoppingBag className="h-4 w-4 text-green-600 mt-1" />
                )}
                
                {!isCompleted && (
                  <Flag 
                    className={cn("h-4 w-4 mt-1", priorityColors.flagColor)} 
                    fill={task.priority === "high" ? "currentColor" : "none"}
                  />
                )}
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              From: {task.source}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TasksList;
