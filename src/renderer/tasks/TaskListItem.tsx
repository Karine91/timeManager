import { Task } from "../../main/api/types";
import { ListItem, useColorModeValue, Box, useToken } from "@chakra-ui/react";

const TaskListItem = ({ title, description }: Task) => {
  const [gray, orange] = useToken("colors", ["gray.600", "orange.100"]);
  return (
    <ListItem
      sx={{
        marginBottom: (theme) => theme.space[2],
        display: "flex",
        "&:hover": {
          cursor: "pointer",
          ".main-part, .side-box": {
            background: (theme) =>
              useColorModeValue(
                "rgba(161, 155, 146, 0.3)",
                "rgba(237, 137, 54, 0.8)"
              ),
          },
          ".triangle": {
            fill: (theme) =>
              useColorModeValue(
                "rgba(161, 155, 146, 0.3)",
                "rgba(237, 137, 54, 0.8)"
              ),
          },
          ".main-part &:before": {
            background: (theme) =>
              useColorModeValue(
                theme.colors.gray[800],
                theme.colors.orange[400]
              ),
          },
        },
      }}
    >
      <Box
        className="main-part"
        sx={{
          padding: 2,
          border: (theme) =>
            useColorModeValue(
              `1px solid ${theme.colors.gray[600]}`,
              `1px solid ${theme.colors.orange[100]}`
            ),
          borderRight: "none",
          width: "calc(100% - 20px)",
          paddingLeft: "20px",
          position: "relative",
          "&:before": {
            position: "absolute",
            content: '""',
            display: "block",
            width: "10px",
            top: 0,
            bottom: 0,
            left: 0,
            background: (theme) =>
              useColorModeValue(
                theme.colors.gray[600],
                theme.colors.orange[100]
              ),
            opacity: 0.5,
          },
        }}
      >
        {title}
      </Box>
      <Box width={"20px"}>
        <Box
          className="side-box"
          sx={{
            height: "60%",
            width: "100%",
            border: (theme) =>
              useColorModeValue(
                `1px solid ${theme.colors.gray[600]}`,
                `1px solid ${theme.colors.orange[100]}`
              ),
            borderLeft: "none",
            borderBottom: "none",
          }}
        />
        <svg
          width="100%"
          height="40%"
          preserveAspectRatio="none"
          viewBox="0 0 40 40"
          strokeWidth={2}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon className="triangle" points="0 40, 40 0, 0 0" fill="none" />
          <polyline
            points="0 40, 40 0"
            fill="none"
            stroke={useColorModeValue(gray, orange)}
          />
        </svg>
      </Box>
    </ListItem>
  );
};

export default TaskListItem;
