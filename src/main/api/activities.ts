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
  event: IpcMainInvokeEvent,
  data: Prisma.ActivityCreateWithoutTasksInput
) => {
  return prisma.activity.create({ data });
};

export const createActivityTask = (
  event: IpcMainInvokeEvent,
  { activityId, ...otherData }: Prisma.TaskUncheckedCreateWithoutRecordsInput
) => {
  return prisma.activity.update({
    where: {
      id: activityId,
    },
    data: {
      tasks: {
        create: otherData,
      },
    },
    include: {
      tasks: true,
    },
  });
};

const handleActivitiesApi = () => {
  ipcMain.handle(Activities.GetActivities, getActivities);
  ipcMain.handle(Activities.GetActivityById, getActivity);
  ipcMain.handle(Activities.CreateActivityTask, createActivityTask);
};

export default handleActivitiesApi;
