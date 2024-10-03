import React from "react";
import { Outlet } from "react-router-dom";
import FlexContainer from "~/containers/FlexContainer";
import Navbar from "../components/Navbar/Navbar";
import Footer from "~/components/Footer/Footer";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <FlexContainer>
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
      <Toaster
        toastOptions={{
          className: "",
          duration: 1500,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </FlexContainer>
  );
};

export default Layout;
