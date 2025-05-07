import {
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";
import { teamMembers } from "./constants/teamMember";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const TeamSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  return (
    <section
      className={twMerge(
        "bg-[#fdfdfd] text-gray-700 w-full py-12 px-4 md:px-6 xl:px-[7.25rem] font-manrope flex flex-col items-center gap-6"
      )}
    >
      <motion.h1
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="text-2xl md:text-5xl text-center text-[#0076B2] font-semibold font-poppins w-full md:w-3/5"
      >
        Behind every great event is a dedicated team.
      </motion.h1>

      <motion.p
        initial="hidden"
        animate={controls}
        variants={fadeIn}
        className="text-sm md:text-xl text-[#52525B] font-manrope text-center w-[90%] md:w-3/4 pb-6"
      >
        Get to know the passionate individuals driving this experience—creators,
        community builders, and visionaries committed to making a lasting
        impact.
      </motion.p>

      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} team={member} index={index} />
        ))}
      </div>
    </section>
  );
};

const TeamCard = ({ team, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="flex flex-col h-full gap-2 py-4 text-left"
    >
      <img
        src={team.teamImg}
        alt={team.role}
        className="object-cover w-full md:h-[400px] xl:w-[249.375px] mb-4 xl:h-[263.625px]"
      />
      <h3 className="text-lg font-semibold text-[#101828]">{team.name}</h3>
      <p className="text-sm text-[#0076B2]">{team.role}</p>
      <p className="text-[14px] text-[#667085] mb-3">{team.description}</p>
      <div className="flex gap-2 mt-auto">
        {[TwitterLogoIcon, LinkedInLogoIcon, GlobeIcon].map((Icon, i) => (
          <a
            key={i}
            href={team.LinkedInURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#98A2B3] hover:text-[#0076B2]"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </motion.div>
  );
};

TeamCard.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    LinkedInURL: PropTypes.string.isRequired,
    teamImg: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TeamSection;
