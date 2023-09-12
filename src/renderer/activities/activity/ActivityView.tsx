import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Box, Divider } from "@chakra-ui/react";

import { Activity } from "../../../main/api/types";
import TasksList from "../../tasks/TasksList";
import AddTask from "../../tasks/AddTask";

function ActivityView() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>();
  useEffect(() => {
    window.activitiesApi.getActivityById(parseInt(id)).then((data) => {
      setActivity(data);
    });
  }, []);

  if (!activity) return "Loading...";

  return (
    <Box>
      <Text sx={{ textTransform: "uppercase", fontSize: "3xl" }}>
        {activity.title}
      </Text>
      <Divider />
      <Text>{activity.description}</Text>
      <Box sx={{ py: 4 }}>
        <TasksList />
        <AddTask />
      </Box>
    </Box>
  );
}

export default ActivityView;
