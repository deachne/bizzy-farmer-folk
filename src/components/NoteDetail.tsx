import { useState, useRef, useEffect } from "react";
import { Note } from "@/pages/NotesPage";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X, Tag, Trash2, Archive, Share, Bold, Italic, Underline, List } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface NoteDetailProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote?: (id: string) => void;
}

const NoteDetail = ({ note, onUpdateNote, onDeleteNote }: NoteDetailProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tagInput, setTagInput] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
  }, [note.id, note.title, note.content]);
  
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

  const handleDeleteNote = () => {
    if (onDeleteNote) {
      onDeleteNote(note.id);
      toast({
        title: "Note deleted",
        description: "Your note has been deleted"
      });
    }
  };

  const handleArchiveNote = () => {
    toast({
      title: "Note archived",
      description: "Your note has been archived"
    });
  };

  const handleShareNote = () => {
    toast({
      title: "Share link copied",
      description: "Share link has been copied to clipboard"
    });
  };

  const applyFormatting = (format: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newStart = start;
    let newEnd = end;
    
    switch (format) {
      case "Bold":
        if (selectedText) {
          formattedText = `**${selectedText}**`;
          newStart = start;
          newEnd = end + 4; // Account for the added ** markers
        } else {
          formattedText = '****';
          newStart = start + 2;
          newEnd = start + 2;
        }
        break;
      case "Italic":
        if (selectedText) {
          formattedText = `*${selectedText}*`;
          newStart = start;
          newEnd = end + 2; // Account for the added * markers
        } else {
          formattedText = '**';
          newStart = start + 1;
          newEnd = start + 1;
        }
        break;
      case "Underline":
        if (selectedText) {
          formattedText = `<u>${selectedText}</u>`;
          newStart = start;
          newEnd = end + 7; // Account for the added <u></u> tags
        } else {
          formattedText = '<u></u>';
          newStart = start + 3;
          newEnd = start + 3;
        }
        break;
      case "List":
        if (selectedText) {
          formattedText = selectedText
            .split('\n')
            .map(line => `- ${line}`)
            .join('\n');
          newStart = start;
          newEnd = start + formattedText.length;
        } else {
          formattedText = '- ';
          newStart = start + 2;
          newEnd = start + 2;
        }
        break;
      default:
        return;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    onUpdateNote({
      ...note,
      content: newContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
    
    toast({
      title: "Text formatting",
      description: `${format} formatting applied`
    });
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <Input
          value={title}
          onChange={handleTitleChange}
          className="text-2xl font-semibold border-none px-0 focus-visible:ring-0 flex-1 mr-4"
          placeholder="Note title"
        />
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShareNote}
            title="Share note"
          >
            <Share className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleArchiveNote}
            title="Archive note"
          >
            <Archive className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleDeleteNote}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
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
      
      <div className="mb-4 border-b pb-2 flex justify-between">
        <div className="flex">
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-md h-8"
            onClick={() => applyFormatting("Bold")}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-md h-8"
            onClick={() => applyFormatting("Italic")}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-md h-8"
            onClick={() => applyFormatting("Underline")}
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-md h-8"
            onClick={() => applyFormatting("List")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsPreview(!isPreview)}
          className="text-xs"
        >
          {isPreview ? "Edit" : "Preview"}
        </Button>
      </div>
      
      {isPreview ? (
        <div className="flex-1 overflow-y-auto p-4 prose prose-sm max-w-none bg-gray-50 rounded-md">
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="break-words">
            {content}
          </ReactMarkdown>
        </div>
      ) : (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className="flex-1 resize-none border-none focus:outline-none text-gray-700 text-base p-1 bg-gray-50 rounded-md font-mono"
          placeholder="Start writing your note here..."
        />
      )}
      
      <div className="mt-4 text-sm text-gray-500 text-right flex items-center justify-end">
        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
          Last updated: {note.timestamp}
        </span>
      </div>
    </div>
  );
};

export default NoteDetail;
