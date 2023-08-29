import React from "react";
import { Activity } from "../../main/api/types";
import { Flex, Text } from "@chakra-ui/react";

const ActivityItem = ({ title }: Activity) => {
  return (
    <Flex
      w="100%"
      sx={{
        borderRadius: 16,
        bg: "orange.400",
        height: 150,
        padding: (theme) => theme.space[4],
        transition: "transform ease .3s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(10px)",
        },
      }}
    >
      <Text
        sx={{
          fontSize: (theme) => theme.fontSizes["4xl"],
          fontWeight: (theme) => theme.fontWeights.black,
        }}
      >
        {title}
      </Text>
    </Flex>
  );
};

export default ActivityItem;
