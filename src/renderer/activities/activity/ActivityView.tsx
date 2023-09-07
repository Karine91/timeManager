import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Box } from "@chakra-ui/react";

import { Activity } from "../../../main/api/types";

function ActivityView() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity>();
  useEffect(() => {
    window.activitiesApi.getActivityById(parseInt(id)).then((data) => {
      setActivity(data);
    });
  }, []);

  if (!activity) return "Loading...";

  return (
    <Box>
      <Text sx={{ textTransform: "uppercase", fontSize: "3xl" }}>
        {activity.title}
      </Text>
      <Text>{activity.description}</Text>
    </Box>
  );
}

export default ActivityView;
