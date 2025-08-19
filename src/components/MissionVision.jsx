import { useRef, useState } from "react";

import ViVid from '../assets/vivid.mp4';
import Vision from '/vision.png';
import { motion } from "framer-motion";

// import PlayBtn from '../assets/Play.svg';




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
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isHovered, setIsHovered] = useState(true);
  const videoRef = useRef(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setactiveAcc(index);
  };

  // const handlePlayPause = () => {
  //   if (videoRef.current) {
  //     if (isPlaying) {
  //       videoRef.current.pause();
  //     } else {
  //       videoRef.current.play().catch((error) => {
  //         console.error("Playback failed:", error);
  //       });
  //     }
  //     setIsPlaying(!isPlaying);
  //   }
  // };

  const accordions = [
    {
      count: 1,
      title: "About LinkedIn Local Nigeria",
      type: "paragraph",
      text: [
        "LinkedIn Local Nigeria (LLN) is the heartbeat of this movement in Africa’s largest professional community. From Lagos to Abuja, Kaduna to Jos, Ogbomoso to Abeokuta, we’ve brought thousands of professionals together to exchange ideas, form partnerships, and spark innovation",
        "In 2025, LLN takes the stage as Nigeria’s flagship gathering of visionaries and doers. Trailblazers committed to moving beyond stereotypes, reshaping perspectives, and proving that from every corner of Nigeria, global impact can emerge. This is more than an event. It’s a movement to evolve beyond the narrative and create a future driven by bold possibilities."
      ],
    },
    {
      count: 2,
      title: "Who’s It For?",
      type: "list",
      text: [
        "Young Professionals & Graduates",
        "Entrepreneurs & Startup Founders",
        "Business Executives & Decision-Makers",
        "Thought Leaders & Industry Experts",
        "Influencers & Creators",
        "Investors & VCs",
        "Tech Enthusiasts & AI Innovators",
        "NGO & Government Representatives",
        "Media, Creatives & Freelancers"
      ]
    }
  ];

  return (
    <motion.div
      className="w-full max-w-5xl px-6 py-12 mx-auto bg-white"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Video Section */}
      <div
        className="w-full max-h-[470px] aspect-video rounded-xl overflow-hidden shadow mb-14 relative"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          className="object-cover w-full h-full cursor-pointer"
          src={ViVid}
          autoPlay={false}
          playsInline
          controls
          controlsList="nodownload"
        />
        {/* <div
          className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 block`}
        >
          <img
            src={PlayBtn}
            onClick={handlePlayPause}
            className="cursor-pointer"
            alt="Play Button"
          />
        </div> */}

        {/* Bottom Section with Text */}
        {/* <div className="absolute bottom-0 left-0 flex items-center justify-center w-full py-12 bg-gradient-to-t from-black to-transparent">
          <p className="text-[.625rem] sm:text-[18px] md:text-[20px] lg:text-[22px] text-white mt-4 mb-[-35px] text-center w-[60%]">
            Empowering professionals on LinkedIn to grow 11x faster with strategic design & development.
          </p>

        </div> */}
      </div>

      {/* Mission & Vision Section */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Mission Section */}
        <motion.div
          className="order-2 text-left bg-white xl:order-1"
          variants={itemsVariant}
        >
          <motion.h2
            className="font-inter font-normal text-sm md:text-[20px] uppercase leading-[30px] tracking-[0px] text-zinc-600 text-left mb-3"
            variants={itemsVariant}
          >
            About LinkedIn Local
          </motion.h2>

          <motion.h1
            className="font-poppins pb-2 text-left font-extrabold text-[1.75rem] leading-[1] md:text-[40.09px] md:leading-[45px] tracking-normal text-[#0076B2]"
            variants={itemsVariant}
          >
            We Connect, We Collaborate, We Create Impact.
          </motion.h1>

          <motion.p
            className="mb-4 text-sm text-left text-gray-700 md:text-base leading-[1.5]"
            variants={itemsVariant}
          >
            LinkedIn Local is more than a meetup. It’s a global movement where professionals step beyond profiles to build relationships that matter. At LLN, conversations turn into opportunities, and opportunities evolve into real impact for careers, businesses, and communities.
          </motion.p>

          {/* Accordion Section */}
          <div className="space-y-6">
            {accordions.map((item, index) => (
              <motion.div
                key={index}
                className={`border-b overflow-hidden ${activeAcc === index ? "border-[#0076B2]" : "border-[#0076B21A]"}`}
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
                    {item.type === "list" ? (
                      <ul className="ml-6 space-y-1 list-disc">
                        {item.text.map((point, i) => (
                          <li className="text-sm md:text-base" key={i}>
                            {point}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      item.text.map((paragraph, i) => (
                        <p key={i} className="mb-2 text-sm md:text-base">
                          {paragraph}
                        </p>
                      ))
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          className="order-1 bg-white rounded-xl xl:order-2"
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
                className="w-full xl:max-w-[400px] h-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MissionVision;