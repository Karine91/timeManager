import { Button, useDisclosure } from "@chakra-ui/react";

import Modal from "../../ui/Modal";

interface IProps {
  children: (onClose: () => void) => React.ReactNode;
  buttonText: string;
  leftIcon?: React.ReactElement;
}

const ButtonModal = ({ children, buttonText, leftIcon }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} leftIcon={leftIcon}>
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        {children(onClose)}
      </Modal>
    </>
  );
};

export default ButtonModal;
