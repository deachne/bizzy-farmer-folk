import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Save, Copy, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Artifact } from "@/pages/ChatPage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface ArtifactPanelProps {
  isOpen: boolean;
  onClose: () => void;
  artifacts: Artifact[];
  initialArtifactIndex?: number;
}

const ArtifactPanel = ({ 
  isOpen, 
  onClose, 
  artifacts,
  initialArtifactIndex = 0
}: ArtifactPanelProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialArtifactIndex);
  const [minimized, setMinimized] = useState(false);
  const isMobile = useIsMobile();
  
  const currentArtifact = artifacts[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      } else if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (e.key === "ArrowRight" && currentIndex < artifacts.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, currentIndex, artifacts.length]);

  useEffect(() => {
    // When artifacts change, reset minimized state
    if (isOpen) {
      setMinimized(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Set the initial artifact index when opening panel
    if (isOpen && initialArtifactIndex !== undefined) {
      setCurrentIndex(initialArtifactIndex);
    }
  }, [isOpen, initialArtifactIndex]);

  const handleSaveArtifact = () => {
    toast({
      title: "Artifact Saved",
      description: "Artifact has been saved to your notes",
      duration: 3000,
    });
  };

  const handleCopyArtifact = () => {
    // Implementation depends on artifact type
    toast({
      title: "Copied to Clipboard",
      description: "Artifact content has been copied to clipboard",
      duration: 3000,
    });
  };

  const handleDownloadArtifact = () => {
    // Implementation depends on artifact type
    toast({
      title: "Download Started",
      description: "Artifact download has begun",
      duration: 3000,
    });
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  if (!isOpen || artifacts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Semi-transparent overlay for non-mobile */}
      {!isMobile && !minimized && (
        <div 
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Minimized indicator */}
      {minimized && (
        <div 
          className="fixed right-0 bottom-20 bg-primary text-white p-2 rounded-l-md cursor-pointer z-50 animate-slide-in-right"
          onClick={toggleMinimize}
        >
          <ChevronLeft className="h-5 w-5" />
        </div>
      )}
      
      {/* Artifact panel */}
      <div 
        className={cn(
          "fixed z-50 bg-white border-l shadow-xl transition-all duration-300 ease-in-out",
          minimized 
            ? "right-[-100%]" 
            : "right-0",
          isMobile 
            ? "inset-y-0 w-full" 
            : "inset-y-0 w-[400px]"
        )}
      >
        {/* Header */}
        <div className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold truncate max-w-[200px]">
              {currentArtifact?.title || `${currentArtifact?.type.charAt(0).toUpperCase() + currentArtifact?.type.slice(1)}`}
            </h3>
            <Badge variant="outline" className="ml-2">
              {currentIndex + 1}/{artifacts.length}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1">
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={toggleMinimize}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Navigation */}
        {artifacts.length > 1 && (
          <div className="border-b py-2 px-4 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentIndex(i => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentIndex(i => Math.min(artifacts.length - 1, i + 1))}
              disabled={currentIndex === artifacts.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
        
        {/* Content */}
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="p-4">
            {currentArtifact?.type === "table" && (
              <div className="border rounded-md overflow-hidden">
                {currentArtifact.title && (
                  <div className="bg-gray-50 p-3 font-medium text-gray-700 border-b">
                    {currentArtifact.title}
                  </div>
                )}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {currentArtifact.content.headers && (
                        <tr className="bg-gray-50 border-b">
                          {currentArtifact.content.headers.map((header: string, i: number) => (
                            <th key={i} className="p-3 text-left font-medium">{header}</th>
                          ))}
                        </tr>
                      )}
                      {currentArtifact.content.rows.map((row: string[], i: number) => (
                        <tr key={i} className="border-b">
                          {row.map((cell, j) => (
                            <td 
                              key={`${i}-${j}`} 
                              className={cn(
                                "p-3",
                                j === 0 && "font-medium bg-gray-50"
                              )}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {currentArtifact?.type === "chart" && (
              <div className="p-4 border rounded-md">
                <div className="text-center font-medium mb-2">{currentArtifact.title}</div>
                <div className="bg-gray-100 h-60 flex items-center justify-center">
                  [Chart Visualization]
                </div>
              </div>
            )}
            
            {currentArtifact?.type === "image" && (
              <div className="border rounded-md overflow-hidden">
                <div className="text-center font-medium mb-2 p-2">{currentArtifact.title}</div>
                <img 
                  src={typeof currentArtifact.content === 'string' ? currentArtifact.content : ''}
                  alt={currentArtifact.title || "Image"} 
                  className="max-w-full"
                />
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Actions footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-white">
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleSaveArtifact}>
              <Save className="h-4 w-4 mr-2" />
              Save to Notes
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyArtifact}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownloadArtifact}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtifactPanel;
