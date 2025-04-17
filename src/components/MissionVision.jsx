import React, { useState, useRef } from "react";
import Vision from '../assets/vision.svg';
import PlayBtn from '../assets/Play.svg';
import ViVid from '../assets/vivid.mp4';
import { motion } from "framer-motion";

// Animation Variants

const visionStatements = [
  {
    image: Vision,
    alt: "Vision Image"
  }
];


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

const MissionVision = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeAcc, setactiveAcc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(true);
  const videoRef = useRef(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setactiveAcc(index);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const accordions = [
    {
      count: 1,
      title: "Our mission",
      text: "To equip Nigerian youth with the networks, skills, and ideas necessary to drive innovation, ethical leadership, and sustainable growth.",
    },
    {
      count: 2,
      title: "Fueling Progress Through Community",
      text: "We embrace creativity and tech to find better ways to serve our clients.",
    },
    {
      count: 3,
      title: "Evolving Beyond the Narrative",
      text: "We build tools and paths that help individuals take control of their finances.",
    },
  ];

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto p-4 bg-white"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Video Section */}
      <div
        className="w-full max-h-[470px] aspect-video rounded-xl overflow-hidden shadow mb-14 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src={ViVid}
          autoPlay={false}
          playsInline
        />
        <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block`}
        >
          <img
            src={PlayBtn}
            onClick={handlePlayPause}
            className="cursor-pointer"
            alt="Play Button"
          />
        </div>

        {/* Bottom overlay text */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent py-12 flex justify-center items-center">
        <p className="text-[14px] sm:text-[13px] md:text-[18px] lg:text-[20px] xl:text-[22px] text-white mt-4 -mb-8 text-center w-[90%] sm:w-[85%] md:w-[80%]">
          Empowering professionals on LinkedIn to grow 11x faster with strategic design & development.
         </p>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Mission Section */}
        <motion.div
          className="bg-white rounded-xl shadow-sm text-left order-2 md:order-1"
          variants={itemsVariant}
        >
          <motion.h2
            className="font-inter font-normal text-[20px] leading-[30px] tracking-[0px] text-zinc-600 text-left mb-3"
            variants={itemsVariant}
          >
            OUR MISSION AND VISION
          </motion.h2>

          <motion.h1
            className="font-poppins pb-2 text-left font-extrabold text-[40.09px] leading-[45px] tracking-normal text-[#0076B2]"
            variants={itemsVariant}
          >
            We Gather, We Learn, We Evolve.
          </motion.h1>

          <motion.p
            className="text-gray-700 mb-4 text-left"
            variants={itemsVariant}
          >
            LinkedIn Local Nigeria is bringing together forward-thinking individuals, thought leaders, 
            and change-makers to address the critical question: How do we collectively reshape Nigeria’s 
            future and chart a path toward sustainable growth?
          </motion.p>

          {/* Accordion Section */}
          <div className="space-y-6">
            {accordions.map((item, index) => (
              <motion.div
                key={index}
                className={`border-b overflow-hidden ${activeAcc === index ? 'border-[#0076B2]' : 'border-[#0076B21A]'}`}
                variants={itemsVariant}
              >
                <h1 className="w-[32px] h-[32px] gap-[6px] pt-[4px] pb-[4px] pl-[12px] rounded-[16px] bg-[#0076B21A] text-[#0076B2]">
                  {item.count}
                </h1>

                <h2
                  onClick={() => toggleOpen(index)}
                  className="w-full text-left py-1 text-[#414141] font-semibold text-[20px] leading-[30px] tracking-[-0.7px] font-poppins cursor-pointer"
                >
                  {item.title}
                </h2>

                {openIndex === index && (
                  <motion.div
                    className="pb-2 mb-2 text-gray-600 bg-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.text}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="bg-white rounded-xl order-1 md:order-2"
          variants={itemsVariant}
        >
          {visionStatements.map((statement, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <img
                src={statement.image}
                alt={statement.alt}
                className="w-full max-w-[400px] h-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MissionVision;
