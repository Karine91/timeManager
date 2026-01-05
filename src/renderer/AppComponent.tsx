import { ChakraBaseProvider } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Route } from "react-router";
import { HashRouter, Routes } from "react-router-dom";

import ActivitiesList from "./activities/ActivitiesList";
import ActivityView from "./activities/activity/ActivityView";
import MainLayout from "./layouts/MainLayout";
import Task from "./tasks/task";
import theme from "./theme";
import PageLayout from "./layouts/PageLayout";

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
            <Route element={<PageLayout />}>
              <Route path="/activity/:id" element={<ActivityView />} />
              <Route path="/activity/:id/:taskId" element={<Task />} />
            </Route>
            <Route path="/settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </HashRouter>
    </ChakraBaseProvider>
  );
};

export default AppComponent;
