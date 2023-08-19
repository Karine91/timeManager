import React from "react";
import { ChakraBaseProvider, extendBaseTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";

import ActivitiesList from "./activities/ActivitiesList";
import MainLayout from "./layouts/MainLayout";

const { Button } = chakraTheme.components;

const theme = extendBaseTheme({
  components: {
    Button,
  },
});

const AppComponent = () => {
  return (
    <ChakraBaseProvider theme={theme}>
      <MainLayout>
        <ActivitiesList />
      </MainLayout>
    </ChakraBaseProvider>
  );
};

export default AppComponent;
