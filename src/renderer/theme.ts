import { extendTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
const { Button } = chakraTheme.components;

const theme = extendTheme({
  components: {
    Button,
  },
  styles: {
    global: {
      "html, body": {
        padding: 0,
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

export default theme;
