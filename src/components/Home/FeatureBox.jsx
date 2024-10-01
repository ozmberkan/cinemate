import React from "react";

const FeatureBox = ({ label, icon: Icon }) => {
  return (
    <div className="w-full shadow-lg shadow-zinc-900 overflow-hidden h-[120px] rounded-md relative  flex justify-center items-center bg-gradient-to-r bg-neutral-950 ring-2 ring-offset-2 ring-offset-transparent ring-neutral-800">
      <span className="text-2xl font-semibold">{label}</span>
      {Icon && (
        <Icon className="text-white/10 rotate-12 text-[200px] absolute z-0 -top-6 -left-6" />
      )}
    </div>
  );
};

export default FeatureBox;
