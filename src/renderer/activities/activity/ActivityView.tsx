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

  return (
    <Box
      sx={{ pl: "130px", height: "100%", position: "relative", width: "100%" }}
    >
      <Text
        sx={{
          fontSize: "9xl",
          fontWeight: "black",
          textTransform: "uppercase",
          lineHeight: 1,
          px: 4,
          bgGradient: "linear(to-r, yellow.400, orange.400, orange.400)",
          bgClip: "text",
          transform: "rotate(270deg)",
          position: "absolute",
          bottom: 0,
          left: 10,
          right: 0,
          transformOrigin: "left",
        }}
      >
        {activity?.title}
      </Text>
    </Box>
  );
}

export default ActivityView;
