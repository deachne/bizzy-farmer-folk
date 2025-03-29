
import { useState } from "react";
import { Task } from "@/pages/TasksPage";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Flag, 
  Calendar, 
  Tag, 
  Plus, 
  X, 
  Edit2, 
  Trash2, 
  Check, 
  Link 
} from "lucide-react";

interface TaskDetailProps {
  task: Task;
  onUpdateTask: (task: Task) => void;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskDetail = ({ 
  task, 
  onUpdateTask, 
  onCompleteTask, 
  onDeleteTask 
}: TaskDetailProps) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [notes, setNotes] = useState(task.notes || "");
  const [tagInput, setTagInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Define status colors and labels
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { 
          bg: "bg-gray-100", 
          text: "text-gray-700",
          label: "Completed"
        };
      case "in-progress":
        return { 
          bg: "bg-yellow-50", 
          text: "text-yellow-700",
          label: "In Progress"
        };
      default:
        return { 
          bg: "bg-blue-50", 
          text: "text-blue-700",
          label: "To Do"
        };
    }
  };

  // Define priority colors and labels
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "high":
        return { 
          bg: "bg-red-50", 
          text: "text-red-700",
          label: "High",
          icon: <Flag className="h-4 w-4 text-red-500" fill="currentColor" />
        };
      case "medium":
        return { 
          bg: "bg-yellow-50", 
          text: "text-yellow-700",
          label: "Medium",
          icon: <Flag className="h-4 w-4 text-yellow-500" />
        };
      default:
        return { 
          bg: "bg-green-50", 
          text: "text-green-700",
          label: "Normal",
          icon: <Flag className="h-4 w-4 text-green-500" />
        };
    }
  };

  const statusConfig = getStatusConfig(task.status);
  const priorityConfig = getPriorityConfig(priority);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !task.tags.includes(tagInput.trim())) {
      const updatedTask = {
        ...task,
        tags: [...task.tags, tagInput.trim()],
      };
      onUpdateTask(updatedTask);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTask = {
      ...task,
      tags: task.tags.filter(tag => tag !== tagToRemove),
    };
    onUpdateTask(updatedTask);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Save changes
      const updatedTask = {
        ...task,
        title,
        description,
        dueDate,
        priority: priority as "high" | "medium" | "normal",
        notes
      };
      onUpdateTask(updatedTask);
    }
    setIsEditing(!isEditing);
  };

  const handleComplete = () => {
    onCompleteTask(task.id);
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
  };

  const handlePriorityChange = (newPriority: "high" | "medium" | "normal") => {
    setPriority(newPriority);
    if (!isEditing) {
      const updatedTask = {
        ...task,
        priority: newPriority
      };
      onUpdateTask(updatedTask);
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Task Details</h2>
        
        {isEditing ? (
          <Input
            value={title}
            onChange={handleTitleChange}
            className="text-xl font-medium mb-4"
          />
        ) : (
          <h3 className="text-xl font-medium mb-4 break-words">{task.title}</h3>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
            {statusConfig.label}
          </div>
          
          <div className="relative">
            <div 
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${priorityConfig.bg} ${priorityConfig.text}`}
              onClick={() => !isEditing && setIsEditing(true)}
            >
              {priorityConfig.icon}
              {priorityConfig.label}
            </div>
            
            {isEditing && (
              <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md border z-10">
                <div 
                  className="flex items-center gap-1 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b"
                  onClick={() => handlePriorityChange("high")}
                >
                  <Flag className="h-4 w-4 text-red-500" fill="currentColor" />
                  <span>High</span>
                </div>
                <div 
                  className="flex items-center gap-1 px-3 py-2 hover:bg-gray-50 cursor-pointer border-b"
                  onClick={() => handlePriorityChange("medium")}
                >
                  <Flag className="h-4 w-4 text-yellow-500" />
                  <span>Medium</span>
                </div>
                <div 
                  className="flex items-center gap-1 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePriorityChange("normal")}
                >
                  <Flag className="h-4 w-4 text-green-500" />
                  <span>Normal</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <Textarea
            value={description}
            onChange={handleDescriptionChange}
            className="mb-4"
            placeholder="Task description"
          />
        ) : (
          task.description && (
            <p className="text-sm text-gray-600 mb-4">{task.description}</p>
          )
        )}
      </div>
      
      {/* Metadata */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-2">
          <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-gray-700">Due Date</p>
            {isEditing ? (
              <Input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1"
              />
            ) : (
              <p className="text-sm text-gray-600">{task.dueDate}</p>
            )}
          </div>
        </div>
        
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
      </div>
      
      {/* Tags */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Tag className="h-4 w-4 text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700">Tags</span>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {task.tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1"
            >
              {tag}
              {isEditing && (
                <button 
                  onClick={() => removeTag(tag)}
                  className="text-blue-400 hover:text-blue-700"
                  aria-label={`Remove ${tag} tag`}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
        
        {isEditing && (
          <div className="flex mt-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add tag..."
              className="text-sm h-8 border-dashed border-gray-300"
            />
            <Button 
              size="sm" 
              variant="ghost" 
              className="ml-1 h-8"
              onClick={addTag}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Notes */}
      <div className="mb-6 flex-1">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Notes</span>
        </div>
        
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={handleNotesChange}
            className="min-h-[100px] text-sm"
            placeholder="Add notes about this task..."
          />
        ) : (
          <div className="bg-gray-50 p-3 rounded-md border text-sm text-gray-600 min-h-[100px]">
            {notes || "No notes added yet."}
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2 mt-auto pt-4 border-t">
        {task.status !== "completed" ? (
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleComplete}
          >
            <Check className="h-4 w-4 mr-2" />
            Complete
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="text-blue-600 border-blue-200"
            onClick={handleComplete}
          >
            <Check className="h-4 w-4 mr-2" />
            Completed
          </Button>
        )}
        
        <Button 
          variant="outline"
          onClick={toggleEdit}
        >
          {isEditing ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="h-4 w-4 mr-2" />
              Edit
            </>
          )}
        </Button>
        
        <Button 
          variant="outline"
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
};

export default TaskDetail;
