
import React from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash, Power } from "lucide-react";
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
  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit(user);
  };

  const handleDeactivateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDeactivate(user);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(user);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditClick}>
          <Edit className="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.alert("Change Role functionality will be implemented in a future update");
        }}>
          Change Role
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.alert("Reset Password functionality will be implemented in a future update");
        }}>
          Reset Password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleDeactivateClick}
          className="text-amber-600"
        >
          <Power className="mr-2 h-4 w-4" />
          {user.status === "active" ? "Deactivate User" : "Activate User"}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleDeleteClick}
          className="text-red-600"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
