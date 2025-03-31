
import React from "react";
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

// Mock data for the users
const users = [
  {
    id: 1,
    displayName: "Admin User",
    username: "admin",
    email: "admin@example.com",
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
    role: "moderator",
    status: "active",
    created: "3/19/2023",
    initial: "M"
  }
];

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
  return (
    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
      {status}
    </Badge>
  );
};

const UsersTable = () => {
  return (
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
                  <DropdownMenuItem className="text-red-600">Deactivate User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
