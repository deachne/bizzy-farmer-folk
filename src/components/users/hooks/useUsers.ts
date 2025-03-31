
import { useState, useEffect, useCallback } from "react";
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
  
  const loadUsers = useCallback(() => {
    // Load users from localStorage
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no users in localStorage, use default users and save them
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }, []);
  
  useEffect(() => {
    // Load users on component mount
    loadUsers();
  }, [loadUsers]);
  
  const handleDeleteUser = useCallback(() => {
    if (!userToDelete) return;
    
    const updatedUsers = users.filter(user => user.id !== userToDelete.id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    toast.success(`User ${userToDelete.displayName} deleted successfully`);
    
    // Use setTimeout to ensure clean state updates
    setTimeout(() => {
      setShowDeleteDialog(false);
      setUserToDelete(null);
      loadUsers();
    }, 0);
  }, [userToDelete, users, loadUsers]);
  
  const handleDeactivateUser = useCallback(() => {
    if (!userToDeactivate) return;
    
    const updatedUsers = users.map(user => 
      user.id === userToDeactivate.id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const action = userToDeactivate.status === "active" ? "deactivated" : "activated";
    toast.success(`User ${userToDeactivate.displayName} ${action}`);
    
    // Use setTimeout to ensure clean state updates
    setTimeout(() => {
      setShowDeactivateDialog(false);
      setUserToDeactivate(null);
      loadUsers();
    }, 0);
  }, [userToDeactivate, users, loadUsers]);
  
  const confirmDeleteUser = useCallback((user: User) => {
    setUserToDelete(user);
    setShowDeleteDialog(true);
  }, []);
  
  const confirmDeactivateUser = useCallback((user: User) => {
    setUserToDeactivate(user);
    setShowDeactivateDialog(true);
  }, []);

  const openEditUser = useCallback((user: User) => {
    setUserToEdit(user);
    setShowEditDialog(true);
  }, []);

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
