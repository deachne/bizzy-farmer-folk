
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tag, Plus, X, ChevronDown } from "lucide-react";
import { Note } from "@/pages/NotesPage";
import { formatDate } from "./utils/noteUtils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface TagManagerProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  allTags?: string[];
}

const TagManager = ({ note, onUpdateNote, allTags = [] }: TagManagerProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tagsOpen, setTagsOpen] = useState(false);
  
  const availableTags = Array.from(new Set([...allTags, ...note.tags]));
  
  const addTag = () => {
    if (tagInput.trim() && !note.tags.includes(tagInput.trim())) {
      const now = new Date();
      const updatedNote = {
        ...note,
        tags: [...note.tags, tagInput.trim()],
        timestamp: formatDate(now, "h:mm a"),
        date: now
      };
      onUpdateNote(updatedNote);
      setTagInput("");
      setTagsOpen(false);
    }
  };
  
  const selectTag = (tag: string) => {
    if (!note.tags.includes(tag)) {
      const now = new Date();
      const updatedNote = {
        ...note,
        tags: [...note.tags, tag],
        timestamp: formatDate(now, "h:mm a"),
        date: now
      };
      onUpdateNote(updatedNote);
      setTagInput("");
      setTagsOpen(false);
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const now = new Date();
    const updatedNote = {
      ...note,
      tags: note.tags.filter(tag => tag !== tagToRemove),
      timestamp: formatDate(now, "h:mm a"),
      date: now
    };
    onUpdateNote(updatedNote);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };
  
  return (
    <div className="mb-6 flex flex-wrap gap-2 items-center">
      <div className="flex items-center mr-2">
        <Tag className="h-4 w-4 text-gray-400 mr-1" />
        <span className="text-sm text-gray-500">Tags:</span>
      </div>
      
      {note.tags.map((tag, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 px-2 py-1"
        >
          {tag}
          <button 
            onClick={() => removeTag(tag)}
            className="text-blue-400 hover:text-blue-700 ml-1"
            aria-label={`Remove ${tag} tag`}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      
      <div className="flex">
        <Popover open={tagsOpen} onOpenChange={setTagsOpen}>
          <PopoverTrigger asChild>
            <div className="flex relative">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tag..."
                className="text-sm h-8 w-36 border-dashed border-gray-300 pr-8"
              />
              <Button 
                size="sm" 
                variant="ghost" 
                className="absolute right-0 top-0 h-8 w-8"
                type="button"
              >
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-0 w-36" align="start">
            <Command>
              <CommandInput placeholder="Search tags..." className="h-8" />
              <CommandList>
                <CommandEmpty>No tags found</CommandEmpty>
                <CommandGroup>
                  {availableTags
                    .filter(tag => !note.tags.includes(tag))
                    .filter(tag => tag.toLowerCase().includes(tagInput.toLowerCase()))
                    .map(tag => (
                      <CommandItem 
                        key={tag} 
                        onSelect={() => selectTag(tag)}
                        className="text-sm py-1 cursor-pointer"
                      >
                        {tag}
                      </CommandItem>
                    ))}
                  {tagInput.trim() && !availableTags.includes(tagInput.trim()) && !note.tags.includes(tagInput.trim()) && (
                    <CommandItem 
                      onSelect={() => addTag()}
                      className="text-sm py-1 cursor-pointer font-medium"
                    >
                      Add "{tagInput.trim()}"
                    </CommandItem>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
  );
};

export default TagManager;
