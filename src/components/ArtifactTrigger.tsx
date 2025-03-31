import { useState } from "react";
import { FileBox, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Artifact } from "@/types/chat";
import { Badge } from "@/components/ui/badge";

interface ArtifactTriggerProps {
  artifacts: Artifact[];
  onViewInPanel: (artifactIndex: number) => void;
  expanded?: boolean;
}

const ArtifactTrigger = ({ 
  artifacts, 
  onViewInPanel,
  expanded = false
}: ArtifactTriggerProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  
  if (!artifacts || artifacts.length === 0) {
    return null;
  }

  const handleViewArtifact = (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    onViewInPanel(index);
  };

  return (
    <div className="mt-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <FileBox className="h-4 w-4 text-blue-600" />
          <span>Artifacts</span>
          <Badge variant="secondary" className="ml-1 bg-blue-100">
            {artifacts.length}
          </Badge>
          {isExpanded ? (
            <ChevronUp className="h-3 w-3 ml-1" />
          ) : (
            <ChevronDown className="h-3 w-3 ml-1" />
          )}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="mt-2 grid gap-2">
          {artifacts.map((artifact, index) => (
            <div 
              key={artifact.id} 
              className="border rounded-md p-3 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={(e) => handleViewArtifact(index, e)}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">
                  {artifact.title || `${artifact.type.charAt(0).toUpperCase() + artifact.type.slice(1)}`}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2"
                  onClick={(e) => handleViewArtifact(index, e)}
                >
                  View
                </Button>
              </div>
              
              {artifact.type === "table" && (
                <div className="mt-2 border rounded overflow-hidden max-h-24">
                  <div className="overflow-hidden text-xs text-gray-500 opacity-70">
                    <table className="w-full">
                      <tbody>
                        {artifact.content.rows.slice(0, 2).map((row: string[], i: number) => (
                          <tr key={i} className="border-b last:border-b-0">
                            {row.slice(0, 2).map((cell, j) => (
                              <td key={`${i}-${j}`} className="p-1 truncate max-w-[100px]">{cell}</td>
                            ))}
                            {row.length > 2 && <td className="p-1">...</td>}
                          </tr>
                        ))}
                        {artifact.content.rows.length > 2 && (
                          <tr>
                            <td colSpan={3} className="p-1 text-center">...</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {artifact.type === "image" && (
                <div className="mt-2 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  [Image Preview]
                </div>
              )}
              
              {artifact.type === "chart" && (
                <div className="mt-2 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  [Chart Preview]
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArtifactTrigger;
