import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-y-6 text-center">
      <h1 className="text-[75px] font-black text-white">
        Filmler Bizi Bir Araya Getiriyor
      </h1>
      <p className="text-white w-4/5 text-lg font-semibold">
        Bugün ne izleyeceğinizi bilmiyorsanız, diğer kullanıcıların en çok
        beğendiği filmlere göz atın. Listeleri inceleyin ve filmler hakkında
        yorum yapın. Kendi listelerinizi oluşturun ve paylaşın. Böylelikle siz
        ve diğer filmseverler için en iyi filmi bulmak çok daha kolay olacak.
      </p>
      <Link
        to="/register"
        className="px-4 font-semibold py-2 rounded-md ring-offset-transparent bg-white text-black "
      >
        Hemen Başla!
      </Link>
    </div>
  );
};

export default Hero;
