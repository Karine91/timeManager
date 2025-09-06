import handleActivitiesApi from "./activities";
import handleRecordsApi from "./records";
import handleTasksApi from "./tasks";

export default () => {
  handleActivitiesApi();
  handleTasksApi();
  handleRecordsApi();
};
