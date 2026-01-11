import { ListItem, useColorModeValue, Box, useToken } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

import { Task } from "../../main/api/types";
import CyberpunkItem from "../ui/CyberpunkItem";

const TaskListItem = ({ title, description, id, ...other }: Task) => {
  console.log(other);
  const [gray, orange] = useToken("colors", ["gray.600", "orange.100"]);
  const params = useParams();
  const navigate = useNavigate();
  const isRepeating = other.daysOfWeekRepeat.length > 0;
  return (
    <Box>
      <CyberpunkItem
        onClick={() => {
          navigate(`/activity/${params.id}/${id}`);
        }}
      >
        {title}
      </CyberpunkItem>
    </Box>
  );
};

export default TaskListItem;
