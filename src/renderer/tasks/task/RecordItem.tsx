import { Box, Flex } from "@chakra-ui/react";
import { format, intervalToDuration, formatDuration } from "date-fns";
import React from "react";

import CyberpunkItem from "@renderer/ui/CyberpunkItem";

import { Record } from "../../../main/api/types";

const RecordItem = ({
  description,
  startTime,
  endTime,
  minutes,
  hours,
  seconds,
}: Record) => {
  // not right , cause we can pause our timer, so duration should come from the counter
  // this would be valid for manual input

  return (
    <CyberpunkItem>
      <Flex gap={10}>
        <span>
          {format(startTime, "H:mm")} - {format(endTime, "H:mm")}
        </span>
        <Box>
          {formatDuration(
            {
              hours,
              minutes,
              seconds,
            },
            {
              format: ["hours", "minutes", "seconds"],
            }
          )}
        </Box>
        <Box>{description}</Box>
      </Flex>
    </CyberpunkItem>
  );
};

export default RecordItem;
