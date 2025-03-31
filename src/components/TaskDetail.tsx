
import React, { useState, useEffect } from "react";
import { Task } from "@/pages/TasksPage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { parse, isValid } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import TaskDetailHeader from "./tasks/TaskDetailHeader";
import TaskTitleInput from "./tasks/TaskTitleInput";
import TaskStatusBadges from "./tasks/TaskStatusBadges";
import TaskDescription from "./tasks/TaskDescription";
import TaskDueDate from "./tasks/TaskDueDate";
import TaskSource from "./tasks/TaskSource";
import TaskTags from "./tasks/TaskTags";
import TaskNotes from "./tasks/TaskNotes";

interface TaskDetailProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onClose?: () => void;
}

const TaskDetail = ({ 
  task, 
  onUpdateTask, 
  onCompleteTask, 
  onDeleteTask,
  onClose 
}: TaskDetailProps) => {
  const [title, setTitle] = useState(task.title);
  const [isTitleEmpty, setIsTitleEmpty] = useState(task.title === "");
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [dueDateObj, setDueDateObj] = useState<Date | undefined>(undefined);
  const [priority, setPriority] = useState(task.priority);
  const [notes, setNotes] = useState(task.notes || "");
  const [isEditing, setIsEditing] = useState(task.title === "New Task");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  // Update state when task changes
  useEffect(() => {
    setTitle(task.title);
    setIsTitleEmpty(task.title === "");
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setNotes(task.notes || "");
    setIsEditing(task.title === "New Task");
    
    // Try to parse the due date string to a Date object
    try {
      // Try different formats
      let dateObj;
      if (task.dueDate.toLowerCase() === 'today') {
        dateObj = new Date();
      } else if (task.dueDate.toLowerCase() === 'tomorrow') {
        dateObj = new Date();
        dateObj.setDate(dateObj.getDate() + 1);
      } else {
        // Try to parse various date formats
        const formats = [
          'yyyy-MM-dd',
          'MM/dd/yyyy',
          'MMMM d, yyyy',
          'MMMM dd, yyyy',
        ];
        
        for (const formatStr of formats) {
          const parsed = parse(task.dueDate, formatStr, new Date());
          if (isValid(parsed)) {
            dateObj = parsed;
            break;
          }
        }
      }
      
      if (dateObj && isValid(dateObj)) {
        setDueDateObj(dateObj);
      } else {
        setDueDateObj(undefined);
      }
    } catch (e) {
      setDueDateObj(undefined);
    }
  }, [task]);

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      {/* Close button in top right */}
      {onClose && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 rounded-full bg-white absolute top-2 right-2 z-20"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      )}
      
      {/* Sticky header with action buttons */}
      <TaskDetailHeader 
        task={task} 
        onCompleteTask={onCompleteTask} 
        onDeleteTask={onDeleteTask} 
      />
      
      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <TaskTitleInput
            task={task}
            title={title}
            isTitleEmpty={isTitleEmpty}
            onUpdateTask={(updatedTask) => {
              onUpdateTask(updatedTask);
              setTitle(updatedTask.title);
              setIsTitleEmpty(updatedTask.title === "");
            }}
          />
          
          <TaskStatusBadges
            task={task}
            priority={priority}
            priorityOpen={priorityOpen}
            setPriorityOpen={setPriorityOpen}
            onUpdateTask={(updatedTask) => {
              onUpdateTask(updatedTask);
              if (updatedTask.priority !== priority) {
                setPriority(updatedTask.priority);
              }
            }}
          />
          
          <TaskDescription
            task={task}
            description={description}
            onUpdateTask={(updatedTask) => {
              onUpdateTask(updatedTask);
              setDescription(updatedTask.description);
            }}
          />
          
          {/* Metadata */}
          <div className="space-y-4 mb-6">
            <TaskDueDate
              task={task}
              dueDate={dueDate}
              dueDateObj={dueDateObj}
              calendarOpen={calendarOpen}
              setCalendarOpen={setCalendarOpen}
              onUpdateTask={(updatedTask) => {
                onUpdateTask(updatedTask);
                setDueDate(updatedTask.dueDate);
              }}
            />
            
            <TaskSource task={task} />
          </div>
          
          {/* Tags */}
          <TaskTags task={task} onUpdateTask={onUpdateTask} />
          
          {/* Notes */}
          <TaskNotes
            task={task}
            notes={notes}
            onUpdateTask={(updatedTask) => {
              onUpdateTask(updatedTask);
              setNotes(updatedTask.notes || "");
            }}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskDetail;
