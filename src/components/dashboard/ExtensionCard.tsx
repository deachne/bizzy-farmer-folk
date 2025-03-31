
import React from "react";
import { File, Search, Network, Users, HardDrive } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ExtensionCardProps {
  name: string;
  version: string;
  icon: React.ReactNode;
  isActive: boolean;
  hasDocumentAccess: boolean;
  hasSearchAccess: boolean;
  hasNetworkAccess: boolean;
  userCount: string;
  storageUsed: string;
}

const ExtensionCard: React.FC<ExtensionCardProps> = ({
  name,
  version,
  icon,
  isActive,
  hasDocumentAccess,
  hasSearchAccess,
  hasNetworkAccess,
  userCount,
  storageUsed
}) => {
  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className="mr-3 text-green-500">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="text-sm text-gray-500">v{version}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isActive ? (
            <>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">Configure</Button>
            </>
          ) : (
            <>
              <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactive</Badge>
              <Button variant="outline">Activate</Button>
            </>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center">
          <File className="h-4 w-4 mr-1 text-blue-600" />
          <span className={hasDocumentAccess ? "text-gray-800" : "text-gray-400"}>
            Document Access
          </span>
        </div>
        
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-1 text-purple-600" />
          <span className={hasSearchAccess ? "text-gray-800" : "text-gray-400"}>
            {hasSearchAccess ? "Search Access" : "No Search Access"}
          </span>
        </div>
        
        <div className="flex items-center">
          <Network className="h-4 w-4 mr-1 text-green-600" />
          <span className={hasNetworkAccess ? "text-gray-800" : "text-gray-400"}>
            {hasNetworkAccess ? "Network Access" : "No Network Access"}
          </span>
        </div>
        
        <div className="flex items-center ml-auto">
          <Users className="h-4 w-4 mr-1 text-blue-500" />
          <span>{userCount}</span>
        </div>
        
        <div className="flex items-center">
          <HardDrive className="h-4 w-4 mr-1 text-blue-500" />
          <span>{storageUsed}</span>
        </div>
      </div>
    </div>
  );
};

export default ExtensionCard;
