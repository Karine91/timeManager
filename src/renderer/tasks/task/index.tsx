import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text, Heading, Box, Button, Flex } from "@chakra-ui/react";
import { TriangleDownIcon } from "@chakra-ui/icons";
import { TaskWithRecords } from "../../../main/api/types";
import { useTimer } from "../../timer/hooks/useTimer";

const Task = () => {
  const { taskId, id: activityId } = useParams();
  const [taskData, setTaskData] = useState<TaskWithRecords>();
  const {
    onStart,
    hours,
    minutes,
    seconds,
    isRunning,
    time,
    onStop,
    startTime,
    endTime,
  } = useTimer();

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

  const handleStop = () => {
    //save record to db;
    window.recordsApi.createRecord({
      startTime,
      endTime,
      taskId: parseInt(taskId),
    });
    onStop();
  };

  if (!taskData) return;

  return (
    <div>
      <Heading as="h1">{taskData.title}</Heading>
      <Text>{taskData.description}</Text>
      <Box>
        <Heading as="h3">Records</Heading>
        <Flex alignItems="center" mt="4">
          <Button
            onClick={onStart}
            rightIcon={
              <TriangleDownIcon sx={{ transform: "rotate(-90deg)" }} />
            }
          >
            {isRunning ? "Pause" : time ? "Resume" : "Start tracking"}
          </Button>
          {Boolean(isRunning || time) && (
            <Button onClick={handleStop} ml="2">
              Stop
            </Button>
          )}
          <Text ml="2">
            {hours}:{minutes}:{seconds}
          </Text>
        </Flex>
      </Box>
    </div>
  );
};

export default Task;
