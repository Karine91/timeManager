import React from "react";
import { Activity } from "../../main/api/types";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ActivityItem = ({ title, id }: Activity) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activity/${id}`);
  };

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
      onClick={handleClick}
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
