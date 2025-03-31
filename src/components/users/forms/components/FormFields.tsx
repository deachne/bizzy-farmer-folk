
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { UserFormWithPasswordFields } from "../userFormSchema";

// Basic text input field component
export const TextInputField = ({ 
  form, 
  name, 
  label, 
  placeholder,
  type = "text",
  optional = false
}: { 
  form: UseFormReturn<any>; 
  name: string; 
  label: string; 
  placeholder: string;
  type?: string;
  optional?: boolean;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}{optional ? " (Optional)" : ""}</FormLabel>
        <FormControl>
          <Input type={type} placeholder={placeholder} {...field} value={field.value || ''} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Role selector component
export const RoleSelectField = ({ form }: { form: UseFormReturn<UserFormWithPasswordFields> }) => (
  <FormField
    control={form.control}
    name="role"
    render={({ field }) => (
      <FormItem>
        <FormLabel id="role-label">Role</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
          value={field.value || "user"}
          name={field.name}
        >
          <FormControl aria-labelledby="role-label">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="user">User</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Status selector component
export const StatusSelectField = ({ form }: { form: UseFormReturn<UserFormWithPasswordFields> }) => (
  <FormField
    control={form.control}
    name="status"
    render={({ field }) => (
      <FormItem>
        <FormLabel id="status-label">Status</FormLabel>
        <Select 
          onValueChange={field.onChange} 
          defaultValue={field.value}
          value={field.value || "active"}
          name={field.name}
        >
          <FormControl aria-labelledby="status-label">
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);

// Password fields component
export const PasswordFields = ({ form }: { form: UseFormReturn<any> }) => (
  <>
    <FormField
      control={form.control}
      // @ts-ignore - We know this field exists in the schema when showPasswordFields is true
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} value={field.value || ''} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={form.control}
      // @ts-ignore - We know this field exists in the schema when showPasswordFields is true
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Confirm Password</FormLabel>
          <FormControl>
            <Input type="password" {...field} value={field.value || ''} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
);
