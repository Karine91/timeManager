import React from "react";

interface IProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return <div>{children}</div>;
};

export default MainLayout;
