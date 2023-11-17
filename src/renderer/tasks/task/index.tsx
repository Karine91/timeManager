import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { TaskWithRecords } from "../../../main/api/types";

const Task = () => {
  const { taskId, id: activityId } = useParams();
  const [taskData, setTaskData] = useState<TaskWithRecords>();

  useEffect(() => {
    window.tasksApi
      .getTaskById({
        taskId: parseInt(taskId),
        activityId: parseInt(activityId),
      })
      .then((data) => {
        setTaskData(data);
      });
  }, []);

  console.log(taskData);

  return <div>Task</div>;
};

export default Task;
