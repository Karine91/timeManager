import { Task } from "../../main/api/types";
import { useNavigate, useParams } from "react-router-dom";
import { ListItem, useColorModeValue, Box, useToken } from "@chakra-ui/react";
import CyberpunkItem from "../ui/CyberpunkItem";

const TaskListItem = ({ title, description, id }: Task) => {
  const [gray, orange] = useToken("colors", ["gray.600", "orange.100"]);
  const params = useParams();
  const navigate = useNavigate();
  return (
    <CyberpunkItem
      onClick={() => {
        console.log(id);
        navigate(`/activity/${params.id}/${id}`);
      }}
    >
      {title}
    </CyberpunkItem>
  );
};

export default TaskListItem;
