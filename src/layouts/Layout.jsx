import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import FlexContainer from "~/containers/FlexContainer";

const Layout = () => {
  return (
    <FlexContainer>
      <Sidebar />
      <Outlet />
    </FlexContainer>
  );
};

export default Layout;
