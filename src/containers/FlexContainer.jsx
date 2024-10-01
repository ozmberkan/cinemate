import React from "react";

const FlexContainer = ({ children }) => {
  return <div className="flex flex-col flex-grow h-screen ">{children}</div>;
};

export default FlexContainer;
