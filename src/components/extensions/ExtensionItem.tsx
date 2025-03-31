
import React from "react";
import { File, Search, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExtensionItemProps {
  name: string;
  version: string;
  icon: React.ReactNode;
  description: string;
  hasDocumentAccess: boolean;
  hasSearchAccess: boolean;
  hasNetworkAccess: boolean;
}

const ExtensionItem: React.FC<ExtensionItemProps> = ({
  name,
  version,
  icon,
  description,
  hasDocumentAccess,
  hasSearchAccess,
  hasNetworkAccess
}) => {
  return (
    <div className="border-b py-4">
      <div className="flex items-start mb-2">
        <div className="mr-4 mt-1">{icon}</div>
        <div className="flex-1">
          <div className="flex items-baseline">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="ml-2 text-sm text-gray-500">v{version}</span>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Activate
          </Button>
          <Button variant="outline">
            Permissions
          </Button>
          <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
            Uninstall
          </Button>
        </div>
      </div>
      
      <div className="flex space-x-6 text-sm text-gray-500 ml-10">
        <div className="flex items-center">
          <File className="h-4 w-4 mr-1 text-gray-400" />
          <span>{hasDocumentAccess ? "Document Access" : "No Document Access"}</span>
        </div>
        
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-1 text-gray-400" />
          <span>{hasSearchAccess ? "Search Access" : "No Search Access"}</span>
        </div>
        
        <div className="flex items-center">
          <Network className="h-4 w-4 mr-1 text-gray-400" />
          <span>{hasNetworkAccess ? "Network Access" : "No Network Access"}</span>
        </div>
      </div>
    </div>
  );
};

export default ExtensionItem;
