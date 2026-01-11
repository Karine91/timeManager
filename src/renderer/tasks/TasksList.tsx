import { List } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Task } from "../../main/api/types";

import TaskListItem from "./TaskListItem";
import Loading from "../common/Loading";

interface IProps {
  activityId: number;
}

const TasksList = ({ activityId }: IProps) => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    window.tasksApi.getTasksByActivityId(activityId).then(data => {
      setTasks(data);
    });
  }, []);

  if (!tasks) return <Loading />;

  return (
    <List>
      {tasks.map(item => (
        <TaskListItem key={item.id} {...item} />
      ))}
    </List>
  );
};

export default TasksList;
