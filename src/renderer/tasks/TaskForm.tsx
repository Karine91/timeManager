import { Formik, Form, FormikHelpers } from "formik";
import FieldInput from "../ui/form/FieldInput";
import FieldTextArea from "../ui/form/FieldTextArea";
import * as Yup from "yup";
import { ColoredModalClosePanel, PanelVariant } from "../ui/Modal";

interface TaskForm {
  title: string;
  description: string;
}

const TaskSchema = Yup.object().shape({
  title: Yup.string().required("Required!").max(64, "Too long"),
  description: Yup.string().max(300, "Too long"),
});

const TaskForm = ({ id }: { id: string }) => {
  const initialValues = { title: "", description: "" };

  const handleSubmit = (values: TaskForm, actions: FormikHelpers<TaskForm>) => {
    console.log({ values, actions });
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 500);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, isSubmitting }) => (
        <Form id={id}>
          <ColoredModalClosePanel
            variant={
              !isValid
                ? PanelVariant.Error
                : isSubmitting
                ? PanelVariant.Success
                : PanelVariant.Regular
            }
          />
          <FieldInput mb={2} name="title" label="Title:" />
          <FieldTextArea name="description" label="Description:" rows={1} />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
