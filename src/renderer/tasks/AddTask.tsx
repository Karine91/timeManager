import { useState } from "react";
import {
  Button,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Modal from "../ui/Modal";

const AddTasks = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} leftIcon={<AddIcon />}>
        Create task
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddTasks;
