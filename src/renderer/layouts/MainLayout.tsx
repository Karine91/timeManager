import React from "react";
import {
  Box,
  useColorModeValue,
  useColorMode,
  IconButton,
  Flex,
  Container,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
interface IProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  const { colorMode, setColorMode } = useColorMode();
  const bg = useColorModeValue(
    "linear(to-br, gray.50, gray.100, gray.100, gray.50)",
    "linear(to-br, gray.900, gray.800, gray.800, gray.900)"
  );

  const changeTheme = async () => {
    setColorMode(colorMode === "dark" ? "light" : "dark");
    await window.darkMode.toggle();
  };

  return (
    <Box
      sx={{
        bgGradient: bg,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Flex align="center" sx={{ padding: 2 }}>
        <IconButton
          aria-label="change theme"
          sx={{ marginLeft: "auto" }}
          icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
          onClick={changeTheme}
        />
      </Flex>
      <Container>{children}</Container>
    </Box>
  );
};

export default MainLayout;
