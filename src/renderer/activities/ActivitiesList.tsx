import React, { useEffect, useState } from "react";
import { Heading, HStack, Text } from "@chakra-ui/react";
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
      <Heading as="h1">Activities</Heading>
      <HStack>
        {activities.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </HStack>
    </>
  );
};

export default ActivitiesList;
