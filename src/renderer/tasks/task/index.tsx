import { Box, Flex, Heading, List, Text } from "@chakra-ui/react";
import { format } from "date-fns/format";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { TaskWithRecords, CycleItem } from "../../../main/api/types";

import CyberpunkItem from "@/renderer/ui/CyberpunkItem";
import Loading from "@/renderer/common/Loading";
import { getNextCycleItem } from "../utils";
import { formatDistance } from "date-fns/formatDistance";
import RecordsSection from "./records/RecordsSection";

const Task = () => {
  const { taskId, id: activityId } = useParams();
  const [taskData, setTaskData] = useState<TaskWithRecords>();
  const [nextCycleItem, setNextItem] = useState<{
    item: CycleItem;
    date: Date;
  } | null>(null);

  useEffect(() => {
    window.tasksApi
      .getTaskById({
        taskId: parseInt(taskId),
        activityId: parseInt(activityId),
      })
      .then(data => {
        setTaskData(data);
        const nextCycleItem = getNextCycleItem({
          items: data.cycleItems,
          startDate: data.startDate,
          daysOfWeekRepeat: data.daysOfWeekRepeat,
        });
        setNextItem(nextCycleItem);
      });
  }, []);

  if (!taskData) return <Loading />;

  console.log(taskData, nextCycleItem);
  const {
    records,
    description,
    title,
    cycleItems,
    startDate,
    daysOfWeekRepeat,
  } = taskData;

  const duration = formatDistance(Date.now(), startDate.getTime());

  return (
    <div>
      <Heading as="h1">{title}</Heading>
      <Text>{description}</Text>
      {cycleItems.length && (
        <Box>
          <Flex justifyContent="space-between">
            <Heading size="md">
              Start date: {format(startDate, "dd.MM.yyyy")}
            </Heading>
            <Heading size="md">Duration: {duration}</Heading>
          </Flex>

          <List mt={3}>
            <Box pl={5}>
              {cycleItems.map(item => {
                const active = item.id == nextCycleItem.item.id;
                return (
                  <CyberpunkItem key={item.id} active={active} disabled>
                    <Flex justifyContent="space-between">
                      {item.title}
                      {active && (
                        <Text>{format(nextCycleItem.date, "dd.MM.yyyy")}</Text>
                      )}
                    </Flex>
                  </CyberpunkItem>
                );
              })}
            </Box>
          </List>
        </Box>
      )}
      <RecordsSection taskRecords={taskData.records} />
    </div>
  );
};

export default Task;
