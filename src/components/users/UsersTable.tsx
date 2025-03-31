
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserAvatar from "./UserAvatar";
import RoleBadge from "./badges/RoleBadge";
import StatusBadge from "./badges/StatusBadge";
import UserActions from "./UserActions";
import DeleteUserDialog from "./dialogs/DeleteUserDialog";
import DeactivateUserDialog from "./dialogs/DeactivateUserDialog";
import EditUserDialog from "./dialogs/EditUserDialog";
import { useUsers } from "./hooks/useUsers";

const UsersTable = () => {
  const {
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
  } = useUsers();

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
                <UserActions 
                  user={user}
                  onEdit={openEditUser}
                  onDeactivate={confirmDeactivateUser}
                  onDelete={confirmDeleteUser}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete User Confirmation Dialog */}
      <DeleteUserDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        user={userToDelete}
        onDelete={handleDeleteUser}
      />

      {/* Deactivate User Confirmation Dialog */}
      <DeactivateUserDialog
        open={showDeactivateDialog}
        onOpenChange={setShowDeactivateDialog}
        user={userToDeactivate}
        onDeactivate={handleDeactivateUser}
      />

      {/* Edit User Dialog */}
      <EditUserDialog 
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        user={userToEdit}
        onUserUpdated={loadUsers}
      />
    </>
  );
};

export default UsersTable;
