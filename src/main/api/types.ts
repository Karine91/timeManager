import { Prisma } from "@prisma/client";
import { IGetTaskByIdData } from "./tasks";

export const enum Activities {
  GetActivities = "get_activities",
  CreateActivity = "create_activity",
  GetActivityById = "get_activity_by_id",
}

export const enum Tasks {
  CreateActivityTask = "create_activity_task",
  GetTaskById = "get_task_by_id",
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

export interface IActivitiesApi {
  getActivities: () => Prisma.PrismaPromise<Activity[]>;
  getActivityById: (id: number) => Prisma.PrismaPromise<Activity>;
}

export interface ITasksApi {
  createActivityTask: (
    data: Prisma.TaskUncheckedCreateWithoutRecordsInput
  ) => Prisma.PrismaPromise<Activity>;
  getTaskById: (
    data: IGetTaskByIdData
  ) => Prisma.PrismaPromise<TaskWithRecords>;
}
