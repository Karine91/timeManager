import { Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { useId } from "react";
import * as Yup from "yup";

import FieldInput from "../ui/form/FieldInput";
import FieldTextArea from "../ui/form/FieldTextArea";
import ModalFormWrapper from "../ui/form/ModalFormWrapper";

export interface TaskFormValues {
  title: string;
  description: string;
}

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Required!").max(64, "Too long"),
  description: Yup.string().max(300, "Too long"),
});

interface IProps {
  onClose: () => void;
  onSubmit: (values: TaskFormValues) => void;
  header: string;
}

const TaskForm = ({ onClose, onSubmit, header }: IProps) => {
  const initialValues = { title: "", description: "" };
  const formId = useId();

  const handleSubmit = (
    values: TaskFormValues,
    actions: FormikHelpers<TaskFormValues>
  ) => {
    onSubmit(values);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form id={formId}>
          <ModalFormWrapper
            header={header}
            actions={
              <>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button form={formId} type="submit" colorScheme="blue">
                  Save
                </Button>
              </>
            }
          >
            <FieldInput mb={2} name="title" label="Title:" />
            <FieldTextArea name="description" label="Description:" rows={1} />
          </ModalFormWrapper>
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
