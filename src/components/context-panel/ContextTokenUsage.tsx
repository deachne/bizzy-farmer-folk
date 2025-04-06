
import { ChevronDown } from "lucide-react";

const ContextTokenUsage = () => {
  return (
    <div className="border-t p-3 bg-white">
      <div className="flex items-center justify-between mb-1">
        <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
          <span>TOKEN USAGE</span>
          <ChevronDown className="h-4 w-4 ml-1" />
        </button>
        <span className="text-xs text-gray-500">Est. Cost: $55.7050</span>
      </div>
      
      <div className="text-xs text-gray-500 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-2 w-20 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "30%" }}></div>
          </div>
          <span className="ml-2">6,110 / 200,000 tokens</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <div>
            <span className="text-xs text-gray-400">Input</span>
            <div className="font-medium">3,250</div>
          </div>
          <div>
            <span className="text-xs text-gray-400">Output</span>
            <div className="font-medium">2,860</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextTokenUsage;
