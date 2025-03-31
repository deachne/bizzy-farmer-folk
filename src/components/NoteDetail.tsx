
import { Note } from "@/pages/NotesPage";
import NoteHeader from "./notes/NoteHeader";
import TagManager from "./notes/TagManager";
import NoteEditor from "./notes/NoteEditor";
import NoteFooter from "./notes/NoteFooter";

interface NoteDetailProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
  onDeleteNote?: (id: string) => void;
  allTags?: string[];
}

const NoteDetail = ({ note, onUpdateNote, onDeleteNote, allTags = [] }: NoteDetailProps) => {
  return (
    <div className="h-full flex flex-col p-6 bg-white">
      <NoteHeader 
        note={note}
        onUpdateNote={onUpdateNote}
        onDeleteNote={onDeleteNote}
      />
      
      <TagManager
        note={note}
        onUpdateNote={onUpdateNote}
        allTags={allTags}
      />
      
      <NoteEditor
        note={note}
        onUpdateNote={onUpdateNote}
      />
      
      <NoteFooter note={note} />
    </div>
  );
};

export default NoteDetail;
