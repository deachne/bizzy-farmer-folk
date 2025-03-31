
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Task } from "@/pages/TasksPage";

interface TaskNotesProps {
  task: Task;
  notes: string;
  onUpdateTask: (task: Task) => void;
}

const TaskNotes = ({ task, notes, onUpdateTask }: TaskNotesProps) => {
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    
    // Always update parent component
    const updatedTask = {
      ...task,
      notes: newNotes,
    };
    onUpdateTask(updatedTask);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Notes</span>
      </div>
      
      <Textarea
        value={notes}
        onChange={handleNotesChange}
        className="min-h-[100px] text-sm"
        placeholder="Add notes about this task..."
      />
    </div>
  );
};

export default TaskNotes;
