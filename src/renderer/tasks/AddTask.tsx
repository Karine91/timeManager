import { useState, useId } from "react";
import {
  Button,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Modal, { ColoredModalClosePanel } from "../ui/Modal";
import TaskForm from "./TaskForm";

const AddTasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formId = useId();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Create task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalHeader>Add task</ModalHeader>
        <ModalBody>
          <TaskForm id={formId} />
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button form={formId} type="submit" colorScheme="blue">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddTasks;
