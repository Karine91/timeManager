import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  useColorModeValue,
  useColorMode,
  IconButton,
  Flex,
  Container,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import NavPanel from "../NavPanel";

const MainLayout = () => {
  const { colorMode, setColorMode } = useColorMode();
  const bg = useColorModeValue(
    "linear(to-br, gray.300, gray.100, gray.100, gray.300)",
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

            transform: "rotate(270deg)",
            position: "absolute",
            bottom: 0,
            left: "70px",
            right: 0,
            transformOrigin: "left",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            width: "100vh",
            "&:after": {
              content: '"Timetracker"',
              textTransform: "uppercase",
              position: "absolute",
              width: "100%",
              whiteSpace: "nowrap",
              top: useColorModeValue("5px", "8px"),
              color: `${useColorModeValue("#5a5858", "black")}`,
              filter: useColorModeValue("blur(3px)", "blur(4px)"),
              zIndex: -1,
              textShadow: `${useColorModeValue(
                "#d5c8be",
                "#dda229e6"
              )} 0 0 0.125em, ${useColorModeValue(
                "#b1b1b0",
                "#87450c9e"
              )} 0 0 0.45em`,
            },
          }}
        >
          <Box
            as="span"
            sx={{
              display: "block",
              bgGradient: useColorModeValue(
                "linear(to-r, yellow.300, orange.300, orange.300)",
                "linear(to-r, yellow.400, orange.400, orange.400)"
              ),
              bgClip: "text",
            }}
          >
            Timetracker
          </Box>
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
