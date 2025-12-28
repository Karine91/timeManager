import { Prisma } from "@prisma/client";

import { IGetTaskByIdData } from "./tasks";

export const enum Activities {
  GetActivities = "get_activities",
  CreateActivity = "create_activity",
  GetActivityById = "get_activity_by_id",
  DeleteActivity = "delete_activity",
}

export const enum Tasks {
  CreateActivityTask = "create_activity_task",
  GetTaskById = "get_task_by_id",
}

export const enum Records {
  CreateTaskRecord = "create_task_record",
}

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    tasks: true;
  };
}>;

export type Task = Prisma.TaskGetPayload<{}>;
export type TaskWithRecords = Prisma.TaskGetPayload<{
  include: { records: true };
}>;
export type Record = Prisma.RecordGetPayload<{}>;

export interface IActivitiesApi {
  getActivities: () => Prisma.PrismaPromise<Activity[]>;
  getActivityById: (id: number) => Prisma.PrismaPromise<Activity>;
  createActivity: (
    data: Prisma.ActivityCreateWithoutTasksInput
  ) => Prisma.PrismaPromise<Activity>;
  deleteActivity: (id: number) => Prisma.PrismaPromise<[number, number]>;
}

export interface ITasksApi {
  createActivityTask: (
    data: Prisma.TaskUncheckedCreateWithoutRecordsInput
  ) => Prisma.PrismaPromise<Activity>;
  getTaskById: (
    data: IGetTaskByIdData
  ) => Prisma.PrismaPromise<TaskWithRecords>;
}

export interface IRecordsApi {
  createRecord: (
    data: Prisma.RecordUncheckedCreateInput
  ) => Prisma.PrismaPromise<TaskWithRecords>;
}
