import { TriangleDownIcon } from "@chakra-ui/icons";
import { Text, Heading, Box, Button, Flex, List } from "@chakra-ui/react";
import { format } from "date-fns/format";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Record as TimeRecord, TaskWithRecords } from "../../../main/api/types";
import { useTimer } from "../../timer/hooks/useTimer";

import RecordItem from "./RecordItem";

const TrackingTools = ({
  onAddRecord,
}: {
  onAddRecord: (records: TimeRecord[]) => void;
}) => {
  const { taskId, id: activityId } = useParams();
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

  const handleStop = async () => {
    //save record to db;
    const updatedTask = await window.recordsApi.createRecord({
      startTime,
      endTime,
      hours: Number(hours),
      minutes: Number(minutes),
      seconds: Number(seconds),
      taskId: parseInt(taskId),
    });
    onStop();
    //update records list
    onAddRecord(updatedTask.records);
  };
  return (
    <>
      <Heading
        sx={{
          fontSize: 21,
        }}
        mt={4}
        as="h3"
      >
        Records
      </Heading>
      <Flex alignItems="center" mt="4">
        <Button
          onClick={onStart}
          rightIcon={<TriangleDownIcon sx={{ transform: "rotate(-90deg)" }} />}
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
    </>
  );
};

export default TrackingTools;
