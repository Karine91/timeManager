import { Prisma } from "@prisma/client";
import { ipcMain, IpcMainInvokeEvent } from "electron";

import prisma from "../prisma";

import { Activities } from "./types";

export const getActivities = (event: IpcMainInvokeEvent) => {
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
  event: IpcMainInvokeEvent,
  data: Prisma.ActivityCreateWithoutTasksInput
) => {
  return prisma.activity.create({ data });
};

export const deleteActivity = (event: IpcMainInvokeEvent, id: number) => {
  const deleteTasks = prisma.task.deleteMany({ where: { activityId: id } });
  const deleteActivity = prisma.activity.delete({ where: { id } });
  const deleteRecords = prisma.record.deleteMany({
    where: { task: { activityId: id } },
  });

  return prisma.$transaction([deleteTasks, deleteActivity, deleteRecords]);
};

const handleActivitiesApi = () => {
  ipcMain.handle(Activities.GetActivities, getActivities);
  ipcMain.handle(Activities.GetActivityById, getActivity);
  ipcMain.handle(Activities.CreateActivity, createActivity);
  ipcMain.handle(Activities.DeleteActivity, deleteActivity);
};

export default handleActivitiesApi;
