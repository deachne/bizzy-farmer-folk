
import { Document } from "@/types/documents";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { FileText, File, Image, Table, Text } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentsListProps {
  documents: Document[];
  selectedDocument: Document | null;
  onSelectDocument: (document: Document) => void;
}

const DocumentsList = ({ documents, selectedDocument, onSelectDocument }: DocumentsListProps) => {
  const getDocumentIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type === "pdf") return <FileText className="h-6 w-6 text-red-500" />;
    if (type === "doc" || type === "docx") return <Text className="h-6 w-6 text-blue-500" />;
    if (type === "img" || type === "jpg" || type === "jpeg" || type === "png") return <Image className="h-6 w-6 text-green-500" />;
    if (type === "xls" || type === "xlsx" || type === "csv") return <Table className="h-6 w-6 text-emerald-500" />;
    return <File className="h-6 w-6 text-gray-500" />;
  };

  const getIconBackground = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (type === "pdf") return "bg-red-50";
    if (type === "doc" || type === "docx") return "bg-blue-50";
    if (type === "img" || type === "jpg" || type === "jpeg" || type === "png") return "bg-green-50";
    if (type === "xls" || type === "xlsx" || type === "csv") return "bg-emerald-50";
    return "bg-gray-50";
  };

  const getCategory = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, "MMM d");
    }
  };

  // Group documents by category
  const groupedDocuments: Record<string, Document[]> = {};
  
  documents.forEach(doc => {
    const category = doc.category || getCategory(doc.dateAdded);
    if (!groupedDocuments[category]) {
      groupedDocuments[category] = [];
    }
    groupedDocuments[category].push(doc);
  });

  return (
    <div className="pb-4">
      {Object.entries(groupedDocuments).map(([category, docs]) => (
        <div key={category} className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 px-4 py-2">{category}</h3>
          
          {docs.map(document => (
            <div 
              key={document.id}
              className={cn(
                "flex items-start p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors",
                selectedDocument?.id === document.id ? "bg-blue-50" : ""
              )}
              onClick={() => onSelectDocument(document)}
            >
              <div className={cn("flex items-center justify-center h-12 w-12 rounded-lg mr-4", getIconBackground(document.fileType))}>
                {getDocumentIcon(document.fileType)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-gray-900 truncate mb-1">{document.title}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{document.size}</span>
                  <span className="mx-2">•</span>
                  <span>
                    {document.inKnowledgeBase 
                      ? "Added to Knowledge Base" 
                      : "Not in Knowledge Base"}
                  </span>
                </div>
                
                {document.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {document.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-right text-sm text-gray-500 min-w-[80px]">
                {format(document.dateAdded, "h:mm a")}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DocumentsList;
