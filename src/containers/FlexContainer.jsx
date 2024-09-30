import React from "react";

const FlexContainer = ({ children }) => {
  return (
    <div className="flex justify-start items-start gap-x-5">{children}</div>
  );
};

export default FlexContainer;
