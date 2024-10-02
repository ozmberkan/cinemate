import { Link } from "react-router-dom";
import FeatureBox from "~/components/Home/Features/FeatureBox";
import { motion } from "framer-motion";
import featureSvg from "/Home/featuresSvg.svg";

import { Features } from "~/data/data";

const Feature = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="w-full text-white flex flex-col gap-y-12 justify-center items-start gap-x-10 px-20 h-screen relative"
    >
      <img src={featureSvg} className="absolute w-full " />

      <motion.h1
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-5xl font-semibold"
      >
        Neden cinemate kullanmalısın?
      </motion.h1>

      <motion.div
        className="w-full grid grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              staggerChildren: 0.3,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {Features.map((feature) => (
          <motion.div
            key={feature.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <FeatureBox label={feature.label} icon={feature.icon} />
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-zinc-500"
      >
        Sürekli olarak güncellenen ve geniş bir film arşivine sahip olan
        cinemate ile film beğenmek artık çok daha keyifli. Üstelik tüm bunlar
        için ücret ödemenize gerek yok.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/about"
          className="px-6 rounded-full border text-white font-semibold border-white/20 py-3 hover:border-white group-hover:opacity-100 hover:shadow-white-500 shadow-sm hover:bg-gradient-to-t from-white/10 to-black/0 transition-all duration-1000"
        >
          Detaylar
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Feature;
