import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import NoteSidebar from "@/components/NoteSidebar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, Check, FileText, File, Image, Table, Text, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DocumentsList from "@/components/documents/DocumentsList";
import DocumentPreview from "@/components/documents/DocumentPreview";
import DocumentUploadDialog from "@/components/documents/DocumentUploadDialog";
import { Document } from "@/types/documents";

const DocumentsPage = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("Recent first");
  const [filterBy, setFilterBy] = useState("In Knowledge Base: All");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: "Soil Test Report - North Field.pdf",
      fileType: "pdf",
      size: "2.4 MB",
      dateAdded: new Date(2025, 2, 28, 16, 43),
      inKnowledgeBase: true,
      tags: ["Soil Test", "North Field"],
      category: "Today"
    },
    {
      id: "2",
      title: "Urea Price Quotes - March 2025.docx",
      fileType: "doc",
      size: "342 KB",
      dateAdded: new Date(2025, 2, 28, 14, 18),
      inKnowledgeBase: true,
      tags: ["Pricing", "Fertilizer"],
      category: "Today"
    },
    {
      id: "3",
      title: "Corn Growth Stage V4.jpg",
      fileType: "img",
      size: "1.2 MB",
      dateAdded: new Date(2025, 2, 28, 11, 32),
      inKnowledgeBase: true,
      tags: ["Crop", "Corn"],
      category: "Today"
    },
    {
      id: "4",
      title: "2025 Crop Planning Budget.xlsx",
      fileType: "xls",
      size: "546 KB",
      dateAdded: new Date(2025, 2, 27, 9, 15),
      inKnowledgeBase: false,
      tags: ["Budget", "Planning"],
      category: "Yesterday"
    }
  ]);

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  const filterDocumentsByType = () => {
    if (selectedTab === "All") return documents;
    
    const typeMap: Record<string, string[]> = {
      "PDFs": ["pdf"],
      "Images": ["img", "jpg", "jpeg", "png", "gif"],
      "Spreadsheets": ["xls", "xlsx", "csv"],
      "Text": ["doc", "docx", "txt", "rtf"],
      "Other": ["other"]
    };
    
    return documents.filter(doc => 
      typeMap[selectedTab]?.some(type => doc.fileType.toLowerCase().includes(type.toLowerCase()))
    );
  };

  const filterDocumentsBySearch = (docs: Document[]) => {
    if (!searchQuery) return docs;
    return docs.filter(doc => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const updateDocument = (updatedDocument: Document) => {
    setDocuments(prevDocuments => 
      prevDocuments.map(doc => 
        doc.id === updatedDocument.id ? updatedDocument : doc
      )
    );
    setSelectedDocument(updatedDocument);
  };

  const addDocument = (newDocument: Document) => {
    setDocuments(prevDocuments => [newDocument, ...prevDocuments]);
    setSelectedDocument(newDocument);
  };

  const filteredDocuments = filterDocumentsBySearch(filterDocumentsByType());

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
              <div className="text-xl font-semibold ml-2 text-gray-700">Documents</div>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <div className="w-2/3 border-r flex flex-col">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Documents</h2>
                
                <Tabs defaultValue="All" className="w-full" onValueChange={handleTabChange}>
                  <TabsList className="flex w-full h-10 mb-4 space-x-1 bg-white border-b">
                    <TabsTrigger value="All" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="PDFs" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                      PDFs
                    </TabsTrigger>
                    <TabsTrigger value="Images" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="Spreadsheets" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                      Spreadsheets
                    </TabsTrigger>
                    <TabsTrigger value="Text" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="Other" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none">
                      Other
                    </TabsTrigger>
                    <div className="flex-grow"></div>
                    <Button 
                      size="icon" 
                      className="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                      onClick={() => setIsUploadDialogOpen(true)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </TabsList>
                </Tabs>
                
                <div className="mb-4">
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center border rounded-md px-3 py-2 text-sm">
                    <span>{sortOrder}</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </div>
                  
                  <div className="flex items-center border rounded-md px-3 py-2 text-sm">
                    <span>{filterBy}</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <DocumentsList 
                  documents={filteredDocuments}
                  selectedDocument={selectedDocument}
                  onSelectDocument={setSelectedDocument}
                />
              </div>
            </div>
            
            <div className="w-1/3">
              {selectedDocument ? (
                <DocumentPreview 
                  document={selectedDocument} 
                  onUpdateDocument={updateDocument}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-xl font-medium mb-2">No document selected</p>
                  <p className="text-sm text-gray-400 mb-6">Select a document to preview</p>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    Upload Document
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t p-2 text-sm text-gray-500 flex justify-end">
            <div>
              <span className="font-medium">Action Log:</span> 
              <span className="ml-2">Navigated to Documents</span>
            </div>
          </div>
        </div>
      </SidebarProvider>
      
      <DocumentUploadDialog 
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onAddDocument={addDocument}
      />
    </div>
  );
};

export default DocumentsPage;
