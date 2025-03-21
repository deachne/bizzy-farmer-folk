
import { useState } from "react";
import { Note } from "@/pages/NotesPage";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X, Tag } from "lucide-react";

interface NoteDetailProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
}

const NoteDetail = ({ note, onUpdateNote }: NoteDetailProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tagInput, setTagInput] = useState("");
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onUpdateNote({
      ...note,
      title: e.target.value,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    onUpdateNote({
      ...note,
      content: e.target.value,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };
  
  const addTag = () => {
    if (tagInput.trim() && !note.tags.includes(tagInput.trim())) {
      const updatedNote = {
        ...note,
        tags: [...note.tags, tagInput.trim()],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onUpdateNote(updatedNote);
      setTagInput("");
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    const updatedNote = {
      ...note,
      tags: note.tags.filter(tag => tag !== tagToRemove),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onUpdateNote(updatedNote);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTag();
    }
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <Input
        value={title}
        onChange={handleTitleChange}
        className="text-2xl font-semibold border-none px-0 focus-visible:ring-0 mb-6"
        placeholder="Note title"
      />
      
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
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add tag..."
            className="text-sm h-8 w-36 border-dashed border-gray-300"
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
      
      <textarea
        value={content}
        onChange={handleContentChange}
        className="flex-1 resize-none border-none focus:outline-none text-gray-700 text-base p-1 bg-gray-50 rounded-md"
        placeholder="Start writing your note here..."
      />
      
      <div className="mt-4 text-sm text-gray-500 text-right flex items-center justify-end">
        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
          Last updated: {note.timestamp}
        </span>
      </div>
    </div>
  );
};

export default NoteDetail;
