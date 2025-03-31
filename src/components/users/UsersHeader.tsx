
import React, { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AddUserDialog, User } from "./AddUserDialog";

const UsersHeader = () => {
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [, setRefreshTrigger] = useState(0);

  const handleUserAdded = () => {
    // Force a re-render of child components by updating a state
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center">
        <div className="bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded-md">
          BizzyPerson
        </div>
        <div className="text-xl font-semibold ml-2 text-gray-700">User Management</div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10"
          />
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
        </div>
        <Button variant="outline" onClick={() => setShowAddUserDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
        <AddUserDialog 
          open={showAddUserDialog} 
          onOpenChange={setShowAddUserDialog} 
          onUserAdded={handleUserAdded}
        />
      </div>
    </div>
  );
};

export default UsersHeader;
