import React from "react";
import Feature from "~/components/Home/Features/Feature";
import Hero from "~/components/Home/Hero/Hero";
import HowItWorks from "~/components/Home/Howitworks/HowItWorks";

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen ">
      <Hero />
      <Feature />
      <HowItWorks />
    </div>
  );
};

export default Home;
