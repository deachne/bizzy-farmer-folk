
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContextPanelHeaderProps {
  isRefreshing: boolean;
  onRefresh: () => void;
}

const ContextPanelHeader = ({ isRefreshing, onRefresh }: ContextPanelHeaderProps) => {
  return (
    <div className="p-4 border-b flex items-center justify-between">
      <h2 className="font-semibold text-gray-900">Context</h2>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw className={cn(
          "h-4 w-4 mr-1",
          isRefreshing && "animate-spin"
        )} />
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
};

export default ContextPanelHeader;
