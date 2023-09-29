import React from "react";
import { Activity } from "../../main/api/types";
import { Flex, Text, Box, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ActivityItem = ({ title, id }: Activity) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activity/${id}`);
  };

  return (
    <Box
      sx={{
        perspective: "1000px",
        position: "relative",
        "&:hover": {
          ".activity-item": {
            cursor: "pointer",
            transform: "rotateX(10deg) translateY(10px)",
            "&:after": {
              content: "''",
              display: "block",
              background: "white",
            },
          },
          ".activity-item-shadow": {
            opacity: 1,
            width: "100%",
            height: "100%",
            display: "block",
            background: useColorModeValue("#898d93", "#1a1818"),
            position: "absolute",
            transform: "rotateX(10deg) translateY(30px)",
            filter: "blur(21px)",
            zIndex: -1,
          },
        },
      }}
    >
      <Box
        className="activity-item-shadow"
        sx={{ opacity: 0, transition: "transform, opacity ease .3s" }}
      />
      <Flex
        className="activity-item"
        w="100%"
        sx={{
          borderRadius: 16,
          bg: "orange.400",
          height: 150,
          padding: (theme) => theme.space[4],
          transition: "transform ease .3s",
          outlineColor: "orange.400",
          outlineWidth: "5px",
          outlineStyle: "outset",
          outlineOffset: "4px",
          border: "1px solid white",
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
    </Box>
  );
};

export default ActivityItem;
