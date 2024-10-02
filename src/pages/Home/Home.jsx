import React from "react";
import Feature from "~/components/Home/Feature";
import Hero from "~/components/Home/Hero";

const Home = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center min-h-screen ">
      <Hero />
      <Feature />
    </div>
  );
};

export default Home;
