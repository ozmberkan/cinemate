import React from "react";
import FeatureBox from "~/components/Home/FeatureBox";

import { Features } from "~/data/data";

const Feature = () => {
  return (
    <div className="w-full h-[500px] text-white flex flex-col gap-y-5 justify-center items-center gap-x-10  px-20">
      {Features.map((feature) => (
        <FeatureBox
          key={feature.id}
          label={feature.label}
          icon={feature.icon}
        />
      ))}
    </div>
  );
};

export default Feature;
