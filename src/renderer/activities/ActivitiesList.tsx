import { AddIcon } from "@chakra-ui/icons";
import { Heading, SimpleGrid, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { Activity } from "../../main/api/types";

import ActivityItem from "./ActivityItem";
import AddActivity from "./activity/AddActivity";

const ActivitiesList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    window.activitiesApi.getActivities().then(data => {
      setActivities(data);
    });
  }, []);

  const handleCreateActivity = () => {
    console.log("create activity");
    return Promise.resolve();
  };

  return (
    <>
      <Heading as="h1" mb={5}>
        Activities
      </Heading>
      <AddActivity addActivityHandler={handleCreateActivity} />
      <SimpleGrid columns={activities.length} spacing={8}>
        {activities.map(item => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ActivitiesList;
