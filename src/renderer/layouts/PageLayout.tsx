import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import BackBtn from "../ui/BackBtn";

const PageLayout = () => {
  return (
    <Box>
      <BackBtn />
      <Box sx={{ mt: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
