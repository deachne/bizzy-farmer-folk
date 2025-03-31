import { useState, useEffect, useRef } from "react";
import { Task } from "@/pages/TasksPage";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
  const [isTitleEmpty, setIsTitleEmpty] = useState(task.title === "");
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState(task.priority);
  const [notes, setNotes] = useState(task.notes || "");
  const [tagInput, setTagInput] = useState("");
  const [isEditing, setIsEditing] = useState(task.title === "New Task");
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagOptions] = useState([
    "Equipment", "Urgent", "North Field", "East Field", "South Field", 
    "Supplies", "Pricing", "Maintenance", "Planting", "Harvest"
  ]);
  
  // Update state when task changes
  useEffect(() => {
    setTitle(task.title);
    setIsTitleEmpty(task.title === "");
    setDescription(task.description);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setNotes(task.notes || "");
    setIsEditing(task.title === "New Task");
  }, [task]);

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
    const newTitle = e.target.value;
    setTitle(newTitle);
    setIsTitleEmpty(newTitle === "");
    
    // Update task in parent component immediately
    const updatedTask = {
      ...task,
      title: newTitle,
    };
    onUpdateTask(updatedTask);
  };

  const handleTitleFocus = () => {
    if (title === "New Task") {
      setTitle("");
      setIsTitleEmpty(true);
      const updatedTask = {
        ...task,
        title: "",
      };
      onUpdateTask(updatedTask);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    
    // Always update parent component, regardless of edit mode
    const updatedTask = {
      ...task,
      description: newDescription,
    };
    onUpdateTask(updatedTask);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    
    // Always update parent component, regardless of edit mode
    const updatedTask = {
      ...task,
      notes: newNotes,
    };
    onUpdateTask(updatedTask);
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

  const addTagFromDropdown = (tag: string) => {
    if (!task.tags.includes(tag)) {
      const updatedTask = {
        ...task,
        tags: [...task.tags, tag],
      };
      onUpdateTask(updatedTask);
    }
    setTagDropdownOpen(false);
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
    // For new tasks, we're already in edit mode, so clicking "Save" should just exit edit mode
    // without any additional save action (since we're saving on every input change)
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
    setPriorityOpen(false);
    
    // Always update parent component, regardless of edit mode
    const updatedTask = {
      ...task,
      priority: newPriority
    };
    onUpdateTask(updatedTask);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDueDate = e.target.value;
    setDueDate(newDueDate);
    
    // Always update parent component, regardless of edit mode
    const updatedTask = {
      ...task,
      dueDate: newDueDate
    };
    onUpdateTask(updatedTask);
  };

  // Filter tag options to only show tags that aren't already added
  const availableTags = tagOptions.filter(tag => !task.tags.includes(tag));

  return (
    <div className="h-full flex flex-col overflow-y-auto p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Task Details</h2>
        
        <Input
          value={title}
          onChange={handleTitleChange}
          onFocus={handleTitleFocus}
          className={`text-xl font-medium mb-4 ${isTitleEmpty ? "text-gray-400" : ""}`}
          placeholder="Task title"
        />
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
            {statusConfig.label}
          </div>
          
          <Popover open={priorityOpen} onOpenChange={setPriorityOpen}>
            <PopoverTrigger asChild>
              <div 
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${priorityConfig.bg} ${priorityConfig.text}`}
              >
                {priorityConfig.icon}
                {priorityConfig.label}
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto z-50 bg-white" align="start">
              <div className="py-1">
                <div 
                  className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePriorityChange("high")}
                >
                  <Flag className="h-4 w-4 text-red-500" fill="currentColor" />
                  <span>High</span>
                </div>
                <div 
                  className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePriorityChange("medium")}
                >
                  <Flag className="h-4 w-4 text-yellow-500" />
                  <span>Medium</span>
                </div>
                <div 
                  className="flex items-center gap-1 px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handlePriorityChange("normal")}
                >
                  <Flag className="h-4 w-4 text-green-500" />
                  <span>Normal</span>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        
        <Textarea
          value={description}
          onChange={handleDescriptionChange}
          className="mb-4"
          placeholder="Task description"
        />
      </div>
      
      {/* Metadata */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-2">
          <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
          <div className="w-full">
            <p className="text-sm font-medium text-gray-700">Due Date</p>
            <Input
              type="text"
              value={dueDate}
              onChange={handleDueDateChange}
              className="mt-1"
            />
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
              <button 
                onClick={() => removeTag(tag)}
                className="text-blue-400 hover:text-blue-700"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Popover open={tagDropdownOpen} onOpenChange={setTagDropdownOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-sm h-8 border-dashed border-gray-300"
                disabled={availableTags.length === 0}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add tag
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-auto z-50 bg-white" align="start">
              <div className="py-1 max-h-40 overflow-y-auto">
                {availableTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => addTagFromDropdown(tag)}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="flex-1 flex">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Custom tag..."
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
        </div>
      </div>
      
      {/* Notes */}
      <div className="mb-6 flex-1">
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
