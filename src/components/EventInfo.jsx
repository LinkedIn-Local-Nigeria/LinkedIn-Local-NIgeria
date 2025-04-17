import { CalendarIcon } from "@radix-ui/react-icons";
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineMapPin } from "react-icons/hi2";
import { Text } from "@radix-ui/themes";
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

export function EventInfo() {
  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <Text size="4" className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
          <motion.div
            className="flex items-center gap-3"
            variants={itemsVariant}
            viewport={{ once: true }}
          >
            <div className="p-3 border-2 border-[#0076B2] rounded-full">
              <CalendarIcon className="w-5 h-5 text-[#0076B2] lg:h-8 lg:w-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0076B2] lg:text-4xl font-poppins">
              24th July 2025
            </h3>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemsVariant}
            viewport={{ once: true }}
            className="hidden lg:block w-[0.10rem] bg-gray-100 h-14"
          />

          <motion.div
            variants={itemsVariant}
            viewport={{ once: true }}
            className="block w-60 h-[0.10rem] bg-gray-100 lg:hidden"
          />

          <motion.div
            className="flex items-center gap-3"
            variants={itemsVariant}
            viewport={{ once: true }}
          >
            <div className="p-3 border-2 border-[#0076B2] rounded-full">
              <HiOutlineMapPin className="w-5 h-5 text-[#0076B2] lg:h-8 lg:w-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0076B2] lg:text-4xl font-poppins">
              Lagos Nigeria
            </h3>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemsVariant}
            viewport={{ once: true }}
            className="hidden lg:block w-[0.10rem] bg-gray-100 h-14"
          />
          <motion.div
            variants={itemsVariant}
            viewport={{ once: true }}
            className="block h-[0.10rem] bg-gray-100 w-60 lg:hidden"
          />

          <motion.div
            className="flex items-center gap-3"
            variants={itemsVariant}
            viewport={{ once: true }}
          >
            <div className="p-3 border-2 border-[#0076B2] rounded-full">
              <HiOutlineClock className="w-5 h-5 text-[#0076B2] lg:h-8 lg:w-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#0076B2] uppercase lg:text-4xl font-poppins">
              10AM
            </h3>
          </motion.div>
        </div>
      </Text>
    </motion.div>
  );
}
