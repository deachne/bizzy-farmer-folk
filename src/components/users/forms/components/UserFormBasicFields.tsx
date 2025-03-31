
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { UserFormWithPasswordFields } from "../userFormSchema";
import { TextInputField } from "./FormFields";

interface UserFormBasicFieldsProps {
  form: UseFormReturn<UserFormWithPasswordFields>;
}

const UserFormBasicFields = ({ form }: UserFormBasicFieldsProps) => {
  return (
    <>
      <TextInputField
        form={form}
        name="displayName"
        label="Display Name"
        placeholder="John Doe"
      />
      <TextInputField
        form={form}
        name="username"
        label="Username"
        placeholder="johndoe"
      />
      <TextInputField
        form={form}
        name="email"
        label="Email"
        placeholder="john@example.com"
        type="email"
      />
      <TextInputField
        form={form}
        name="phoneNumber"
        label="Phone Number"
        placeholder="(555) 123-4567"
        optional={true}
      />
    </>
  );
};

export default UserFormBasicFields;
