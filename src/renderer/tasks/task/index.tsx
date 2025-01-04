import { Box, Heading, List, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { format } from "date-fns/format";
import { Record as TimeRecord, TaskWithRecords } from "../../../main/api/types";
import RecordItem from "./RecordItem";
import TrackingTools from "./TrackingTools";

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

  if (!taskData) return;

  // recalculated on every millisecond, so need to move counter to separate component
  const groupedRecords = taskData.records.reduce((acc, cur) => {
    const date = format(cur.startTime, "dd.MM.yyyy");
    (acc[date] = acc[date] || []).push(cur);
    return acc;
  }, {} as Record<string, TimeRecord[]>);

  return (
    <div>
      <Heading as="h1">{taskData.title}</Heading>
      <Text>{taskData.description}</Text>
      <TrackingTools />
      <Box>
        <List mt="6">
          {Object.entries(groupedRecords).map(([date, records]) => (
            <Box mb={2} key={date}>
              <Box>{date}</Box>
              {records.map((item) => (
                <RecordItem key={item.id} {...item} />
              ))}
            </Box>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Task;
