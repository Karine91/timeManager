import React, { useEffect } from "react";
import { ChakraBaseProvider } from "@chakra-ui/react";

import ActivitiesList from "./activities/ActivitiesList";
import MainLayout from "./layouts/MainLayout";

import theme from "./theme";

const AppComponent = () => {
  useEffect(() => {
    if (!localStorage.getItem("chakra-ui-color-mode")) {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    }
  }, []);

  return (
    <ChakraBaseProvider theme={theme}>
      <MainLayout>
        <ActivitiesList />
      </MainLayout>
    </ChakraBaseProvider>
  );
};

export default AppComponent;
