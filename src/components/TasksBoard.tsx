
import { Task } from "@/pages/TasksPage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Flag, Plus, X } from "lucide-react";
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
  const fieldTasks = tasks.filter(task => task.status === "field-tasks");
  const partsListTasks = tasks.filter(task => task.status === "parts-list");
  const inProgressTasks = tasks.filter(task => task.status === "in-progress");
  const completedTasks = tasks.filter(task => task.status === "completed");

  // Status config for coloring the boards
  const getStatusConfig = (status: string) => {
    switch(status) {
      case "field-tasks":
        return {
          title: "Field Tasks",
          badge: "bg-green-50 text-green-700",
        };
      case "parts-list":
        return {
          title: "Parts List",
          badge: "bg-orange-50 text-orange-700",
        };
      case "in-progress":
        return {
          title: "In Progress",
          badge: "bg-yellow-50 text-yellow-700",
        };
      case "completed":
        return {
          title: "Completed",
          badge: "bg-gray-50 text-gray-700",
        };
      default: // todo
        return {
          title: "To Do",
          badge: "bg-blue-50 text-blue-700",
        };
    }
  };

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

  // Handle task deletion
  const handleDeleteTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selection of the task
    // We need to pass this event up to the parent component
    // First we need to add this to props
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
          
          <div className="flex items-start gap-1">
            {!isCompleted && (
              <Flag 
                className={cn("h-4 w-4", priorityColors.flagColor)} 
                fill={task.priority === "high" ? "currentColor" : "none"}
              />
            )}
          </div>
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
          
          <div className="flex items-center gap-1">
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
      </div>
    );
  };

  // Board rendering
  const renderBoard = (title: string, tasksToRender: Task[], badgeClass: string, showAddButton: boolean = false) => (
    <div className="bg-gray-50 rounded-lg p-3 min-h-[300px] w-full">
      <div className="text-sm font-medium mb-3 flex justify-between items-center">
        <div className="flex items-center">
          <Badge variant="outline" className={`${badgeClass} mr-2`}>
            {tasksToRender.length}
          </Badge>
          <h3>{title}</h3>
        </div>
        {showAddButton && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0" 
            onClick={createTask}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {tasksToRender.map(renderTaskCard)}
      </div>
    </div>
  );

  // Column styles
  const columnClasses = "bg-gray-50 rounded-lg p-3 min-h-[300px] w-full";

  return (
    <div className="grid grid-cols-5 gap-4 h-full overflow-auto pb-4">
      {/* To Do Column */}
      {renderBoard(
        getStatusConfig("todo").title, 
        todoTasks, 
        getStatusConfig("todo").badge, 
        true
      )}

      {/* Field Tasks Column */}
      {renderBoard(
        getStatusConfig("field-tasks").title, 
        fieldTasks, 
        getStatusConfig("field-tasks").badge
      )}

      {/* Parts List Column */}
      {renderBoard(
        getStatusConfig("parts-list").title, 
        partsListTasks, 
        getStatusConfig("parts-list").badge
      )}

      {/* In Progress Column */}
      {renderBoard(
        getStatusConfig("in-progress").title, 
        inProgressTasks, 
        getStatusConfig("in-progress").badge
      )}

      {/* Completed Column */}
      {renderBoard(
        getStatusConfig("completed").title, 
        completedTasks, 
        getStatusConfig("completed").badge
      )}
    </div>
  );
};

export default TasksBoard;
