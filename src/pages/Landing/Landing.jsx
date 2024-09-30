import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="w-full h-screen flex justify-between items-center flex-col  py-12 ">
      <div className="  flex flex-col justify-center items-center relative ">
        <h1 className="text-[200px] font-bold bg-gradient-to-r from-[#F37E4F] to-[#f9bc2c] text-transparent bg-clip-text drop-shadow-3xl animate-pulse">
          Cinemate
        </h1>
        <div className="flex justify-center items-center text-center flex-col gap-y-5">
          <p className="w-full text-zinc-600 flex justify-center items-center text-4xl font-semibold">
            Filmler Bizi Bir Araya Getiriyor!
          </p>
          <p className="text-sm font-semibold text-zinc-400">
            En sevdiğiniz filmleri keşfedin, izleyin ve arkadaşlarınızla
            paylaşın.{" "}
          </p>
        </div>
        <div className="w-full flex justify-center items-center mt-12">
          <Link
            to="/register"
            className="px-4 font-medium py-2 rounded-md bg-gradient-to-r from-[#F37E4F] to-[rgb(249,188,44)] text-white transition-all hover:ring-2 ring-offset-2 ring-[#f9bc2c]"
          >
            Hemen Başla!
          </Link>
        </div>
      </div>

      <div className="text-zinc-400">
        2024 © Cinemate. Tüm hakları saklıdır.
      </div>
    </div>
  );
};

export default Landing;
