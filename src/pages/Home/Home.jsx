import React from "react";
import Feature from "~/components/Home/Feature";
import Hero from "~/components/Home/Hero";

const Home = () => {
  return (
    <div className="w-full flex-grow flex flex-col justify-center items-center bg-bg bg-no-repeat bg-cover">
      <div className="flex w-full">
        <Hero />
        <Feature />
      </div>
    </div>
  );
};

export default Home;
