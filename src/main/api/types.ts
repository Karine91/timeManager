import { Prisma } from "@prisma/client";

export const enum Activities {
  GetActivities = "get_activities",
  CreateActivity = "create_activity",
}

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    tasks: true;
  };
}>;

export interface IActivitiesApi {
  getActivities: () => Prisma.PrismaPromise<Activity[]>;
}
