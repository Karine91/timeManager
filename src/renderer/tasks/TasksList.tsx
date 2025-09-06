import { List } from "@chakra-ui/react";

import { Task } from "../../main/api/types";

import TaskListItem from "./TaskListItem";

interface IProps {
  data: Task[];
}

const TasksList = ({ data }: IProps) => {
  return (
    <List>
      {data.map(item => (
        <TaskListItem key={item.id} {...item} />
      ))}
    </List>
  );
};

export default TasksList;
