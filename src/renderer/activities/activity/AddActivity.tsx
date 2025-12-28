import { AddIcon } from "@chakra-ui/icons";

import ButtonModal from "../../common/forms/ButtonModal";
import TaskForm, { TaskFormValues } from "../../tasks/TaskForm";
import { Activity } from "@/main/api/types";

interface IProps {
  addActivityHandler: (data: TaskFormValues) => Promise<unknown>;
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
