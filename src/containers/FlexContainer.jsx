import React from "react";

const FlexContainer = ({ children }) => {
  return <div className="flex flex-col container mx-auto">{children}</div>;
};

export default FlexContainer;
