import { Heading, SimpleGrid, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Activity } from "../../main/api/types";

import ActivityItem from "./ActivityItem";
import AddActivity from "./activity/AddActivity";
import { TaskFormValues } from "../tasks/TaskForm";

const ActivitiesList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    window.activitiesApi.getActivities().then(data => {
      setActivities(data);
    });
  }, []);

  const handleCreateActivity = (data: TaskFormValues) => {
    return window.activitiesApi.createActivity(data).then(newData => {
      setActivities(prev => [...prev, newData]);
    });
  };

  const handleDeleteActivity = (id: number) => {
    return window.activitiesApi.deleteActivity(id).then(data => {
      setActivities(prev => prev.filter(activity => activity.id !== id));
    });
  };

  return (
    <>
      <Heading as="h1" mb={5}>
        Activities
      </Heading>
      <AddActivity addActivityHandler={handleCreateActivity} />
      <SimpleGrid my={5} columns={activities.length} spacing={8}>
        {activities.map(item => (
          <ActivityItem
            key={item.id}
            {...item}
            onDelete={handleDeleteActivity}
          />
        ))}
      </SimpleGrid>
    </>
  );
};

export default ActivitiesList;
