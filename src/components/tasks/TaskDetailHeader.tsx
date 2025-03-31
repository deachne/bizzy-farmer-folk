
import React from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/pages/TasksPage";
import { X, Check, Trash2 } from "lucide-react";

interface TaskDetailHeaderProps {
  task: Task;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onClose?: () => void;
}

const TaskDetailHeader = ({ 
  task, 
  onCompleteTask, 
  onDeleteTask,
  onClose 
}: TaskDetailHeaderProps) => {
  const handleComplete = () => {
    onCompleteTask(task.id);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="p-4 border-b bg-white sticky top-0 z-10 flex items-center justify-between relative">
      <h2 className="text-lg font-semibold">Task Details</h2>
      <div className="flex items-center space-x-4">
        <Button 
          size="sm"
          variant={task.status !== "completed" ? "default" : "outline"}
          onClick={handleComplete}
        >
          <Check className="h-4 w-4 mr-1" />
          {task.status !== "completed" ? "Complete" : "Reopen"}
        </Button>
        
        <Button 
          size="sm"
          variant="outline"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>

      {onClose && (
        <Button
          variant="default"
          className="absolute top-2 right-2 bg-green-600 hover:bg-green-700 text-white w-10 h-10 p-0 rounded-md"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default TaskDetailHeader;
