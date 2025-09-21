import { motion, useAnimation } from "framer-motion";

import PropTypes from 'prop-types';
import { twMerge } from "tailwind-merge";
import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";

const sponsorsData = {
    headline: [
        {
            id: 1,
            name: "Zido",
            logo: "/zido.png",
            website: "https://zido.com"
        }
    ],
    platinum: [
        {
            id: 2,
            name: "Lagride",
            logo: "/lagride.png",
            website: "https://lagride.com"
        },
        {
            id: 3,
            name: "iFitness",
            logo: "/i-fitness.svg",
            website: "https://ifitness.ng"
        },


        {
            id: 4,
            name: "Ayotte Recruitment and Training Academy",
            logo: "/ayotte.png",
            website: "https://ayotterecruitment.com"
        }
    ],
    gold: [
        {
            id: 5,
            name: "ChaseScroll",
            logo: "/chasescroll.png",
            website: "https://chasescroll.com"
        },
        {
            id: 6,
            name: "CycleBreeze",
            logo: "/cyclebreeze.png",
            website: "https://cyclebreeze.ng"
        },
    ],
    silver: [
        {
            id: 7,
            name: "IDCL Africa",
            logo: "/idcl-africa.png",
            website: "https://idclafrica.com"
        },
        {
            id: 8,
            name: "Emmanuel Pixels",
            logo: "/emmanuel-pixels.png",
            website: "https://emmanuelpixels.com"
        },
        {
            id: 9,
            name: "LinkedIn Nurses",
            logo: "/linkedin-nurses.png",
            website: "https://linkedin.com/company/linkedin-nurses"
        }
    ]
};

const tierStyles = {
    headline: {
        title: "Headline Sponsor",
        titleClass: "text-3xl md:text-4xl font-semibold text-[#0076B2] mb-6",
        logoHeight: "h-40 md:h-16",
        logoWidth: "w-full ",
        containerClass: "flex flex-col items-center gap-6 mb-12",
        gridCols: "flex justify-center"
    },
    platinum: {
        title: "Platinum Sponsors",
        titleClass: "text-2xl md:text-3xl font-semibold text-[#0076B2] mb-6",
        logoHeight: "h-24 md:h-16",
        logoWidth: "w-full ",
        containerClass: "flex flex-col items-center gap-6 mb-12",
        gridCols: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
    },
    gold: {
        title: "Gold Sponsors",
        titleClass: "text-xl md:text-2xl font-semibold text-[#0076B2] mb-6",
        logoHeight: "h-24 md:h-16",
        logoWidth: "w-full ",
        containerClass: "flex flex-col items-center gap-6 mb-12",
        gridCols: "grid grid-cols-1 sm:grid-cols-2  gap-6 justify-items-center"
    },
    silver: {
        title: "Silver Sponsors",
        titleClass: "text-lg md:text-xl font-semibold text-[#0076B2] mb-6",
        logoHeight: "h-24 md:h-16",
        logoWidth: "w-full ",
        containerClass: "flex flex-col items-center gap-6 mb-12",
        gridCols: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center"
    }
};

const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

const logoVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    },
};

const SponsorLogo = ({ sponsor, logoHeight, logoWidth }) => (
    <motion.div variants={logoVariant} className="relative group">
        <a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 hover:scale-105"
        >
            <div className="flex items-center justify-center">
                <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className={twMerge(
                        logoHeight,
                        logoWidth,
                        "object-contain group-hover:brightness-110 transition-all duration-300"
                    )}
                />
            </div>
        </a>

        <div className="absolute z-10 transition-opacity duration-300 transform -translate-x-1/2 opacity-0 pointer-events-none -bottom-8 left-1/2 group-hover:opacity-100">
            <div className="px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg whitespace-nowrap">
                {sponsor.name}
            </div>
        </div>
    </motion.div>
);

SponsorLogo.propTypes = {
    sponsor: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
    }).isRequired,
    logoHeight: PropTypes.string.isRequired,
    logoWidth: PropTypes.string.isRequired,
};

const SponsorTier = ({ tier, sponsors }) => {
    if (!sponsors?.length) return null;

    const { title, titleClass, logoHeight, logoWidth, containerClass, gridCols } = tierStyles[tier];

    return (
        <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, threshold: 0.2 }}
            className={containerClass}
        >
            <motion.h3 variants={fadeIn} className={titleClass}>
                {title}
            </motion.h3>

            <div className={gridCols}>
                {sponsors.map(sponsor => (
                    <SponsorLogo
                        key={sponsor.id}
                        sponsor={sponsor}
                        logoHeight={logoHeight}
                        logoWidth={logoWidth}
                    />
                ))}
            </div>
        </motion.div>
    );
};

SponsorTier.propTypes = {
    tier: PropTypes.oneOf(['headline', 'platinum', 'gold', 'silver']).isRequired,
    sponsors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        website: PropTypes.string.isRequired,
    })).isRequired,
};



const SponsorsShowcase = () => {
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
            aria-labelledby="sponsors-section-heading"
            role="region"
        >
            {/* Header */}
            <motion.h1
                id="sponsors-section-heading"
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={fadeIn}
                className="text-2xl md:text-5xl text-center text-[#0076B2] font-semibold font-poppins w-full md:w-3/5"
            >
                Our success story, written with our partners
            </motion.h1>

            <motion.p
                initial="hidden"
                animate={controls}
                variants={fadeIn}
                className="text-sm md:text-xl text-[#52525B] font-manrope text-center w-[90%] md:w-3/4 pb-6"
                aria-describedby="sponsors-section-heading"
            >
                Each partnership is a vote of confidence in our shared future—helping us craft experiences that truly matter.
            </motion.p>

            <div className="w-full max-w-6xl">
                {Object.keys(tierStyles).map(tier => (
                    <SponsorTier
                        key={tier}
                        tier={tier}
                        sponsors={sponsorsData[tier]}
                    />
                ))}
            </div>

        </section>
    );
};

export default SponsorsShowcase;