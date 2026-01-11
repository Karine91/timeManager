import { Box, Heading, List, Text } from "@chakra-ui/react";
import { format } from "date-fns/format";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Record as TimeRecord, TaskWithRecords } from "../../../main/api/types";

import RecordItem from "./RecordItem";
import TrackingTools from "./TrackingTools";
import CyberpunkItem from "@/renderer/ui/CyberpunkItem";
import Loading from "@/renderer/common/Loading";

const Task = () => {
  const { taskId, id: activityId } = useParams();
  const [taskData, setTaskData] = useState<TaskWithRecords>();

  useEffect(() => {
    window.tasksApi
      .getTaskById({
        taskId: parseInt(taskId),
        activityId: parseInt(activityId),
      })
      .then(data => {
        setTaskData(data);
      });
  }, []);

  if (!taskData) return <Loading />;

  console.log(taskData);
  const { records, description, title, cycleItems, startDate } = taskData;

  // recalculated on every millisecond, so need to move counter to separate component
  const groupedRecords = records.reduce(
    (acc, cur) => {
      const date = format(cur.startTime, "dd.MM.yyyy");
      (acc[date] = acc[date] || []).push(cur);
      return acc;
    },
    {} as Record<string, TimeRecord[]>
  );

  return (
    <div>
      <Heading as="h1">{title}</Heading>
      <Text>{description}</Text>
      {cycleItems.length && (
        <Box>
          <Heading size="md">
            Start date: {format(startDate, "dd.MM.yyyy")}
          </Heading>
          <List mt={3}>
            <Box pl={5}>
              {cycleItems.map(item => (
                <CyberpunkItem key={item.id} disabled>
                  {item.title}
                </CyberpunkItem>
              ))}
            </Box>
          </List>
        </Box>
      )}
      <TrackingTools />
      <Box>
        <List mt="6">
          {Object.entries(groupedRecords).map(([date, records]) => (
            <Box mb={2} key={date}>
              <Box>{date}</Box>
              {records.map(item => (
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
