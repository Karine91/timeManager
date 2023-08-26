import prisma from "../prisma";
import { ipcMain } from "electron";
import { Prisma } from "@prisma/client";
import { Activities } from "./types";

export const getActivities = () => {
  return prisma.activity.findMany({
    include: {
      tasks: true,
    },
  });
};

export const createActivity = (
  data: Prisma.ActivityCreateWithoutTasksInput
) => {
  return prisma.activity.create({ data });
};

const handleActivitiesApi = () => {
  ipcMain.handle(Activities.GetActivities, getActivities);
};

export default handleActivitiesApi;
