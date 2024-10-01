import React from "react";
import { Outlet } from "react-router-dom";
import FlexContainer from "~/containers/FlexContainer";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  return (
    <FlexContainer>
      <Navbar />
      <Outlet />
    </FlexContainer>
  );
};

export default Layout;
