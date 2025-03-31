
import React from "react";
import { Link } from "lucide-react";
import { Task } from "@/pages/TasksPage";

interface TaskSourceProps {
  task: Task;
}

const TaskSource = ({ task }: TaskSourceProps) => {
  return (
    <div className="flex items-start gap-2">
      <Link className="h-5 w-5 text-gray-400 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-gray-700">Source</p>
        <p className="text-sm text-gray-600">{task.source}</p>
        {task.sourceText && (
          <p className="text-sm text-blue-600 mt-1 italic">"{task.sourceText}"</p>
        )}
      </div>
    </div>
  );
};

export default TaskSource;
