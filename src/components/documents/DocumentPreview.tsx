
import { Document } from "@/types/documents";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { FileText, Download, Plus, Check, Text, Table, X, Tag } from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DocumentPreviewProps {
  document: Document;
  onUpdateDocument?: (document: Document) => void;
}

const DocumentPreview = ({ document, onUpdateDocument }: DocumentPreviewProps) => {
  const [tagInput, setTagInput] = useState("");
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [tagOptions] = useState([
    "Soil Test", "Field Report", "Equipment", "Pricing", "Crop", 
    "Budget", "North Field", "East Field", "South Field", "Fertilizer"
  ]);
  
  const addTag = (tag: string) => {
    if (onUpdateDocument && !document.tags.includes(tag)) {
      const updatedDocument = {
        ...document,
        tags: [...document.tags, tag],
      };
      onUpdateDocument(updatedDocument);
    }
    setTagDropdownOpen(false);
  };

  const removeTag = (tagToRemove: string) => {
    if (onUpdateDocument) {
      const updatedDocument = {
        ...document,
        tags: document.tags.filter(tag => tag !== tagToRemove),
      };
      onUpdateDocument(updatedDocument);
    }
  };

  // Filter tag options to only show tags that aren't already added
  const availableTags = tagOptions.filter(tag => !document.tags.includes(tag));

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium mb-1">Document Preview</h2>
        
        <div className="mt-8 flex flex-col items-center justify-center">
          {document.fileType === "pdf" && (
            <div className="mb-4 text-center">
              <FileText className="h-20 w-20 text-red-500 mx-auto mb-2" />
              <p className="text-lg font-medium">PDF Preview</p>
            </div>
          )}
          
          {document.fileType === "img" && (
            <div className="mb-4 w-full px-8">
              <img 
                src="/lovable-uploads/901f29ac-8d84-4d0b-9b3b-ce1bca14b145.png" 
                alt={document.title}
                className="w-full h-auto object-contain rounded-lg border"
              />
            </div>
          )}
          
          {(document.fileType === "doc" || document.fileType === "docx") && (
            <div className="mb-4 text-center">
              <Text className="h-20 w-20 text-blue-500 mx-auto mb-2" />
              <p className="text-lg font-medium">Document Preview</p>
            </div>
          )}
          
          {(document.fileType === "xls" || document.fileType === "xlsx") && (
            <div className="mb-4 text-center">
              <Table className="h-20 w-20 text-emerald-500 mx-auto mb-2" />
              <p className="text-lg font-medium">Spreadsheet Preview</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-6">
          <h3 className="text-base font-medium mb-2">File Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500">File name:</span>
              <span className="font-medium text-right">{document.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">File size:</span>
              <span>{document.size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Uploaded:</span>
              <span>{format(document.dateAdded, "MMMM d, yyyy h:mm a")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Type:</span>
              <span>{document.fileType.toUpperCase()} Document</span>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-base font-medium mb-2">Knowledge Base</h3>
          <div className="p-3 bg-green-50 rounded-md border border-green-200 flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-green-700">Added to Knowledge Base</span>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-base font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {document.tags.map(tag => (
              <Badge key={tag} className="bg-black text-white flex items-center gap-1">
                {tag}
                {onUpdateDocument && (
                  <button 
                    onClick={() => removeTag(tag)}
                    className="text-white/70 hover:text-white ml-1"
                    aria-label={`Remove ${tag} tag`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
            
            <Popover open={tagDropdownOpen} onOpenChange={setTagDropdownOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="rounded-full">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add tag
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 w-[200px]" align="start">
                <div className="py-1 max-h-[200px] overflow-y-auto">
                  {availableTags.length > 0 ? (
                    availableTags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer"
                        onClick={() => addTag(tag)}
                      >
                        <Tag className="h-4 w-4 mr-2 text-gray-500" />
                        {tag}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">
                      All available tags have been added
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      
      <div className="border-t p-4 flex justify-between">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Open
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
};

export default DocumentPreview;
