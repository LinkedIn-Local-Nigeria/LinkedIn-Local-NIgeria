import {
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useMemo } from "react";

import PropTypes from "prop-types";
import { teamMembers } from "./constants/teamMember";
import { twMerge } from "tailwind-merge";
import { useInView } from "react-intersection-observer";

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
      aria-labelledby="team-section-heading"
      role="region"
    >
      <motion.h1
        id="team-section-heading"
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
        aria-describedby="team-section-heading"
      >
        Get to know the passionate individuals driving this experience—creators,
        community builders, and visionaries committed to making a lasting
        impact.
      </motion.p>

      <div 
        className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        role="list"
        aria-label="Team members"
      >
        {teamMembers.map((member, index) => (
          <TeamCard key={member.name || index} team={member} index={index} />
        ))}
      </div>
    </section>
  );
};

const TeamCard = ({ team, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  
  // Memoize social links to prevent unnecessary re-renders
  const socialLinks = useMemo(() => [
    {
      icon: TwitterLogoIcon,
      url: team.twitterURL,
      label: "Twitter profile",
      platform: "Twitter"
    },
    {
      icon: LinkedInLogoIcon,
      url: team.LinkedInURL,
      label: "LinkedIn profile",
      platform: "LinkedIn"
    },
    {
      icon: GlobeIcon,
      url: team.websiteURL,
      label: "Personal website",
      platform: "Website"
    },
  ], [team.twitterURL, team.LinkedInURL, team.websiteURL]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className="flex flex-col h-full gap-2 py-4 text-left"
      role="listitem"
      aria-label={`Team member: ${team.name}`}
    >
      <img
        src={team.teamImg}
        alt={`${team.name}, ${team.role}`}
        className="object-cover w-full rounded-lg aspect-[3/4] md:h-[400px] xl:w-[290.375px] mb-4 xl:h-[290.625px]"
        loading="lazy"
        decoding="async"
      />
      
      <h3 
        className="text-lg font-semibold text-[#101828]"
        id={`team-member-${index}-name`}
      >
        {team.name}
      </h3>
      
      <p 
        className="text-sm text-[#0076B2]"
        aria-label={`Role: ${team.role}`}
      >
        {team.role}
      </p>
      
      <p 
        className="text-[14px] text-[#667085] mb-3"
        aria-describedby={`team-member-${index}-name`}
      >
        {team.description}
      </p>
      
      <div 
        className="flex gap-2 mt-auto"
        role="list"
        aria-label={`Social media links for ${team.name}`}
      >
        {socialLinks.map(({ icon: Icon, url, label, platform }, i) => (
          url && (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#98A2B3] hover:text-[#0076B2] focus:outline-none focus:ring-2 focus:ring-[#0076B2] focus:ring-offset-2 rounded-sm transition-colors duration-200"
              aria-label={`Visit ${team.name}'s ${label}`}
              role="listitem"
            >
              <Icon 
                className="w-5 h-5" 
                aria-hidden="true"
                focusable="false"
              />
              <span className="sr-only">{platform}</span>
            </a>
          )
        ))}
      </div>
    </motion.div>
  );
};

TeamCard.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    LinkedInURL: PropTypes.string,
    twitterURL: PropTypes.string,
    websiteURL: PropTypes.string,
    teamImg: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TeamSection;