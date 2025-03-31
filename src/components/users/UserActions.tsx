
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Power, 
  ShieldAlert,
  KeyRound
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { User } from "./types";

interface UserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onDeactivate: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserActions = ({ user, onEdit, onDeactivate, onDelete }: UserActionsProps) => {
  // Fixed event types for proper event handling
  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(user);
  }, [user, onEdit]);

  const handleDeactivateClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDeactivate(user);
  }, [user, onDeactivate]);

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(user);
  }, [user, onDelete]);

  // Handler for not-yet-implemented features
  const handleNotImplemented = useCallback((e: React.MouseEvent, featureName: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.alert(`${featureName} functionality will be implemented in a future update`);
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="h-8 w-8 p-0" 
          onClick={(e) => e.stopPropagation()}
          aria-label={`Actions for user ${user.displayName}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" aria-label="User actions menu">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Edit user action */}
        <DropdownMenuItem 
          onClick={handleEditClick}
          aria-label="Edit user details"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        
        {/* Change role action - not implemented yet */}
        <DropdownMenuItem 
          onClick={(e) => handleNotImplemented(e, "Change Role")}
          aria-label="Change user role"
        >
          <ShieldAlert className="mr-2 h-4 w-4" />
          Change Role
        </DropdownMenuItem>
        
        {/* Reset password action - not implemented yet */}
        <DropdownMenuItem 
          onClick={(e) => handleNotImplemented(e, "Reset Password")}
          aria-label="Reset user password"
        >
          <KeyRound className="mr-2 h-4 w-4" />
          Reset Password
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {/* Deactivate/Activate user action */}
        <DropdownMenuItem 
          onClick={handleDeactivateClick}
          className="text-amber-600"
          aria-label={user.status === "active" ? "Deactivate user account" : "Activate user account"}
        >
          <Power className="mr-2 h-4 w-4" />
          {user.status === "active" ? "Deactivate User" : "Activate User"}
        </DropdownMenuItem>
        
        {/* Delete user action */}
        <DropdownMenuItem 
          onClick={handleDeleteClick}
          className="text-red-600"
          aria-label="Permanently delete user"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
