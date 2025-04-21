import { Flex, Separator, Text } from "@radix-ui/themes";

import Button from "./ui/Button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { WorldMap } from "./ui/WorldMap";
import { mapdots } from "./constants/mapdots";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemsVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const pageTransition = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } },
};


export function HeroSection() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative"
    >
      <WorldMap dots={mapdots} className="relative" />

      <motion.img
        src="/people.avif"
        alt="hero image"
        draggable="false"
        className="absolute w-full -mt-[3rem] sm:-mt-36 md:mt-[-5rem] lg:mt-[-19rem] xl:mt-[-10rem]"
        loading="lazy"
        initial={{ y: 0 }}
        whileInView={{ y: -30 }}
        transition={{ type: "spring", stiffness: 50 }}
      />

      <motion.div
        className="flex flex-col items-center justify-center px-4 pt-20 pb-20 mx-auto text-center sm:pt-40 md:pt-44 lg:pt-40 xl:pt-48"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
      >
        <motion.p
          variants={itemsVariant}
          className="flex items-center gap-2 px-6 py-1 mb-4 text-sm font-light border border-gray-200 rounded font-manrope"
        >
          You&apos;re welcome to
          <img src="/check.svg" alt="check icon" loading="lazy" />
        </motion.p>

        <motion.h1
          variants={itemsVariant}
          className="flex flex-wrap items-center justify-center mt-5 space-x-2 text-2xl font-bold text-center text-[#0076B2] font-poppins md:text-5xl"
        >
          <span className="flex items-center">
            Linked
            <LinkedInLogoIcon className="text-[#0076B2] h-7 w-7 md:h-14 md:w-14" />{" "}
          </span>
          <span>Local Nigeria </span>
        </motion.h1>

        <div className="flex flex-col items-center justify-center w-full gap-4 mt-5">
          <motion.p
            variants={itemsVariant}
            className="max-w-xl mx-auto text-sm font-normal font-manrope md:text-lg text-neutral-500"
          >
            Evolving Beyond the Narrative: An opportunity to connect, learn, and
            grow with professionals who are shaping the future.
          </motion.p>

          <motion.div variants={itemsVariant} className="pb-8">
            <Text size="4" className="font-manrope">
              <Flex gap="5" align="center">
                <h3 className="flex items-center gap-2 text-sm font-bold sm:text-xl font-poppins">
                  <img
                    className="w-3 md:w-full"
                    src="/world.svg"
                    alt="world icon"
                    loading="lazy"
                  />
                  5000+
                  <span className="font-normal text-[.625rem] md:text-sm font-manrope">
                  Changemakers 
                  </span>
                </h3>
                <Separator size="2" orientation="vertical" />
                <h3 className="flex items-center justify-center gap-2 text-sm font-bold whitespace-nowrap sm:text-xl font-poppins">
                  <img
                    className="w-3 md:w-full"
                    src="/country.svg"
                    alt="country icon"
                    loading="lazy"
                  />
                  10+
                  <span className="text-[.625rem] md:text-sm font-normal font-manrope">
                    World-Class-Speakers
                  </span>
                </h3>
              </Flex>
            </Text>
          </motion.div>

          <motion.div
            variants={itemsVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button className="w-[300px]">Get your ticket</Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
