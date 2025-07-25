import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import slugify from "slugify";
import { useNavigate } from "react-router-dom";

export default function SpeakerCards({ speaker, index = 0 }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { threshold: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const fadeControls = useAnimation();
  const glassControls = useAnimation();

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
  }, [isInView, hasAnimated, fadeControls, glassControls]);

  const handleCardClick = (e) => {
    // Don't navigate if clicking on LinkedIn link
    if (!e.target.closest('[data-linkedin-link]')) {
      navigate(`/speaker/${slugify(speaker.name, { lower: true })}`);
    }
  };

  const handleLinkedInClick = (e) => {
    // Prevent the card click event from firing
    e.stopPropagation();
  };

  return (
    <div className="block">
      <div
        className="relative block cursor-pointer"
        onClick={handleCardClick}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={fadeControls}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              },
            },
          }}
          className="relative aspect-[3/4] rounded-[1rem] overflow-hidden"
        >
          <img
            className="object-cover w-full h-full"
            src={speaker.image}
            alt={speaker.name}
            loading="lazy"
          />

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

          <div className="absolute flex justify-between items-end bottom-0 left-0 w-full h-64  rounded-[25px] bg-gradient-to-t from-black/70 to-transparent z-10">
            <div className="flex flex-col mb-5">
              <h3 className="ml-5 text-2xl font-bold text-left text-white font-poppins">
                {speaker.name}
              </h3>
              <p className="ml-5 text-sm text-left text-white font-manrope">
                {speaker.role}
              </p>
            </div>
            {speaker.linkedinUrl && (
              <a
                href={speaker.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${speaker.name}'s LinkedIn profile`}
                data-linkedin-link
                onClick={handleLinkedInClick}
                className="relative z-30"
              >
                <LinkedInLogoIcon className="w-10 h-10 mb-5 mr-5 text-white hover:text-blue-300 transition-colors" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

SpeakerCards.propTypes = {
  speaker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    linkedinUrl: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};