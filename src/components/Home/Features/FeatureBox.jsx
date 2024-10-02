import React from "react";

const FeatureBox = ({ label, icon: Icon }) => {

  return (
    <div className="w-full overflow-hidden h-[150px] rounded-md relative  flex justify-center items-center bg-gradient-to-br from-red-500 ring-2 ring-offset-2 ring-offset-black ring-red-500 to-black border border-neutral-900 ">
      <span className="text-2xl font-semibold z-10">{label}</span>
      {Icon && (
        <Icon className="text-red-500/90 rotate-12 text-[200px] absolute z-0 -top-6 -left-12" />
      )}
    </div>
  );
};

export default FeatureBox;
