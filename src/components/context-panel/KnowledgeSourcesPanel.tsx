
import { useState } from "react";
import { FileText, Book, Globe, ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import KnowledgeSourceItem from "./KnowledgeSourceItem";
import type { KnowledgeSource } from "./KnowledgeSourceItem";

interface KnowledgeSourcesPanelProps {
  sources: KnowledgeSource[];
  onToggleSource: (id: string) => void;
}

const KnowledgeSourcesPanel = ({ sources, onToggleSource }: KnowledgeSourcesPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const getIconForSourceType = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="h-4 w-4 text-gray-500 mr-2" />;
      case "document":
        return <Book className="h-4 w-4 text-gray-500 mr-2" />;
      case "web":
        return <Globe className="h-4 w-4 text-gray-500 mr-2" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500 mr-2" />;
    }
  };

  const notesSources = sources.filter(source => source.type === "note");
  const documentSources = sources.filter(source => source.type === "document");
  const webSources = sources.filter(source => source.type === "web");

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-500">KNOWLEDGE SOURCES</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="p-0 h-7 w-7">
              <ChevronRight className={cn(
                "h-4 w-4 transition-transform",
                isOpen && "rotate-90"
              )} />
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="space-y-4">
          {/* Notes */}
          {notesSources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Your Notes</h4>
              {notesSources.map(source => (
                <KnowledgeSourceItem 
                  key={source.id}
                  source={source} 
                  onToggle={onToggleSource}
                  icon={getIconForSourceType(source.type)}
                />
              ))}
            </div>
          )}
          
          {/* Knowledge Base */}
          {documentSources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Crop Knowledge Base</h4>
              {documentSources.map(source => (
                <KnowledgeSourceItem 
                  key={source.id}
                  source={source} 
                  onToggle={onToggleSource}
                  icon={getIconForSourceType(source.type)}
                />
              ))}
            </div>
          )}
          
          {/* Web Sources */}
          {webSources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Web Sources</h4>
              {webSources.map(source => (
                <KnowledgeSourceItem 
                  key={source.id}
                  source={source} 
                  onToggle={onToggleSource}
                  icon={getIconForSourceType(source.type)}
                />
              ))}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default KnowledgeSourcesPanel;
