
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, File, Link, FileText, Globe, Youtube, ClipboardCopy } from "lucide-react";
import { Document } from "@/types/documents";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDocument?: (document: Document) => void;
}

const DocumentUploadDialog = ({ open, onOpenChange, onAddDocument }: DocumentUploadDialogProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [activeSection, setActiveSection] = useState<"file" | "drive" | "link" | "text" | null>(null);
  const { toast } = useToast();
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  
  const handleDragLeave = () => {
    setDragOver(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    // Handle file upload
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };
  
  const handleFileUpload = (file: File) => {
    // Create a document based on the file
    const fileType = getFileType(file.name);
    const fileSize = formatFileSize(file.size);
    
    if (onAddDocument) {
      const newDocument: Document = {
        id: Date.now().toString(),
        title: file.name,
        fileType,
        size: fileSize,
        dateAdded: new Date(),
        inKnowledgeBase: true,
        tags: [],
      };
      
      onAddDocument(newDocument);
      toast({
        title: "File uploaded",
        description: `${file.name} has been added to your documents.`,
      });
      resetState();
    }
  };

  const handleGoogleDocsClick = () => {
    setActiveSection("drive");
    toast({
      title: "Google Docs",
      description: "Connect your Google account to import documents.",
    });
  };

  const handleGoogleSlidesClick = () => {
    setActiveSection("drive");
    toast({
      title: "Google Slides",
      description: "Connect your Google account to import presentations.",
    });
  };

  const handleWebsiteClick = () => {
    setActiveSection("link");
    toast({
      title: "Website",
      description: "Enter a URL to import content from a website.",
    });
  };

  const handleYoutubeClick = () => {
    setActiveSection("link");
    toast({
      title: "YouTube",
      description: "Enter a YouTube URL to import video content.",
    });
  };

  const handleTextClick = () => {
    setActiveSection("text");
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      if (onAddDocument) {
        const newDocument: Document = {
          id: Date.now().toString(),
          title: `Text note - ${new Date().toLocaleString()}`,
          fileType: "txt",
          size: formatFileSize(textInput.length),
          dateAdded: new Date(),
          inKnowledgeBase: true,
          tags: ["Text"],
          content: textInput,
        };
        
        onAddDocument(newDocument);
        toast({
          title: "Text added",
          description: "Your text note has been added to documents.",
        });
        resetState();
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter some text content.",
        variant: "destructive",
      });
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      if (onAddDocument) {
        const isYoutube = urlInput.includes("youtube.com") || urlInput.includes("youtu.be");
        const fileType = isYoutube ? "youtube" : "url";
        const title = isYoutube ? `YouTube Video - ${new Date().toLocaleString()}` : `Website - ${new Date().toLocaleString()}`;
        
        const newDocument: Document = {
          id: Date.now().toString(),
          title: title,
          fileType: fileType,
          size: "N/A",
          dateAdded: new Date(),
          inKnowledgeBase: true,
          tags: [isYoutube ? "YouTube" : "Website"],
          content: urlInput,
        };
        
        onAddDocument(newDocument);
        toast({
          title: isYoutube ? "YouTube video added" : "Website added",
          description: `${isYoutube ? "Video" : "Website"} has been added to your documents.`,
        });
        resetState();
      }
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid URL.",
        variant: "destructive",
      });
    }
  };

  const resetState = () => {
    setActiveSection(null);
    setTextInput("");
    setUrlInput("");
    onOpenChange(false);
  };
  
  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'doc';
    if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension)) return 'img';
    if (['xls', 'xlsx', 'csv'].includes(extension)) return 'xls';
    if (['txt', 'rtf'].includes(extension)) return 'txt';
    return 'other';
  };
  
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add sources</DialogTitle>
          <DialogDescription className="text-base mt-4">
            Sources let BizzyPerson base its responses on the information that matters most to you.
            <br />
            (Examples: field reports, soil tests, pricing sheets, meeting notes, sales documents, etc.)
          </DialogDescription>
        </DialogHeader>
        
        {activeSection === null && (
          <>
            <div 
              className={`mt-6 border-2 border-dashed rounded-lg p-8 text-center ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center">
                <div className="bg-blue-100 p-4 rounded-full mb-4">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Upload sources</h3>
                <p className="text-gray-600 mb-4">
                  Drag and drop or{' '}
                  <label className="text-blue-600 hover:underline cursor-pointer">
                    choose file
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.xls,.xlsx,.csv,.mp3,.mp4"
                    />
                  </label>{' '}
                  to upload
                </p>
                <p className="text-sm text-gray-500">
                  Supported file types: PDF, Doc, Images, Spreadsheets, Text files
                </p>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <File className="h-6 w-6 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">Google Drive</span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-50 text-blue-700 border-blue-200"
                      onClick={handleGoogleDocsClick}
                    >
                      <FileText className="h-4 w-4 mr-1" /> Google Docs
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-50 text-blue-700 border-blue-200"
                      onClick={handleGoogleSlidesClick}
                    >
                      <FileText className="h-4 w-4 mr-1" /> Google Slides
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <Link className="h-6 w-6 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">Link</span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-50 text-blue-700 border-blue-200"
                      onClick={handleWebsiteClick}
                    >
                      <Globe className="h-4 w-4 mr-1" /> Website
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-50 text-blue-700 border-blue-200"
                      onClick={handleYoutubeClick}
                    >
                      <Youtube className="h-4 w-4 mr-1" /> YouTube
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <ClipboardCopy className="h-6 w-6 text-gray-600 mb-2" />
                  <span className="text-sm font-medium">Paste text</span>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-50 text-blue-700 border-blue-200"
                      onClick={handleTextClick}
                    >
                      <FileText className="h-4 w-4 mr-1" /> Copied text
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === "text" && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Paste your text</h3>
            <textarea
              className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste or type your text here..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            ></textarea>
          </div>
        )}

        {activeSection === "link" && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Enter URL</h3>
            <input
              type="url"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>
        )}

        {activeSection === "drive" && (
          <div className="mt-6 text-center p-8">
            <div className="bg-blue-50 rounded-lg p-8 mb-4">
              <File className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Connect Google Drive</h3>
              <p className="text-gray-600 mb-6">
                Connect your Google account to access your documents and slides.
              </p>
              <Button>
                Connect Google Drive
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex items-center text-sm text-gray-500">
          <File className="h-4 w-4 mr-2" />
          <span>Source limit: 87/300</span>
          <div className="ml-2 flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full w-[30%]"></div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button variant="outline" className="mr-2" onClick={() => setActiveSection(null)}>Cancel</Button>
          </DialogClose>
          {activeSection === "text" ? (
            <Button onClick={handleTextSubmit}>Add Text</Button>
          ) : activeSection === "link" ? (
            <Button onClick={handleUrlSubmit}>Add URL</Button>
          ) : activeSection === "drive" ? (
            <Button disabled>Connect Account</Button>
          ) : (
            <Button onClick={() => onOpenChange(false)}>Upload</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
