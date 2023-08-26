/* eslint-disable @typescript-eslint/no-var-requires */
// See the Electron documentation for details on how to use preload scripts:

import { Activities } from "./api/types";
import { System } from "./system/types";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke(System.DarkModeToggle),
});

contextBridge.exposeInMainWorld("activitiesApi", {
  getActivities: () => ipcRenderer.invoke(Activities.GetActivities),
});
