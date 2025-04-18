import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import NotesList from "@/components/NotesList";
import NoteDetail from "@/components/NoteDetail";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { format } from "date-fns";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  timestamp: string;
  date: Date;
  category?: string;
}

const NotesPage = () => {
  useEffect(() => {
    console.log("NotesPage component mounted");
  }, []);

  const [activeTab, setActiveTab] = useState("list");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Field Observation",
      content: "Checked the North 40 field this morning. Standing water is mostly gone from the NE corner, should be ready for equipment...",
      tags: ["North 40", "Standing Water", "Equipment Readiness"],
      timestamp: "11:32 AM",
      date: new Date(2023, 5, 15),
      category: "Today"
    },
    {
      id: "2",
      title: "Price Quote",
      content: "Called AgriChem Supply about urea quote. They confirmed price of $520/ton is valid through May 15. Need to decide on ord...",
      tags: ["Price Quote", "Urea", "AgriChem"],
      timestamp: "9:45 AM",
      date: new Date(2023, 5, 15),
      category: "Today"
    },
    {
      id: "3",
      title: "Equipment Maintenance",
      content: "Seeder needs new parts before planting season. Called dealer for pricing on replacement wear parts - $450 for full set. ...",
      tags: ["Seeder", "Maintenance"],
      timestamp: "2:15 PM",
      date: new Date(2023, 5, 14),
      category: "Yesterday"
    },
    {
      id: "4",
      title: "Meeting Notes",
      content: "Met with Prairie AG rep about fertilizer availability. They're expecting shipment next week. Should call to confirm befo...",
      tags: ["Fertilizer", "Prairie AG", "Follow up"],
      timestamp: "10:30 AM",
      date: new Date(2023, 5, 14),
      category: "Yesterday"
    },
    {
      id: "5",
      title: "Soil Test Results",
      content: "Soil test results for South Quarter came back. Will need to adjust phosphorus application rate - higher than expected. R...",
      tags: ["South Quarter", "Soil Test", "Phosphorus"],
      timestamp: "3:45 PM",
      date: new Date(2023, 5, 12),
      category: "This Week"
    }
  ]);

  const allTags = Array.from(
    new Set(
      notes.flatMap(note => note.tags)
    )
  );

  const createNote = () => {
    setSelectedNote(null);
    
    setTimeout(() => {
      const now = new Date();
      const newNote = {
        id: Date.now().toString(),
        title: "",
        content: "",
        tags: [],
        timestamp: format(now, "h:mm a"),
        date: now,
        category: "Today"
      };
      
      setNotes([newNote, ...notes]);
      setSelectedNote(newNote);
      
      toast({
        title: "Note Created",
        description: "A new note has been created",
      });
    }, 50);
  };

  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  const filteredNotes = searchQuery 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : notes;

  return (
    <div className="flex min-h-screen bg-white">
      <SidebarProvider>
        <NoteSidebar />
        
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <div className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded-md">
                BizzyPerson
              </div>
              <div className="text-xl font-semibold ml-2 text-gray-700">Notes</div>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <div className="w-1/3 border-r flex flex-col">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Notes</h2>
                
                <div className="flex items-center justify-between mb-4">
                  <Tabs defaultValue="list" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="list">List</TabsTrigger>
                      <TabsTrigger value="calendar">Calendar</TabsTrigger>
                      <TabsTrigger value="tags">Tags</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button 
                    size="icon" 
                    className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full" 
                    onClick={createNote}
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search notes..."
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <select className="p-2 border rounded-md text-sm">
                    <option>Newest first</option>
                    <option>Oldest first</option>
                    <option>Alphabetical</option>
                  </select>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <NotesList 
                  notes={filteredNotes} 
                  selectedNote={selectedNote} 
                  onSelectNote={setSelectedNote}
                />
              </div>
            </div>
            
            <div className="w-2/3">
              {selectedNote ? (
                <NoteDetail 
                  note={selectedNote}
                  onUpdateNote={(updatedNote) => {
                    setNotes(notes.map(note => 
                      note.id === updatedNote.id ? updatedNote : note
                    ));
                    setSelectedNote(updatedNote);
                  }}
                  onDeleteNote={deleteNote}
                  allTags={allTags}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-xl font-medium mb-2">No note selected</p>
                  <p className="text-sm text-gray-400 mb-6">Select a note or create a new one</p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white" 
                    onClick={createNote}
                  >
                    Create Note
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t p-2 text-sm text-gray-500 flex justify-end">
            <div>
              <span className="font-medium">Action Log:</span> 
              <span className="ml-2">Navigated to Notes</span>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default NotesPage;
