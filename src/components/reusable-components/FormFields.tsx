import React from "react";
import { TextInput, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  // Explicitly typing rest to accept any additional props
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  required,
  ...rest
}) => (
  <TextInput
    label={label}
    required={required}
    {...rest} // Spread the rest props
  />
);

interface FormFieldsProps {
  form: UseFormReturnType<any>; // Replace any with the appropriate type if known
}

const FormFields: React.FC<FormFieldsProps> = ({ form }) => (
  <Stack gap="md">
    {[
      "customerName",
      "houseNumber",
      "street",
      "city",
      "landmark",
      "zipCode",
      "contactNumber",
    ].map((field) => (
      <FormField
        key={field}
        label={field
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase())}
        name={field}
        {...form.getInputProps(field)}
        required={field !== "landmark"}
      />
    ))}
  </Stack>
);

export default FormFields;
