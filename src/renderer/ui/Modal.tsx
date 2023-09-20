import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalProps,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ children, isOpen, onClose, ...otherProps }: IProps) => {
  const bg = useColorModeValue(
    "linear(to-br, gray.50, gray.100, gray.100, gray.50)",
    "linear(to-br, gray.900, gray.800, gray.800, gray.900)"
  );
  const brColor = useColorModeValue("black", "white");
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...otherProps}>
      <ModalOverlay />
      <ModalContent
        sx={{
          position: "relative",
          background: "transparent",
          border: `1px solid ${brColor}`,
          "&:before": {
            content: "''",
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: -1,
            filter: "blur(10px)",
            bgGradient: bg,
          },
        }}
      >
        {/* <Box backdropFilter="auto" backdropBlur="8px"> */}
        {children}
        {/* </Box> */}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
