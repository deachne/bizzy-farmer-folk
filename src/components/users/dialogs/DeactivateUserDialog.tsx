
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { User } from "../types";

interface DeactivateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onDeactivate: () => void;
}

const DeactivateUserDialog = ({ open, onOpenChange, user, onDeactivate }: DeactivateUserDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {user?.status === "active" ? "Deactivate User" : "Activate User"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {user?.status === "active" 
              ? `This will deactivate user ${user?.displayName}. They will not be able to log in until reactivated.`
              : `This will reactivate user ${user?.displayName}. They will be able to log in again.`
            }
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeactivate} className={user?.status === "active" ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}>
            {user?.status === "active" ? "Deactivate" : "Activate"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeactivateUserDialog;
