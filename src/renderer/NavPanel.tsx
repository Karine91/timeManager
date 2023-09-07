import { Flex, Text } from "@chakra-ui/react";
import clsx from "clsx";
import { NavLink as RouterLink, To, NavLinkProps } from "react-router-dom";

interface CustomNavLinkProps {
  children: React.ReactNode;
  to: To;
}

const HashRouterLink = ({
  activeClassName,
  className,
  ...props
}: NavLinkProps & { activeClassName: () => string }) => {
  return <RouterLink {...props} className={clsx(activeClassName, className)} />;
};

const NavLink = ({ children, to }: CustomNavLinkProps) => {
  return (
    <Text
      as={HashRouterLink}
      to={to}
      activeClassName={() => {
        return window.location.hash === `#${to}` ? "active" : "";
      }}
      sx={{
        fontSize: "xl",
        transition: "transform ease .3s",
        marginBottom: 2,
        "&:hover": {
          transform: "translateX(20px)",
        },
        "&.active": {
          color: "orange.400",
        },
      }}
    >
      {children}
    </Text>
  );
};

const NavPanel = () => {
  return (
    <Flex
      p="4"
      align="flex-start"
      justify="center"
      direction="column"
      width={150}
    >
      <NavLink to="/">Activities</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </Flex>
  );
};

export default NavPanel;
