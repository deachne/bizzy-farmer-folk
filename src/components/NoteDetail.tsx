import { useState, useRef, useEffect } from "react";
import { Note } from "@/pages/NotesPage";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X, Tag, Trash2, Archive, Share, Bold, Italic, Underline, List, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import Markdown from "markdown-to-jsx";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
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
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface NoteDetailProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote?: (id: string) => void;
  allTags?: string[];
}

const NoteDetail = ({ note, onUpdateNote, onDeleteNote, allTags = [] }: NoteDetailProps) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tagInput, setTagInput] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(note.title === "");
  const [tagsOpen, setTagsOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const availableTags = Array.from(new Set([...allTags, ...note.tags]));
  
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setIsTitleEmpty(note.title === "");
  }, [note.id, note.title, note.content]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setIsTitleEmpty(newTitle === "");
    onUpdateNote({
      ...note,
      title: newTitle,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  };
  
  const handleTitleFocus = () => {
    if (title === "New Note") {
      setTitle("");
      setIsTitleEmpty(true);
      onUpdateNote({
        ...note,
        title: "",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
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
      setTagsOpen(false);
    }
  };
  
  const selectTag = (tag: string) => {
    if (!note.tags.includes(tag)) {
      const updatedNote = {
        ...note,
        tags: [...note.tags, tag],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      onUpdateNote(updatedNote);
      setTagInput("");
      setTagsOpen(false);
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
    let cursorPosition = start;
    
    switch (format) {
      case "Bold":
        if (selectedText) {
          const newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
          setContent(newText);
          cursorPosition = end + 4;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        } else {
          const newText = content.substring(0, start) + '****' + content.substring(end);
          setContent(newText);
          cursorPosition = start + 2;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        }
        break;
        
      case "Italic":
        if (selectedText) {
          const newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
          setContent(newText);
          cursorPosition = end + 2;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        } else {
          const newText = content.substring(0, start) + '**' + content.substring(end);
          setContent(newText);
          cursorPosition = start + 1;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        }
        break;
        
      case "Underline":
        if (selectedText) {
          const newText = content.substring(0, start) + `__${selectedText}__` + content.substring(end);
          setContent(newText);
          cursorPosition = end + 4;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        } else {
          const newText = content.substring(0, start) + '____' + content.substring(end);
          setContent(newText);
          cursorPosition = start + 2;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        }
        break;
        
      case "List":
        if (selectedText) {
          const formattedSelection = selectedText
            .split('\n')
            .map(line => line.trim() ? `- ${line}` : line)
            .join('\n');
            
          const newText = content.substring(0, start) + formattedSelection + content.substring(end);
          setContent(newText);
          cursorPosition = start + formattedSelection.length;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          });
          
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(cursorPosition, cursorPosition);
          }, 0);
        } else {
          const beforeCursor = content.substring(0, start);
          const afterCursor = content.substring(start);
          const lastNewlineBeforeCursor = beforeCursor.lastIndexOf('\n');
          const startOfLine = lastNewlineBeforeCursor === -1 ? 0 : lastNewlineBeforeCursor + 1;
          const currentLine = beforeCursor.substring(startOfLine);
          
          if (!currentLine.trim().startsWith('-')) {
            const newText = beforeCursor.substring(0, startOfLine) + '- ' + beforeCursor.substring(startOfLine) + afterCursor;
            setContent(newText);
            cursorPosition = start + 2;
            
            onUpdateNote({
              ...note,
              content: newText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
            
            setTimeout(() => {
              textarea.focus();
              textarea.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
          }
        }
        break;
        
      default:
        return;
    }
    
    toast({
      title: "Text formatting",
      description: `${format} formatting applied`
    });
  };

  const MarkdownParagraph = ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 break-words" {...props}>{children}</p>
  );

  const MarkdownH1 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold mb-4" {...props}>{children}</h1>
  );

  const MarkdownH2 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mb-3" {...props}>{children}</h2>
  );

  const MarkdownH3 = ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-bold mb-2" {...props}>{children}</h3>
  );

  const MarkdownUl = ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 mb-4" {...props}>{children}</ul>
  );

  const MarkdownOl = ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 mb-4" {...props}>{children}</ol>
  );

  const MarkdownLi = ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1" {...props}>{children}</li>
  );

  const MarkdownA = ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-blue-600 hover:underline" {...props}>{children}</a>
  );

  const MarkdownBlockquote = ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props}>{children}</blockquote>
  );

  const MarkdownHr = (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 border-t border-gray-300" {...props} />
  );

  const markdownOptions = {
    overrides: {
      p: { component: MarkdownParagraph },
      h1: { component: MarkdownH1 },
      h2: { component: MarkdownH2 },
      h3: { component: MarkdownH3 },
      ul: { component: MarkdownUl },
      ol: { component: MarkdownOl },
      li: { component: MarkdownLi },
      a: { component: MarkdownA },
      blockquote: { component: MarkdownBlockquote },
      hr: { component: MarkdownHr },
    },
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <Input
          value={title}
          onChange={handleTitleChange}
          onFocus={handleTitleFocus}
          className={cn(
            "text-2xl font-semibold px-3 py-2 border border-gray-300 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 flex-1 mr-4",
            isTitleEmpty && "text-gray-400"
          )}
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
          <Markdown options={markdownOptions}>
            {content}
          </Markdown>
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
