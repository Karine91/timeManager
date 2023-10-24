import { Task } from "../../main/api/types";
import { ListItem, useColorModeValue } from "@chakra-ui/react";

const TaskListItem = ({ title, description }: Task) => {
  return (
    <ListItem
      sx={{
        padding: 2,
        border: (theme) =>
          useColorModeValue(
            `1px solid ${theme.colors.gray[600]}`,
            `1px solid ${theme.colors.orange[100]}`
          ),
        marginBottom: (theme) => theme.space[2],
        paddingLeft: "20px",
        position: "relative",
        width: "300px",
        "&:before": {
          position: "absolute",
          content: '""',
          display: "block",
          width: "10px",
          top: 0,
          bottom: 0,
          left: 0,
          background: (theme) =>
            useColorModeValue(theme.colors.gray[600], theme.colors.orange[100]),
          opacity: 0.5,
        },
        clipPath: "polygon(0% 0%, 100% 0%, 100% 60%, 95% 100%, 0 100%)",
        "&:after": {
          position: "absolute",
          content: '""',
          display: "block",
          top: "41%",
          bottom: 0,
          left: "95%",
          width: "5%",
          height: "54%",
          transform: "rotate(43deg)",
          transformOrigin: "bottom left",

          border: (theme) =>
            useColorModeValue(
              `1px solid ${theme.colors.gray[600]}`,
              `1px solid ${theme.colors.orange[100]}`
            ),
        },
      }}
    >
      <div>{title}</div>
    </ListItem>
  );
};

export default TaskListItem;
