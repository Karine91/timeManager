import React from "react";
import CyberpunkItem from "@renderer/ui/CyberpunkItem";
import { format, intervalToDuration, formatDuration } from "date-fns";
import { Record } from "../../../main/api/types";
import { Box, Flex } from "@chakra-ui/react";

const RecordItem = ({ description, startTime, endTime }: Record) => {
  const duration = intervalToDuration({
    start: startTime,
    end: endTime,
  });

  return (
    <CyberpunkItem>
      <Flex gap={10}>
        <span>
          {format(startTime, "H:mm")} - {format(endTime, "H:mm")}
        </span>
        <Box>
          {formatDuration(duration, {
            format: ["hours", "minutes", "seconds"],
          })}
        </Box>
        <Box>{description}</Box>
      </Flex>
    </CyberpunkItem>
  );
};

export default RecordItem;
