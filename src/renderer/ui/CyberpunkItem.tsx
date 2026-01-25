import {
  ListItem,
  useColorModeValue,
  Box,
  useToken,
  ListItemProps,
  useTheme,
} from "@chakra-ui/react";
import React from "react";

type CyberpunkItemProps = {
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
} & ListItemProps;

const CyberpunkItem = ({
  children,
  sx,
  disabled,
  active,
  ...restProps
}: CyberpunkItemProps) => {
  const [gray, orange] = useToken("colors", ["gray.800", "orange.400"]);
  const bgHoverColor: [string, string] = [gray, orange];
  const theme = useTheme();

  return (
    <ListItem
      sx={{
        marginBottom: theme => theme.space[2],
        display: "flex",
        transition: "transform ease .3s",
        "&:hover": !disabled && {
          transform: "translateX(20px)",
          cursor: "pointer",
          ".main-part, .side-box, .main-part &:before": {
            background: theme => useColorModeValue(...bgHoverColor),
          },
          ".triangle": {
            fill: theme => useColorModeValue(...bgHoverColor),
          },
        },
        ...(active
          ? {
              fontWeight: "bold",
              ".main-part, .side-box, .main-part &:before": {
                background: theme => useColorModeValue(...bgHoverColor),
              },
              ".triangle": {
                fill: theme => useColorModeValue(...bgHoverColor),
              },
            }
          : {}),
        ...sx,
      }}
      {...restProps}
    >
      <Box
        className="main-part"
        sx={{
          padding: 2,
          border: theme =>
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
            background: theme =>
              useColorModeValue(
                theme.colors.gray[600],
                theme.colors.orange[100]
              ),
            opacity: 0.5,
          },
        }}
      >
        {children}
      </Box>
      <Box width={"20px"}>
        <Box
          className="side-box"
          sx={{
            height: "calc(100% - 20px)",
            width: "100%",
            border: theme =>
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
          height="20px"
          preserveAspectRatio="none"
          viewBox="0 0 40 40"
          strokeWidth={2}
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon className="triangle" points="0 40, 40 0, 0 0" fill="none" />
          <polyline
            points="0 40, 40 0"
            fill="none"
            stroke={useColorModeValue(
              theme.colors.gray[600],
              theme.colors.orange[100]
            )}
          />
        </svg>
      </Box>
    </ListItem>
  );
};

export default CyberpunkItem;
