
import { Check, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface KnowledgeSource {
  id: string;
  type: "note" | "document" | "web";
  title: string;
  active: boolean;
  source?: string;
}

interface KnowledgeSourceItemProps {
  source: KnowledgeSource;
  onToggle: (id: string) => void;
  icon: React.ReactNode;
}

const KnowledgeSourceItem = ({ source, onToggle, icon }: KnowledgeSourceItemProps) => {
  return (
    <div 
      key={source.id}
      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
    >
      <div className="flex items-center">
        {icon}
        <span className="text-sm">{source.title}</span>
        {source.source && (
          <span className="text-xs text-gray-500 ml-1">({source.source})</span>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "p-0 h-6 w-6",
          source.active ? "text-green-600" : "text-gray-400"
        )}
        onClick={() => onToggle(source.id)}
      >
        <Check className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default KnowledgeSourceItem;
