
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "../types";
import { UserFormValues } from "../forms/userFormSchema";
import UserForm from "../forms/UserForm";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserAdded?: (user: User) => void;
}

export function AddUserDialog({ open, onOpenChange, onUserAdded }: AddUserDialogProps) {
  // Default values for the user form
  const defaultValues: UserFormValues & { password: string; confirmPassword: string } = {
    displayName: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: "user",
    status: "active",
    password: "",
    confirmPassword: ""
  };

  // Validation function to check if passwords match
  const validatePasswords = (values: UserFormValues & { 
    password: string; 
    confirmPassword: string 
  }) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (data: UserFormValues & { 
    password: string; 
    confirmPassword: string 
  }) => {
    // Validate passwords match
    if (!validatePasswords(data)) return;
    
    // Create a new user object
    const newUser: User = {
      id: Date.now(), // Simple way to generate unique IDs
      displayName: data.displayName,
      username: data.username,
      email: data.email,
      phoneNumber: data.phoneNumber || "",
      role: data.role,
      password: data.password, // In a real app, this would be hashed on the server
      status: data.status,
      created: new Date().toLocaleDateString(),
      initial: data.displayName.charAt(0).toUpperCase()
    };
    
    // Get existing users from localStorage or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Add new user to the array
    const updatedUsers = [...existingUsers, newUser];
    
    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Call the callback if provided
    if (onUserAdded) {
      onUserAdded(newUser);
    }
    
    // Show success message
    toast.success("User created successfully");
    
    // Close the dialog after a small delay to ensure proper cleanup
    setTimeout(() => {
      onOpenChange(false);
    }, 100);
  };

  const dialogDescription = "Create a new user by filling out the information below.";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-[500px]"
        aria-describedby="add-user-description"
      >
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription id="add-user-description">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        
        <UserForm 
          key="add-user-form"
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          submitButtonText="Create User"
          showPasswordFields={true}
        />
        
        <DialogFooter className="mt-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
