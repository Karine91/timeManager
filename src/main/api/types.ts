import { Prisma } from "@prisma/client";

export const enum Activities {
  GetActivities = "get_activities",
  CreateActivity = "create_activity",
  GetActivityById = "get_activity_by_id",
  CreateActivityTask = "create_activity_task",
}

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    tasks: true;
  };
}>;

export type Task = Prisma.TaskGetPayload<{}>;

export interface IActivitiesApi {
  getActivities: () => Prisma.PrismaPromise<Activity[]>;
  getActivityById: (id: number) => Prisma.PrismaPromise<Activity>;
  createActivityTask: (
    data: Prisma.TaskUncheckedCreateWithoutRecordsInput
  ) => Prisma.PrismaPromise<Activity>;
}
