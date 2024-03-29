import { createRoot } from "react-dom/client";
import AppComponent from "./AppComponent";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <AppComponent />
  </>
);
