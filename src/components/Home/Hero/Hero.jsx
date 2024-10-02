import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomeSvg from "~/assets/homeSvg.svg";

const Hero = () => {
  const text = " Filmler Bizi Bir Araya Getiriyor".split(" ");
  return (
    <div className="flex justify-center items-center flex-col gap-y-6 text-center h-screen ">
      <img src={HomeSvg} className="absolute w-full  -z-10 animate-pulse" />
      <div className="flex gap-x-5">
        {text.map((word, i) => (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.25,
              delay: i / 10,
            }}
            key={i}
            className="text-[100px] font-black bg-clip-text bg-gradient-to-br from-[#ff7171] to-[#ff0000] text-transparent drop-shadow-3xl "
          >
            {word}
          </motion.h1>
        ))}
      </div>
      <p className="text-white/90 w-2/3 text-xl font-semibold ">
        Bugün ne izleyeceğinizi bilmiyorsan, diğer kullanıcıların en çok
        beğendiği filmlere göz atın. Listeleri inceleyin ve filmler hakkında
        yorum yapın. Kendi listelerinizi oluşturun ve paylaşın. Böylelikle siz
        ve diğer filmseverler için en iyi filmi bulmak çok daha kolay olacak.
      </p>
      <Link
        to="/register"
        className="px-4 rounded-full border text-white border-white/20 py-2 hover:border-white  group-hover:opacity-100 hover:shadow-white-500 shadow-sm  hover:bg-gradient-to-t from-white/10 to-black/0 transition-all duration-1000"
      >
        Hemen Başla!
      </Link>
    </div>
  );
};

export default Hero;
