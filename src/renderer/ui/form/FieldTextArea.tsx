import { Textarea, Text, TextareaProps } from "@chakra-ui/react";
import { Field, FieldProps } from "formik";

interface IProps extends TextareaProps {
  label: string;
  name: string;
}

const FieldTextArea = ({ label, name, ...otherProps }: IProps) => {
  return (
    <>
      <Text mb={2}>{label}</Text>
      <Field name={name}>
        {({ field, meta }: FieldProps) => (
          <Textarea
            {...field}
            variant="flushed"
            isInvalid={meta.touched && !!meta.error}
            {...otherProps}
          />
        )}
      </Field>
    </>
  );
};

export default FieldTextArea;
