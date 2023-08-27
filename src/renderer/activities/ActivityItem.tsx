import React from "react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Activity } from "../../main/api/types";
import Circle from "../ui/Circle";

const ActivityItem = (props: Activity) => {
  return <Circle size={200} thickness={14} value={40} color="green.400" />;
  //   return (
  //     <>
  //       <CircularProgress
  //         capIsRound
  //         size={200}
  //         thickness={4}
  //         sx={{
  //           ".chakra-progress__track": {
  //             boxShadow: "0 0 1px solid black",
  //           },
  //         }}
  //         valueText="text"
  //         value={40}
  //         color={"green.400"}
  //         trackColor="url(#cl1)"
  //       >
  //         <CircularProgressLabel>40%</CircularProgressLabel>
  //       </CircularProgress>
  //       <svg width="0" height="0">
  //         <defs>
  //           <linearGradient
  //             id="cl1"
  //             gradientUnits="objectBoundingBox"
  //             // x1="0"
  //             // y1="0"
  //             // x2="1"
  //             // y2="1"
  //           >
  //             <stop stop-color="#e32a89" />
  //             <stop offset="100%" stop-color="#498a98" />
  //           </linearGradient>
  //         </defs>
  //       </svg>
  //     </>
  //   );
};

export default ActivityItem;
