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
  GetTasksByActivityId = "get_tasks_by_activity_id",
}

export const enum Records {
  CreateTaskRecord = "create_task_record",
}

export type Activity = Prisma.ActivityGetPayload<{}>;

export type Task<T = {}> = Omit<
  Prisma.TaskGetPayload<T>,
  "daysOfWeekRepeat"
> & {
  daysOfWeekRepeat: number[];
};
export type TaskWithRecords = Task<{
  include: { records: true; cycleItems: true };
}>;
export type Record = Prisma.RecordGetPayload<{}>;
export type CycleItem = Prisma.CycleItemGetPayload<{}>;

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
  getTasksByActivityId: (activityId: number) => Prisma.PrismaPromise<Task[]>;
}

export interface IRecordsApi {
  createRecord: (
    data: Prisma.RecordUncheckedCreateInput
  ) => Prisma.PrismaPromise<TaskWithRecords>;
}
