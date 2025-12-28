import {
  Flex,
  Text,
  Box,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Activity } from "../../main/api/types";

interface ActivityItemProps extends Activity {
  onDelete: (id: number) => void;
}

const ActivityItem = ({ title, id, onDelete }: ActivityItemProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activity/${id}`);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
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

          transition: "transform ease .3s",
          outlineColor: "orange.400",
          outlineWidth: "5px",
          outlineStyle: "outset",
          outlineOffset: "4px",
          border: "1px solid white",
        }}
        pt={8}
        px={4}
        pb={4}
        onClick={handleClick}
      >
        <Text
          sx={{
            fontSize: theme => theme.fontSizes["4xl"],
            fontWeight: theme => theme.fontWeights.black,
          }}
        >
          {title}
        </Text>
        <IconButton
          sx={{ position: "absolute", top: 0, right: 0 }}
          aria-label="Delete Activity"
          icon={<CloseIcon />}
          onClick={handleDelete}
        />
      </Flex>
    </Box>
  );
};

export default ActivityItem;
