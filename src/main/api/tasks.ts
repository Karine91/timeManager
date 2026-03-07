import { Prisma } from "@prisma/client";
import { ipcMain, IpcMainInvokeEvent } from "electron";

import prisma from "../prisma";

import {
  Tasks,
  TaskWithRecords,
  UpsertTaskSupplyData,
  CreateTaskSupplyRefillHistoryData,
} from "./types";

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
            cycleItems: true,
            supply: true,
            supplyRefillsHistory: true,
          },
        },
      },
    })
    .then((data: { tasks: TaskWithRecords[] }) => data.tasks[0]);
};

export const getTasksByActivityId = (
  event: IpcMainInvokeEvent,
  activityId: number
) => {
  return prisma.task.findMany({
    where: { activityId },
  });
};

export const upsertTaskSupply = (
  event: IpcMainInvokeEvent,
  {
    taskId,
    quantity,
    unit,
    itemsPerUnit,
    itemUnit,
    lastRefillDate,
  }: UpsertTaskSupplyData
) => {
  const supplyData = {
    quantity,
    unit,
    itemsPerUnit: itemsPerUnit ?? null,
    itemUnit: itemUnit || null,
    lastRefillDate: lastRefillDate ? new Date(lastRefillDate) : null,
  };
  return prisma.task.update({
    where: { id: taskId },
    data: {
      supply: {
        upsert: {
          create: supplyData,
          update: supplyData,
        },
      },
    },
    include: {
      records: true,
      cycleItems: true,
      supply: true,
      supplyRefillsHistory: true,
    },
  });
};

export const createTaskSupplyRefillHistory = (
  event: IpcMainInvokeEvent,
  { taskId, description, lastRefillDate }: CreateTaskSupplyRefillHistoryData
) => {
  const refillDate = new Date(lastRefillDate);

  return prisma.$transaction(async tx => {
    await tx.taskSupplyRefill.create({
      data: {
        taskId,
        description,
        date: refillDate,
      },
    });
  });
};

const handleTasksApi = () => {
  ipcMain.handle(Tasks.CreateActivityTask, createActivityTask);
  ipcMain.handle(Tasks.GetTaskById, getTaskById);
  ipcMain.handle(Tasks.GetTasksByActivityId, getTasksByActivityId);
  ipcMain.handle(Tasks.UpsertTaskSupply, upsertTaskSupply);
  ipcMain.handle(Tasks.CreateTaskSupplyRefill, createTaskSupplyRefillHistory);
};

export default handleTasksApi;
