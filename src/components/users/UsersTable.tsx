
import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
import { User } from "./AddUserDialog";
import { toast } from "sonner";

// Default users if no users in localStorage
const defaultUsers = [
  {
    id: 1,
    displayName: "Admin User",
    username: "admin",
    email: "admin@example.com",
    phoneNumber: "",
    password: "password123",
    role: "admin",
    status: "active",
    created: "12/31/2022",
    initial: "A"
  },
  {
    id: 2,
    displayName: "Regular User",
    username: "user",
    email: "user@example.com",
    phoneNumber: "",
    password: "password123",
    role: "user",
    status: "active",
    created: "2/14/2023",
    initial: "R"
  },
  {
    id: 3,
    displayName: "Moderator User",
    username: "moderator",
    email: "moderator@example.com",
    phoneNumber: "",
    password: "password123",
    role: "moderator",
    status: "active",
    created: "3/19/2023",
    initial: "M"
  }
] as User[];

const UserAvatar = ({ initial, role }: { initial: string; role: string }) => {
  const bgColor = role === 'admin' 
    ? 'bg-blue-100' 
    : role === 'moderator' 
      ? 'bg-green-100' 
      : 'bg-gray-100';
  
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor} text-sm font-medium`}>
      {initial}
    </div>
  );
};

const RoleBadge = ({ role }: { role: string }) => {
  const variant = role === 'admin' 
    ? 'bg-blue-500 text-white' 
    : role === 'moderator' 
      ? 'bg-green-500 text-white' 
      : 'bg-gray-200 text-gray-700';
  
  return (
    <Badge className={`${variant} font-normal`}>
      {role}
    </Badge>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const variant = status === 'active'
    ? 'bg-green-100 text-green-800 border-green-200'
    : 'bg-red-100 text-red-800 border-red-200';
    
  return (
    <Badge variant="outline" className={variant}>
      {status}
    </Badge>
  );
};

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  
  useEffect(() => {
    // Load users from localStorage on component mount
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // If no users in localStorage, use default users and save them
      setUsers(defaultUsers);
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
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

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-3">
                <UserAvatar initial={user.initial} role={user.role} />
                <div>
                  <div className="font-medium">{user.displayName}</div>
                  <div className="text-sm text-gray-500">{user.username}</div>
                </div>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell>{user.created}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuItem>Reset Password</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => confirmDeactivateUser(user)}
                      className="text-amber-600"
                    >
                      {user.status === "active" ? "Deactivate User" : "Activate User"}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => confirmDeleteUser(user)}
                      className="text-red-600"
                    >
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete User Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user 
              <span className="font-medium"> {userToDelete?.displayName}</span> and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deactivate User Confirmation Dialog */}
      <AlertDialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {userToDeactivate?.status === "active" ? "Deactivate User" : "Activate User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {userToDeactivate?.status === "active" 
                ? `This will deactivate user ${userToDeactivate?.displayName}. They will not be able to log in until reactivated.`
                : `This will reactivate user ${userToDeactivate?.displayName}. They will be able to log in again.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUserToDeactivate(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivateUser} className={userToDeactivate?.status === "active" ? "bg-amber-600 hover:bg-amber-700" : "bg-green-600 hover:bg-green-700"}>
              {userToDeactivate?.status === "active" ? "Deactivate" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UsersTable;
