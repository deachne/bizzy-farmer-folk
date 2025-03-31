
import React from "react";
import { Input } from "@/components/ui/input";
import { Task } from "@/pages/TasksPage";

interface TaskTitleInputProps {
  task: Task;
  title: string;
  isTitleEmpty: boolean;
  onUpdateTask: (task: Task) => void;
}

const TaskTitleInput = ({ 
  task, 
  title, 
  isTitleEmpty, 
  onUpdateTask 
}: TaskTitleInputProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    
    // Update task in parent component immediately
    const updatedTask = {
      ...task,
      title: newTitle,
    };
    onUpdateTask(updatedTask);
  };

  const handleTitleFocus = () => {
    if (title === "New Task") {
      const updatedTask = {
        ...task,
        title: "",
      };
      onUpdateTask(updatedTask);
    }
  };

  return (
    <Input
      value={title}
      onChange={handleTitleChange}
      onFocus={handleTitleFocus}
      className={`text-xl font-medium mb-4 ${isTitleEmpty ? "text-gray-400" : ""}`}
      placeholder="Task title"
    />
  );
};

export default TaskTitleInput;
