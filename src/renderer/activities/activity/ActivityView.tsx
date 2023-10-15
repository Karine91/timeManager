import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Box, Divider } from "@chakra-ui/react";

import { Activity } from "../../../main/api/types";
import TasksList from "../../tasks/TasksList";
import AddTask from "../../tasks/AddTask";
import { TaskFormValues } from "../../tasks/TaskForm";

function ActivityView() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    window.activitiesApi.getActivityById(parseInt(id)).then((data) => {
      setActivity(data);
    });
  }, []);

  console.log(activity);

  const addTaskHandler = async (data: TaskFormValues) => {
    const updatedData = await window.activitiesApi.createActivityTask({
      ...data,
      activityId: parseInt(id),
    });
    console.log(updatedData);
  };

  if (!activity) return <>Loading...</>;

  return (
    <Box>
      <Text sx={{ textTransform: "uppercase", fontSize: "3xl" }}>
        {activity.title}
      </Text>
      <Divider />
      <Text>{activity.description}</Text>
      <Box sx={{ py: 4 }}>
        <TasksList />
        <AddTask addTaskHandler={addTaskHandler} />
      </Box>
    </Box>
  );
}

export default ActivityView;
