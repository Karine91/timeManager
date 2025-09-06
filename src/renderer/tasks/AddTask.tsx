import { AddIcon } from "@chakra-ui/icons";

import ButtonModal from "../common/forms/ButtonModal";
import TaskForm, { TaskFormValues } from "./TaskForm";

interface IProps {
  addTaskHandler: (data: TaskFormValues) => Promise<void>;
}

const AddTasks = ({ addTaskHandler }: IProps) => {
  const addTask = async (data: TaskFormValues, onClose: () => void) => {
    await addTaskHandler(data);
    onClose();
  };

  return (
    <ButtonModal buttonText="Create task" leftIcon={<AddIcon />}>
      {onClose => (
        <TaskForm
          header="Add task"
          onClose={onClose}
          onSubmit={data => addTask(data, onClose)}
        />
      )}
    </ButtonModal>
  );
};

export default AddTasks;
