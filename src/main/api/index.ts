import handleActivitiesApi from "./activities";
import handleTasksApi from "./tasks";
import handleRecordsApi from "./records";

export default () => {
  handleActivitiesApi();
  handleTasksApi();
  handleRecordsApi();
};
