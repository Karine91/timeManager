import React from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  useColorModeValue,
  useColorMode,
  IconButton,
  Flex,
  Container,
  Text,
} from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import NavPanel from "../NavPanel";

const MainLayout = () => {
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
      <Flex align="center" sx={{ padding: 2, height: "60px" }}>
        <IconButton
          aria-label="change theme"
          sx={{ marginLeft: "auto" }}
          icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
          onClick={changeTheme}
        />
      </Flex>

      <Flex
        sx={{
          pl: "130px",
          height: "calc(100% - 60px)",
          position: "relative",
          width: "100%",
        }}
      >
        <Text
          sx={{
            fontSize: "10vh",
            fontWeight: "black",
            textTransform: "uppercase",
            lineHeight: 1,
            px: 4,
            bgGradient: "linear(to-r, yellow.400, orange.400, orange.400)",
            bgClip: "text",
            transform: "rotate(270deg)",
            position: "absolute",
            bottom: 0,
            left: "70px",
            right: 0,
            transformOrigin: "left",
          }}
        >
          Timetracker
        </Text>
        <NavPanel />
        <Container maxW="container.lg" sx={{ py: 2 }}>
          <Outlet />
        </Container>
      </Flex>
    </Box>
  );
};

export default MainLayout;
