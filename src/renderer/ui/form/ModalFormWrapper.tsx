import {
  Box,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { useFormikContext } from "formik";

import { ColoredModalClosePanel, PanelVariant } from "../Modal";

interface IProps {
  actions: React.ReactNode;
  children: React.ReactNode;
  header: React.ReactNode;
}

const SLIDE_IN_ANIMATION_DURATION = ".5s";

const ModalFormWrapper = ({ actions, children, header }: IProps) => {
  const { isValid, isSubmitting } = useFormikContext();
  const [red500] = useToken("colors", ["red.500"]);
  const brColor = isValid ? useColorModeValue("black", "white") : red500;
  const bg = useColorModeValue(
    "linear(to-br, gray.50, gray.100, gray.100, gray.50)",
    "linear(to-br, gray.900, gray.800, gray.800, gray.900)"
  );

  return (
    <>
      <ColoredModalClosePanel
        variant={
          !isValid
            ? PanelVariant.Error
            : isSubmitting
              ? PanelVariant.Success
              : PanelVariant.Regular
        }
      />
      <Box
        sx={{
          overflow: "hidden",
          padding: "15px",
          paddingRight: "10px",
          "&:before": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            width: "50px",
            height: "50px",
            borderLeft: `2px solid ${brColor}`,
            borderTop: `2px solid ${brColor}`,
            opacity: 0,
            animation: `.5s ease-in ${SLIDE_IN_ANIMATION_DURATION} forwards show`,
          },
          "&:after": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "50px",
            height: "50px",
            borderLeft: `2px solid ${brColor}`,
            borderBottom: `2px solid ${brColor}`,
            opacity: 0,
            animation: `.5s ease-in ${SLIDE_IN_ANIMATION_DURATION} forwards show`,
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            transform: "translateX(110%)",
            animation: `${SLIDE_IN_ANIMATION_DURATION} linear .2s forwards slideToRight`,
            "&:before": {
              content: "''",
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: -1,
              filter: useColorModeValue("blur(6px)", "blur(10px)"),
              bgGradient: bg,
            },
          }}
        >
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>{children}</ModalBody>

          <ModalFooter>{actions}</ModalFooter>
        </Box>
      </Box>
    </>
  );
};

export default ModalFormWrapper;
