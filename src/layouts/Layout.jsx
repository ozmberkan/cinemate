import React from "react";
import { Outlet } from "react-router-dom";
import FlexContainer from "~/containers/FlexContainer";
import Navbar from "../components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";

const Layout = () => {
  return (
    <FlexContainer>
      <Navbar />
      <Outlet />
      <Footer />
    </FlexContainer>
  );
};

export default Layout;
