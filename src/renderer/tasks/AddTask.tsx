import { Button, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Modal from "../ui/Modal";
import TaskForm, { TaskFormValues } from "./TaskForm";

interface IProps {
  addTaskHandler: (data: TaskFormValues) => void;
}

const AddTasks = ({ addTaskHandler }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addTask = async (data: TaskFormValues) => {
    await addTaskHandler(data);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Create task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <TaskForm onClose={onClose} onSubmit={addTask} />
      </Modal>
    </>
  );
};

export default AddTasks;
