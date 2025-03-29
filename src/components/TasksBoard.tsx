
import { Task } from "@/pages/TasksPage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Flag, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TasksBoardProps {
  tasks: Task[];
  selectedTask: Task | null;
  onSelectTask: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  createTask: () => void;
}

const TasksBoard = ({ 
  tasks, 
  selectedTask, 
  onSelectTask, 
  onCompleteTask,
  createTask
}: TasksBoardProps) => {
  // Get tasks by status
  const todoTasks = tasks.filter(task => task.status === "todo");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const completedTasks = tasks.filter(task => task.status === "completed");

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

  // Render a task card for the board
  const renderTaskCard = (task: Task) => {
    const priorityColors = getPriorityColor(task.priority);
    const isCompleted = task.status === "completed";
    
    return (
      <div 
        key={task.id}
        onClick={() => onSelectTask(task)}
        className={cn(
          "mb-3 p-3 cursor-pointer rounded-lg transition-all",
          isCompleted 
            ? "bg-gray-50 border-gray-200 border" 
            : `border-l-4 ${priorityColors.border} shadow-sm hover:shadow bg-white border border-gray-200`,
          selectedTask?.id === task.id 
            ? "ring-2 ring-blue-300"
            : ""
        )}
      >
        <div className="flex justify-between items-start">
          <div>
            <h4 
              className={cn(
                "font-medium text-sm",
                isCompleted 
                  ? "text-gray-500 line-through" 
                  : "text-gray-900"
              )}
            >
              {task.title}
            </h4>
            
            <p className="text-xs text-gray-500 mt-1">
              {isCompleted 
                ? `Completed: ${task.completedDate}` 
                : `Due: ${task.dueDate}`
              }
            </p>
          </div>
          
          {!isCompleted && (
            <Flag 
              className={cn("h-4 w-4", priorityColors.flagColor)} 
              fill={task.priority === "high" ? "currentColor" : "none"}
            />
          )}
        </div>
        
        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className={cn(
                  "text-xs py-0 px-2",
                  isCompleted 
                    ? "bg-gray-100 text-gray-500 border-gray-200" 
                    : "bg-blue-50 text-blue-700 border-blue-200"
                )}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-2">
          <div className="text-xs text-gray-500">
            {task.source}
          </div>
          
          {!isCompleted && (
            <Button
              variant="outline"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={(e) => handleCompleteTask(task.id, e)}
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  // Column styles
  const columnClasses = "bg-gray-50 rounded-lg p-3 min-h-[300px] w-full";
  const columnHeaderClasses = "text-sm font-medium mb-3 flex justify-between items-center";

  return (
    <div className="grid grid-cols-3 gap-4 h-full overflow-auto pb-4">
      {/* To Do Column */}
      <div className={columnClasses}>
        <div className={columnHeaderClasses}>
          <div className="flex items-center">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 mr-2">
              {todoTasks.length}
            </Badge>
            <h3>To Do</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={createTask}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {todoTasks.map(renderTaskCard)}
        </div>
      </div>

      {/* In Progress Column */}
      <div className={columnClasses}>
        <div className={columnHeaderClasses}>
          <div className="flex items-center">
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 mr-2">
              {inProgressTasks.length}
            </Badge>
            <h3>In Progress</h3>
          </div>
        </div>
        <div className="space-y-2">
          {inProgressTasks.map(renderTaskCard)}
        </div>
      </div>

      {/* Completed Column */}
      <div className={columnClasses}>
        <div className={columnHeaderClasses}>
          <div className="flex items-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 mr-2">
              {completedTasks.length}
            </Badge>
            <h3>Completed</h3>
          </div>
        </div>
        <div className="space-y-2">
          {completedTasks.map(renderTaskCard)}
        </div>
      </div>
    </div>
  );
};

export default TasksBoard;
