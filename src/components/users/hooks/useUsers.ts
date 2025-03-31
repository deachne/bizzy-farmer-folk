
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User, defaultUsers } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  
  const loadUsers = () => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no users in localStorage, use default users and save them
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  };
  
  useEffect(() => {
    // Load users on component mount
    loadUsers();
  }, []);
  
  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success(`User ${userToDelete.displayName} deleted successfully`);
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };
  
  const handleDeactivateUser = () => {
    if (!userToDeactivate) return;
    
    const updatedUsers = users.map(user => 
      user.id === userToDeactivate.id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const action = userToDeactivate.status === "active" ? "deactivated" : "activated";
    toast.success(`User ${userToDeactivate.displayName} ${action}`);
    setShowDeactivateDialog(false);
    setUserToDeactivate(null);
  };
  
  const confirmDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  };
  
  const confirmDeactivateUser = (user: User) => {
    setUserToDeactivate(user);
    setShowDeactivateDialog(true);
  };

  const openEditUser = (user: User) => {
    setUserToEdit(user);
    setShowEditDialog(true);
  };

  return {
    users,
    userToDelete,
    userToDeactivate,
    userToEdit,
    showDeleteDialog,
    showDeactivateDialog,
    showEditDialog,
    loadUsers,
    handleDeleteUser,
    handleDeactivateUser,
    confirmDeleteUser,
    confirmDeactivateUser,
    openEditUser,
    setShowDeleteDialog,
    setShowDeactivateDialog,
    setShowEditDialog
  };
};
