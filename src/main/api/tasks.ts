import prisma from "../prisma";
import { ipcMain, IpcMainInvokeEvent } from "electron";
import { Prisma } from "@prisma/client";
import { Tasks, TaskWithRecords } from "./types";

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

export interface IGetTaskByIdData {
  activityId: number;
  taskId: number;
}

export const getTaskById = (
  event: IpcMainInvokeEvent,
  { activityId, taskId }: IGetTaskByIdData
) => {
  return prisma.activity
    .findFirst({
      where: {
        id: activityId,
      },
      select: {
        tasks: {
          where: {
            id: taskId,
          },
          include: {
            records: true,
          },
        },
      },
    })
    .then((data: { tasks: TaskWithRecords[] }) => data.tasks[0]);
};

const handleTasksApi = () => {
  ipcMain.handle(Tasks.CreateActivityTask, createActivityTask);
  ipcMain.handle(Tasks.GetTaskById, getTaskById);
};

export default handleTasksApi;
