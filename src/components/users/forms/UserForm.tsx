
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  userFormSchema, 
  userWithPasswordFormSchema, 
  UserFormValues,
  UserWithPasswordFormValues,
  UserFormWithPasswordFields
} from "./userFormSchema";
import UserFormBasicFields from "./components/UserFormBasicFields";
import { RoleSelectField, StatusSelectField, PasswordFields } from "./components/FormFields";

interface UserFormProps {
  defaultValues: UserFormWithPasswordFields;
  onSubmit: (values: UserFormValues | UserWithPasswordFormValues) => void;
  submitButtonText?: string;
  showPasswordFields?: boolean;
}

const UserForm = ({ 
  defaultValues, 
  onSubmit, 
  submitButtonText = "Save Changes",
  showPasswordFields = false
}: UserFormProps) => {
  const schema = showPasswordFields ? userWithPasswordFormSchema : userFormSchema;
  
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange"
  });

  // Reset form when defaultValues change
  useEffect(() => {
    console.log("Default values changed:", defaultValues);
    if (defaultValues) {
      // Ensure we reset the form with complete and correct values
      form.reset({
        ...defaultValues,
        role: defaultValues.role || "user",
        status: defaultValues.status || "active"
      });
    }
  }, [defaultValues, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Basic user information fields */}
        <UserFormBasicFields form={form} />
        
        {/* Role and status selection */}
        <RoleSelectField form={form} />
        <StatusSelectField form={form} />
        
        {/* Password fields (only shown when creating a new user) */}
        {showPasswordFields && <PasswordFields form={form} />}
        
        <div className="flex justify-end">
          <Button type="submit">{submitButtonText}</Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
