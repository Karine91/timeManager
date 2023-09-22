import { Input, Text, InputProps } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface IProps extends InputProps {
  label: string;
  name: string;
}

const FieldInput = ({ label, name, ...inputProps }: IProps) => {
  return (
    <>
      <Text>{label}</Text>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <Input
            {...field}
            isInvalid={meta.touched && !!meta.error}
            variant="flushed"
            {...inputProps}
          />
        )}
      </Field>
    </>
  );
};

export default FieldInput;
