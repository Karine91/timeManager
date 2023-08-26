import { Prisma } from "@prisma/client";

export const enum Activities {
  GetActivities = "get_activities",
  CreateActivity = "create_activity",
}

export interface IActivitiesApi {
  getActivities: () => Prisma.PrismaPromise<
    Prisma.ActivityGetPayload<{
      include: {
        tasks: true;
      };
    }>
  >;
}
