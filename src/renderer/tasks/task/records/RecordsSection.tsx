import { Box, List } from "@chakra-ui/react";
import React, { useState } from "react";
import TrackingTools from "../TrackingTools";
import { Record as TimeRecord } from "../../../../main/api/types";
import { format } from "date-fns/format";
import RecordItem from "../RecordItem";

const RecordsSection = ({ taskRecords }: { taskRecords: TimeRecord[] }) => {
  const [records, setRecords] = useState<TimeRecord[]>(taskRecords);

  // recalculated on every millisecond, so need to move counter to separate component
  const groupedRecords = records.reduce(
    (acc, cur) => {
      const date = format(cur.startTime, "dd.MM.yyyy");
      (acc[date] = acc[date] || []).push(cur);
      return acc;
    },
    {} as Record<string, TimeRecord[]>
  );

  const handleAddRecord = (records: TimeRecord[]) => {
    setRecords(records);
  };

  return (
    <Box>
      <TrackingTools onAddRecord={handleAddRecord} />
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
    </Box>
  );
};

export default RecordsSection;
