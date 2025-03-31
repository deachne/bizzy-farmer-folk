
import { Note } from "@/pages/NotesPage";
import { formatDate } from "./utils/noteUtils";

interface NoteFooterProps {
  note: Note;
}

const NoteFooter = ({ note }: NoteFooterProps) => {
  return (
    <div className="mt-4 text-sm text-gray-500 text-right flex items-center justify-end">
      <span className="bg-gray-100 px-2 py-1 rounded text-xs">
        Last updated: {formatDate(note.date, "MMM d, yyyy")} at {note.timestamp}
      </span>
    </div>
  );
};

export default NoteFooter;
