
import React, { useEffect, useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { User } from "../types";
import UserForm from "../forms/UserForm";
import { UserFormValues } from "../forms/userFormSchema";

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  onUserUpdated: () => void;
}

const EditUserDialog = ({ 
  open, 
  onOpenChange, 
  user, 
  onUserUpdated 
}: EditUserDialogProps) => {
  const [formDefaultValues, setFormDefaultValues] = useState<UserFormValues>({
    displayName: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: "user",
    status: "active",
  });

  // Update form values when user changes or dialog opens
  useEffect(() => {
    if (user && open) {
      console.log("Setting form values from user:", user);
      setFormDefaultValues({
        displayName: user.displayName || "",
        username: user.username || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        role: user.role as "admin" | "moderator" | "user",
        status: user.status as "active" | "inactive",
      });
    }
  }, [user, open]);

  const handleSubmit = (values: UserFormValues) => {
    if (!user) return;

    // Get existing users from localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Update the user
    const updatedUsers = users.map((u: User) =>
      u.id === user.id ? { ...u, ...values } : u
    );

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Notify and close dialog - using setTimeout to ensure clean dialog closing
    toast.success(`User ${values.displayName} updated successfully`);
    
    // Use setTimeout to ensure the dialog is properly closed before updating the UI
    setTimeout(() => {
      onOpenChange(false);
      onUserUpdated();
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User: {user?.displayName}</DialogTitle>
          <DialogDescription>
            Make changes to the user information below.
          </DialogDescription>
        </DialogHeader>
        <UserForm 
          key={user?.id || 'no-user'} // Add key to force re-render when user changes
          defaultValues={formDefaultValues}
          onSubmit={handleSubmit}
          submitButtonText="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
