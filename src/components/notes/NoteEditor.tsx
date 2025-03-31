
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Note } from "@/pages/NotesPage";
import TextFormatToolbar from "./TextFormatToolbar";
import MarkdownRenderer from "./MarkdownRenderer";
import { formatDate } from "./utils/noteUtils";
import { toast } from "@/components/ui/use-toast";

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
}

const NoteEditor = ({ note, onUpdateNote }: NoteEditorProps) => {
  const [content, setContent] = useState(note.content);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setContent(note.content);
  }, [note.id, note.content]);
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    const now = new Date();
    onUpdateNote({
      ...note,
      content: e.target.value,
      timestamp: formatDate(now, "h:mm a"),
      date: now
    });
  };
  
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };
  
  const applyFormatting = (formatType: string) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    let cursorPosition = start;
    
    switch (formatType) {
      case "Bold":
        if (selectedText) {
          const newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
          setContent(newText);
          cursorPosition = end + 4;
          
          onUpdateNote({
            ...note,
            content: newText,
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
            timestamp: formatDate(new Date(), "h:mm a"),
            date: new Date()
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
              timestamp: formatDate(new Date(), "h:mm a"),
              date: new Date()
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
      description: `${formatType} formatting applied`
    });
  };
  
  return (
    <>
      <TextFormatToolbar
        onFormat={applyFormatting}
        isPreview={isPreview}
        onTogglePreview={togglePreview}
      />
      
      {isPreview ? (
        <MarkdownRenderer content={content} />
      ) : (
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className="flex-1 resize-none border-none focus:outline-none text-gray-700 text-base p-1 bg-gray-50 rounded-md font-mono"
          placeholder="Start writing your note here..."
        />
      )}
    </>
  );
};

export default NoteEditor;
