import prisma from "../prisma";
import { ipcMain, IpcMainInvokeEvent } from "electron";
import { Prisma } from "@prisma/client";
import { Records } from "./types";

export const createRecord = (
  event: IpcMainInvokeEvent,
  { taskId, ...otherData }: Prisma.RecordUncheckedCreateInput
) => {
  console.log(otherData);
  return prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      records: {
        create: otherData,
      },
    },
    include: {
      records: true,
    },
  });
};

const handleRecordsApi = () => {
  ipcMain.handle(Records.CreateTaskRecord, createRecord);
};

export default handleRecordsApi;
