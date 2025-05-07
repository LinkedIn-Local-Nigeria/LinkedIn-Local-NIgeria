import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { speakerData } from "./constants/speakers";

// Get the first 6 speakers for the initial display
// This is a temporary solution until we have a backend to fetch data from
const data = speakerData.slice(0, 6).map((item) => ({
  id: item.id,
  name: item.name,
  image: item.image,
  role: item.role,
  linkedinUrl: item.link,
}));

// Card Component
function SpeakerCard({ data, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const glassControls = useAnimation();
  const fadeControls = useAnimation();

  useEffect(() => {
    if (isInView && !hasAnimated) {
      fadeControls.start("visible");
      glassControls.start("clear");
      setHasAnimated(true);
    } else if (!isInView) {
      fadeControls.set("hidden");
      glassControls.set("frosted");
      setHasAnimated(false);
    }
  }, [fadeControls, glassControls, hasAnimated, isInView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={fadeControls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, delay: index * 0.2, ease: "easeOut" },
        },
      }}
      className="relative overflow-hidden rounded-[1rem] shadow-lg border border-gray-200"
    >
      <img className="object-cover w-full" src={data.image} alt={data.name} />

      {/* Frosted Overlay */}
      <motion.div
        className="absolute inset-0 z-20 bg-white/10 backdrop-blur-md"
        initial="frosted"
        animate={glassControls}
        variants={{
          frosted: { opacity: 1 },
          clear: {
            opacity: 0,
            transition: {
              delay: 0.5 + index * 0.2,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        }}
      />

      {/* Gradient & Content */}
      <div className="absolute flex justify-between items-end bottom-0 left-0 w-full h-64 rounded-b-[1.025rem] bg-gradient-to-t from-black/70 to-transparent z-10">
        <div className="flex flex-col mb-5">
          <h3 className="ml-5 text-2xl font-bold text-left text-white font-poppins">
            {data.name}
          </h3>
          <p className="ml-5 text-sm text-left text-white font-manrope">
            {data.role}
          </p>
        </div>
        <Link
          to={data.linkedinUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${data.name}'s LinkedIn profile`}
        >
          <LinkedInLogoIcon className="w-10 h-10 mb-5 mr-5 text-white" />
        </Link>
      </div>
    </motion.div>
  );
}

SpeakerCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    linkedinUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

// Speakers Section
export default function Speakers() {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (sectionInView) {
      controls.start("visible");
    } else {
      controls.set("hidden");
    }
  }, [controls, sectionInView]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center gap-12 px-4 py-20 xl:px-16"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <h3
          className="font-poppins text-[#0076B2] font-bold w-4/6 text-2xl md:text-3xl md:text-[3.125rem]"
          style={{ lineHeight: "3.4rem" }}
        >
          More than profiles. Real people. Real stories.
        </h3>
        <p className="text-center text-sm md:w-3/5 xl:w-[55%] font-normal md:text-[1.125rem] font-manrope text-[#52525B]">
          These are the voices shaping industries, changing the narrative,
          influencing conversations, and building what&apos;s next.
        </p>
      </motion.div>

      <div className="grid w-full grid-cols-1 gap-4 md:max-w-5xl md:grid-cols-2 xl:grid-cols-3">
        {data.map((item, index) => (
          <SpeakerCard key={item.id} data={item} index={index} />
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="border border-[#0076B2] flex gap-2 py-4 px-[3.125rem] rounded-[.625rem] font-poppins text-[#0076B2] font-semibold text-base"
      >
        <Link to="/AllSpeakers" className="flex items-center gap-2">
          See all our speakers <img src="Icon.svg" alt="" />
        </Link>
      </motion.div>
    </section>
  );
}
