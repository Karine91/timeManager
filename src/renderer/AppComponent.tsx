import React, { useEffect } from "react";
import { ChakraBaseProvider } from "@chakra-ui/react";
import { HashRouter, Routes } from "react-router-dom";

import ActivitiesList from "./activities/ActivitiesList";
import MainLayout from "./layouts/MainLayout";

import theme from "./theme";
import { Route } from "react-router";

const AppComponent = () => {
  useEffect(() => {
    if (!localStorage.getItem("chakra-ui-color-mode")) {
      localStorage.setItem("chakra-ui-color-mode", "dark");
    }
  }, []);

  return (
    <ChakraBaseProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route element={<ActivitiesList />} index />
            <Route path="/hello" element={<div>Hello</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </ChakraBaseProvider>
  );
};

export default AppComponent;
