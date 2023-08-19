import prisma from "../prisma";
import { Prisma } from "@prisma/client";

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
