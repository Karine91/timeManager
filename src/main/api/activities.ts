import prisma from "../prisma";
import { ipcMain, IpcMainInvokeEvent } from "electron";
import { Prisma } from "@prisma/client";
import { Activities } from "./types";

export const getActivities = () => {
  return prisma.activity.findMany({
    include: {
      tasks: true,
    },
  });
};

export const getActivity = (event: IpcMainInvokeEvent, id: number) => {
  return prisma.activity.findFirst({ where: { id }, include: { tasks: true } });
};

export const createActivity = (
  data: Prisma.ActivityCreateWithoutTasksInput
) => {
  return prisma.activity.create({ data });
};

const handleActivitiesApi = () => {
  ipcMain.handle(Activities.GetActivities, getActivities);
  ipcMain.handle(Activities.GetActivityById, getActivity);
};

export default handleActivitiesApi;
