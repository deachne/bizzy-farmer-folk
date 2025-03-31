
import React from "react";
import { Plus, Settings, RefreshCw, Package, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import ExtensionCard from "./ExtensionCard";

const ExtensionManagement = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Extension Management</h2>
        <div className="flex space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Extension
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Manage Permissions
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Update All
          </Button>
        </div>
      </div>
      
      <div>
        <ExtensionCard
          name="Farm Management"
          version="1.2.3"
          icon={<Package className="h-6 w-6" />}
          isActive={true}
          hasDocumentAccess={true}
          hasSearchAccess={true}
          hasNetworkAccess={true}
          userCount="12Users"
          storageUsed="2.3 GB"
        />
        
        <ExtensionCard
          name="BizzyBank"
          version="0.9.1"
          icon={<Database className="h-6 w-6" />}
          isActive={true}
          hasDocumentAccess={true}
          hasSearchAccess={false}
          hasNetworkAccess={false}
          userCount="5Users"
          storageUsed="1.2 GB"
        />
        
        <ExtensionCard
          name="Manufacturing"
          version="1.0.0"
          icon={<Settings className="h-6 w-6" />}
          isActive={false}
          hasDocumentAccess={true}
          hasSearchAccess={true}
          hasNetworkAccess={true}
          userCount="0Users"
          storageUsed="0 GB"
        />
      </div>
    </div>
  );
};

export default ExtensionManagement;
