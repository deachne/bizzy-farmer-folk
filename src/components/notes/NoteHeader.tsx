
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Share, Archive, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Note } from "@/pages/NotesPage";
import { formatDate } from "./utils/noteUtils";

interface NoteHeaderProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote?: (id: string) => void;
}

const NoteHeader = ({ note, onUpdateNote, onDeleteNote }: NoteHeaderProps) => {
  const [title, setTitle] = useState(note.title);
  const [isTitleEmpty, setIsTitleEmpty] = useState(note.title === "");
  
  useEffect(() => {
    setTitle(note.title);
    setIsTitleEmpty(note.title === "");
  }, [note.id, note.title]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setIsTitleEmpty(newTitle === "");
    const now = new Date();
    onUpdateNote({
      ...note,
      title: newTitle,
      timestamp: formatDate(now, "h:mm a"),
      date: now
    });
  };
  
  const handleTitleFocus = () => {
    if (title === "New Note") {
      setTitle("");
      setIsTitleEmpty(true);
      const now = new Date();
      onUpdateNote({
        ...note,
        title: "",
        timestamp: formatDate(now, "h:mm a"),
        date: now
      });
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
  
  return (
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
  );
};

export default NoteHeader;
