import { IActivitiesApi } from "../main/api/types";

declare global {
  interface Window {
    darkMode: {
      toggle: () => Promise<boolean>;
    };
    activitiesApi: IActivitiesApi;
  }
}
