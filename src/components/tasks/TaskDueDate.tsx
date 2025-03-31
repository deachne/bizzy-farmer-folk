
import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Task } from "@/pages/TasksPage";

interface TaskDueDateProps {
  task: Task;
  dueDate: string;
  dueDateObj: Date | undefined;
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  onUpdateTask: (task: Task) => void;
}

const TaskDueDate = ({ 
  task, 
  dueDate, 
  dueDateObj, 
  calendarOpen, 
  setCalendarOpen,
  onUpdateTask 
}: TaskDueDateProps) => {
  const handleCalendarSelect = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, 'MMMM d, yyyy');
      setCalendarOpen(false);

      // Always update parent component
      const updatedTask = {
        ...task,
        dueDate: formattedDate
      };
      onUpdateTask(updatedTask);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
      <div className="w-full">
        <p className="text-sm font-medium text-gray-700">Due Date</p>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-start text-left font-normal mt-1 ${!dueDateObj ? "text-gray-500" : ""}`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dueDate || "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              mode="single"
              selected={dueDateObj}
              onSelect={handleCalendarSelect}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TaskDueDate;
