import { Formik, Form, FormikHelpers } from "formik";
import FieldInput from "../ui/form/FieldInput";
import FieldTextArea from "../ui/form/FieldTextArea";

interface TaskForm {
  title: string;
  description: string;
}

const TaskForm = ({ id }: { id: string }) => {
  const initialValues = { title: "", description: "" };

  const handleSubmit = (values: TaskForm, actions: FormikHelpers<TaskForm>) => {
    console.log({ values, actions });
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form id={id}>
        <FieldInput mb={2} name="title" label="Title:" />
        <FieldTextArea name="description" label="Description:" rows={1} />
      </Form>
    </Formik>
  );
};

export default TaskForm;
