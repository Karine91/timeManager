import React, { useEffect } from "react";
import { Heading, HStack, Text } from "@chakra-ui/react";

const ActivitiesList = () => {
  useEffect(() => {
    window.activitiesApi.getActivities().then((data) => {
      console.log(data);
    });
  }, []);
  return (
    <>
      <Heading as="h1">Activities</Heading>
      <HStack>{}</HStack>
    </>
  );
};

export default ActivitiesList;
