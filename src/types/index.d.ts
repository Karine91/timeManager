import { IActivitiesApi, ITasksApi } from "../main/api/types";

declare global {
  interface Window {
    darkMode: {
      toggle: () => Promise<boolean>;
    };
    activitiesApi: IActivitiesApi;
    tasksApi: ITasksApi;
  }
}
