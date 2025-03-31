
import { z } from "zod";

// Form validation schema
export const userFormSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().optional(),
  role: z.enum(["admin", "moderator", "user"]),
  status: z.enum(["active", "inactive"]),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
