import React, { useEffect, useState } from "react";
import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Activity } from "../../main/api/types";
import ActivityItem from "./ActivityItem";

const ActivitiesList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    window.activitiesApi.getActivities().then((data) => {
      setActivities(data);
    });
  }, []);

  return (
    <>
      <Heading as="h1" mb={3}>
        Activities
      </Heading>
      <SimpleGrid columns={activities.length} spacing={6}>
        {activities.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ActivitiesList;
