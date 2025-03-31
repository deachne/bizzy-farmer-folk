
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/pages/TasksPage";

interface TaskDescriptionProps {
  task: Task;
  description: string;
  onUpdateTask: (task: Task) => void;
}

const TaskDescription = ({ 
  task, 
  description, 
  onUpdateTask 
}: TaskDescriptionProps) => {
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    
    // Always update parent component
    const updatedTask = {
      ...task,
      description: newDescription,
    };
    onUpdateTask(updatedTask);
  };

  return (
    <Textarea
      value={description}
      onChange={handleDescriptionChange}
      className="mb-4"
      placeholder="Task description"
    />
  );
};

export default TaskDescription;
