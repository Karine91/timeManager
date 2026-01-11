import { Text, Box, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Activity } from "../../../main/api/types";
import AddTask from "../../tasks/AddTask";
import { TaskFormValues } from "../../tasks/TaskForm";
import TasksList from "../../tasks/TasksList";
import Loading from "@/renderer/common/Loading";

function ActivityView() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>();

  useEffect(() => {
    window.activitiesApi.getActivityById(parseInt(id)).then(data => {
      setActivity(data);
    });
  }, []);

  const addTaskHandler = async (data: TaskFormValues) => {
    const updatedData = await window.tasksApi.createActivityTask({
      ...data,
      activityId: parseInt(id),
    });
    setActivity(updatedData);
  };

  if (!activity) return <Loading />;

  return (
    <Box>
      <Text sx={{ textTransform: "uppercase", fontSize: "3xl" }}>
        {activity.title}
      </Text>
      <Divider />
      <Text>{activity.description}</Text>
      <Box sx={{ py: 4 }}>
        <AddTask addTaskHandler={addTaskHandler} />
        <Box sx={{ my: 4 }}>
          <TasksList activityId={parseInt(id)} />
        </Box>
      </Box>
    </Box>
  );
}

export default ActivityView;
