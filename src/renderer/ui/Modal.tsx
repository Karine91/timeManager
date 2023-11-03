import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalProps,
  useColorModeValue,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import React from "react";

interface IProps extends ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

interface IColoredModalClosePanelProps {
  variant?: PanelVariant;
}

export enum PanelVariant {
  Success = "success",
  Error = "error",
  Regular = "regular",
}

export const ColoredModalClosePanel = ({
  variant = PanelVariant.Regular,
}: IColoredModalClosePanelProps) => {
  const bgColorMap = {
    [PanelVariant.Success]: "green.400",
    [PanelVariant.Error]: "red.500",
    [PanelVariant.Regular]: "orange.400",
  };

  return (
    <Box
      sx={{
        backgroundColor: bgColorMap[variant],
        width: "40px",
        backgroundClip: "padding-box",
        outline: "outset",
        outlineWidth: "2px",
        outlineColor: bgColorMap[variant],
        outlineOffset: useColorModeValue("0", "2px"),

        position: "absolute",
        top: "0",
        bottom: "0",
        right: "-5px",
        boxShadow: useColorModeValue(
          "-11px 0 12px -6px #222121",
          "-11px 0 12px -6px black"
        ),
      }}
    >
      <ModalCloseButton sx={{ right: "4px", color: "black" }} />
    </Box>
  );
};

const Modal = ({ children, isOpen, onClose, ...otherProps }: IProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} {...otherProps}>
      <ModalOverlay />
      <ModalContent
        sx={{
          position: "relative",
          background: "transparent",
          display: "flex",
          flexDir: "row",
          paddingRight: "40px",
          boxShadow: "none",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
