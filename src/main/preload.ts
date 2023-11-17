/* eslint-disable @typescript-eslint/no-var-requires */
// See the Electron documentation for details on how to use preload scripts:
import { Prisma } from "@prisma/client";
import { Activities, Tasks } from "./api/types";
import { System } from "./system/types";
import { IGetTaskByIdData } from "./api/tasks";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("darkMode", {
  toggle: () => ipcRenderer.invoke(System.DarkModeToggle),
});

contextBridge.exposeInMainWorld("activitiesApi", {
  getActivities: () => ipcRenderer.invoke(Activities.GetActivities),
  getActivityById: (id: number) =>
    ipcRenderer.invoke(Activities.GetActivityById, id),
});

contextBridge.exposeInMainWorld("tasksApi", {
  createActivityTask: (data: Prisma.TaskUncheckedCreateWithoutRecordsInput) =>
    ipcRenderer.invoke(Tasks.CreateActivityTask, data),
  getTaskById: (data: IGetTaskByIdData) =>
    ipcRenderer.invoke(Tasks.GetTaskById, data),
});
