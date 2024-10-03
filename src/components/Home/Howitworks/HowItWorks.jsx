import featuresSvg from "/Home/featuresSvg.svg";
import { howItWorks } from "~/data/data";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function HowItWorks() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-screen flex justify-center items-center"
    >
      {!isTabletOrMobile && (
        <img
          src={featuresSvg}
          className="absolute w-full -z-10"
          alt="Background SVG"
        />
      )}

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-y-5  justify-center text-center "
      >
        <motion.h2
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold sm:text-white mb-6 text-[#FF2A2A]"
        >
          Nasıl Çalışır?
        </motion.h2>
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-lg text-zinc-300 mb-12"
        >
          Üç basit adımda hedefinize ulaşın. İşte nasıl çalıştığını anlatıyoruz.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
              },
            },
          }}
          className="sm:grid sm:grid-cols-3 gap-12 flex flex-col gap-y-4"
        >
          {howItWorks.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-y-2 items-center justify-center text-center sm:px-0 px-5 "
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-[#FF2A2A] hidden text-white rounded-full sm:flex items-center justify-center mx-auto mb-4 ring-2 ring-offset-2 ring-offset-black ring-red-500"
              >
                <item.icon />
              </motion.div>
              <h3 className="sm:text-2xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-white">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default HowItWorks;
