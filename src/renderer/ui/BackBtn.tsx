import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <IconButton
      aria-label="back"
      icon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
    />
  );
};

export default BackBtn;
