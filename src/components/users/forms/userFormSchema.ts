
import { z } from "zod";

// Base form validation schema without password fields
const baseUserSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  role: z.enum(["admin", "moderator", "user"]),
  status: z.enum(["active", "inactive"]),
});

// Extended schema with password fields
const passwordSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

// Export the base schema for edit user form
export const userFormSchema = baseUserSchema;

// Export the schema with password fields for add user form
export const userWithPasswordFormSchema = passwordSchema;

// Export the types
export type UserFormValues = z.infer<typeof userFormSchema>;
export type UserWithPasswordFormValues = z.infer<typeof userWithPasswordFormSchema>;
