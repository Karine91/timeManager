import { AddIcon } from "@chakra-ui/icons";

import ButtonModal from "../../common/forms/ButtonModal";
import TaskForm, { TaskFormValues } from "../../tasks/TaskForm";

interface IProps {
  addActivityHandler: (data: TaskFormValues) => Promise<void>;
}

const AddActivity = ({ addActivityHandler }: IProps) => {
  const addActivity = async (data: TaskFormValues, onClose: () => void) => {
    await addActivityHandler(data);
    onClose();
  };

  return (
    <ButtonModal buttonText="Create activity" leftIcon={<AddIcon />}>
      {onClose => (
        <TaskForm
          header="Add activity"
          onClose={onClose}
          onSubmit={data => addActivity(data, onClose)}
        />
      )}
    </ButtonModal>
  );
};

export default AddActivity;
