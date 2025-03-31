
import React from "react";
import { Search, RefreshCw, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ExtensionHeader = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <div className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded-md">
          BizzyPerson
        </div>
        <div className="text-xl font-semibold ml-2 text-gray-700">Extension Management</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search extensions..."
            className="pl-10"
          />
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
        </div>
        <Button variant="outline" className="flex items-center">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default ExtensionHeader;
