import { Flex, Separator, Text } from "@radix-ui/themes";

import Button from "./ui/Button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { WorldMap } from "./ui/WorldMap";
import { mapdots } from "./constants/mapdots";
import { motion } from "framer-motion";

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemsVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function HeroSection() {
  return (
    <>
      <WorldMap dots={mapdots} className="relative" />
      <img
        src="/heroimg.avif"
        alt="hero image"
        draggable="false"
        className="absolute w-full -mt-[10rem] sm:-mt-36 md:mt-[-12rem] lg:mt-[-19rem] xl:mt-[-20rem]"
        loading="lazy"
      />

      <motion.div
        className="flex flex-col items-center justify-center px-4 pt-20 pb-20 mx-auto text-center sm:pt-40 md:pt-44 lg:pt-40 xl:pt-48"
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.p
          variants={itemsVariant}
          viewport={{ once: true }}
          className="flex items-center gap-2 px-6 py-1 mb-4 text-sm font-light border border-gray-200 rounded font-manrope"
        >
          You&apos;re welcome to
          <img src="/check.svg" alt="check icon" loading="lazy" />
        </motion.p>

        {/* title */}
        <motion.h1
          variants={itemsVariant}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center mt-5 space-x-2 text-2xl font-bold text-center text-blue-600 font-poppins md:text-5xl"
        >
          <span className="flex items-center">
            Linked
            <LinkedInLogoIcon className="text-blue-600 h-7 w-7 md:h-14 md:w-14" />{" "}
          </span>
          <span style={{ letterSpacing: "150%" }}>Local Nigeria 2025</span>
        </motion.h1>

        {/* body content */}
        <div className="flex flex-col items-center justify-center w-full gap-4 mt-5">
          <motion.p
            variants={itemsVariant}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-sm font-normal font-manrope md:text-lg text-neutral-500"
          >
            Evolving Beyond the Narrative: An opportunity to connect, learn, and
            grow with professionals who are shaping the future!
          </motion.p>

          {/* facts */}
          <motion.div
            variants={itemsVariant}
            viewport={{ once: true }}
            className="pb-8"
          >
            <Text size="4" className="font-manrope">
              <Flex gap="5" align="center">
                <h3 className="flex items-center gap-2 font-bold sm:text-xl font-poppins">
                  <img src="/world.svg" alt="world icon" loading="lazy" />
                  5000+
                  <span className="text-sm font-normal font-manrope">
                    Attendees
                  </span>
                </h3>
                <Separator size="2" orientation="vertical" />
                <h3 className="flex items-center justify-center gap-2 font-bold sm:text-xl font-poppins">
                  <img src="/country.svg" alt="country icon" loading="lazy" />
                  10+
                  <span className="text-sm font-normal font-manrope">
                    World-Class-Speakers
                  </span>
                </h3>
              </Flex>
            </Text>
          </motion.div>

          {/* button */}
          <motion.div variants={itemsVariant} viewport={{ once: true }}>
            <Button className="w-[300px]">Get your ticket</Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
