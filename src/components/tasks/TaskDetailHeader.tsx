
import React from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/pages/TasksPage";
import { Check, Trash2 } from "lucide-react";

interface TaskDetailHeaderProps {
  task: Task;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskDetailHeader = ({ 
  task, 
  onCompleteTask, 
  onDeleteTask 
}: TaskDetailHeaderProps) => {
  const handleComplete = () => {
    onCompleteTask(task.id);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  return (
    <div className="p-4 border-b bg-white sticky top-0 z-10">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">Task Details</h2>
        <div className="flex space-x-2">
          {task.status !== "completed" ? (
            <Button 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleComplete}
            >
              <Check className="h-4 w-4 mr-1" />
              Complete
            </Button>
          ) : (
            <Button 
              size="sm"
              variant="outline"
              className="text-blue-600 border-blue-200"
              onClick={handleComplete}
            >
              <Check className="h-4 w-4 mr-1" />
              Mark Incomplete
            </Button>
          )}
          
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
      </div>
    </div>
  );
};

export default TaskDetailHeader;
