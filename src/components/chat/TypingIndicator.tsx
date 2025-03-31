
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const TypingIndicator = () => {
  return (
    <div className="rounded-lg p-4 bg-white border border-blue-100 animate-pulse">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <Avatar>
            <div className="text-white font-medium">AI</div>
          </Avatar>
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-900">Claude</div>
            <div className="text-sm text-gray-500">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                Typing...
              </Badge>
            </div>
          </div>
          
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
