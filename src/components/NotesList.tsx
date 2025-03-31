import { Note } from "@/pages/NotesPage";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { FileText, FolderOpen } from "lucide-react";
import { format } from "date-fns";

interface NotesListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
}

const NotesList = ({ notes, selectedNote, onSelectNote }: NotesListProps) => {
  // Group notes by category
  const groupedNotes = notes.reduce((acc, note) => {
    const category = note.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(note);
    return acc;
  }, {} as Record<string, Note[]>);

  // Sort categories to ensure Today, Yesterday, This Week order
  const categoryOrder = ["Today", "Yesterday", "This Week", "Uncategorized"];
  const sortedCategories = Object.keys(groupedNotes).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  return (
    <div className="divide-y">
      {sortedCategories.length > 0 ? (
        sortedCategories.map((category) => (
          <div key={category} className="pb-4">
            <h3 className="text-sm font-medium text-gray-500 px-4 py-2">{category}</h3>
            <div className="space-y-2 px-3">
              {groupedNotes[category].map((note) => (
                <div
                  key={note.id}
                  onClick={() => onSelectNote(note)}
                  className={cn(
                    "px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg border border-gray-300",
                    selectedNote?.id === note.id 
                      ? "bg-blue-50 border-l-4 border-blue-600 shadow-sm" 
                      : "hover:shadow-sm"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-gray-900">
                      {note.title || <span className="text-gray-400">Untitled Note</span>}
                    </h4>
                    <div className="text-xs text-gray-500 ml-2 text-right">
                      <div>{format(note.date, "MMM d, yyyy")}</div>
                      <div>{note.timestamp}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{note.content}</p>
                  
                  {note.tags && note.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <FolderOpen className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-xl font-medium mb-2">No notes found</p>
          <p className="text-sm text-gray-400">Create your first note to get started</p>
        </div>
      )}
    </div>
  );
};

export default NotesList;
