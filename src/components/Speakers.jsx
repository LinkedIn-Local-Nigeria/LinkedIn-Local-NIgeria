import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { LinkedInLogoIcon } from '@radix-ui/react-icons';
import PropTypes from 'prop-types';
import { useInView } from 'framer-motion';

const items = [
    {
        image: 'tunde.svg',
        name: 'Tunde Onakoya',
        role: 'Founder, Chess in Slums Africa',
        linkedinUrl: 'https://www.linkedin.com/in/tundeonakoya'
    },
    {
        image: 'tonye.svg',
        name: 'Tonye Cole',
        role: 'Co-Founder, Sahara Groups',
        linkedinUrl: 'https://www.linkedin.com/in/tonyecole'
    },
    {
        image: 'tunde.svg',
        name: 'Tunde Onakoya',
        role: 'Founder, Chess in Slums Africa',
        linkedinUrl: '#'
    },
    {
        image: 'tunde.svg',
        name: 'Tunde Onakoya',
        role: 'Founder, Chess in Slums Africa',
        linkedinUrl: '#'
    },
    {
        image: 'tunde.svg',
        name: 'Tunde Onakoya',
        role: 'Founder, Chess in Slums Africa',
        linkedinUrl: '#'
    },
    {
        image: 'tunde.svg',
        name: 'Tunde Onakoya',
        role: 'Founder, Chess in Slums Africa',
        linkedinUrl: '#'
    }
];

function SpeakerCard({ item, index }) {

    SpeakerCard.propTypes = {
        item: PropTypes.object.isRequired,
        index: PropTypes.number.isRequired,
    };
    const ref = useRef(null);
    const isInView = useInView(ref, { threshold: 0.3 });
    const [hasAnimated, setHasAnimated] = useState(false);
    const glassControls = useAnimation();
    const fadeControls = useAnimation();

    useEffect(() => {
        if (isInView && !hasAnimated) {
            fadeControls.start('visible');
            glassControls.start('clear');
            setHasAnimated(true);
        } else if (!isInView) {
            fadeControls.set('hidden');
            glassControls.set('frosted');
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
                    transition: { duration: 0.8, delay: index * 0.2, ease: 'easeOut' }
                }
            }}
            className="relative overflow-hidden rounded-[1rem] shadow-lg border border-gray-200"
        >
            <img className="w-full object-cover" src={item.image} alt={item.name} />

            {/* Frosted Overlay */}
            <motion.div
                className="absolute inset-0 bg-white/10 backdrop-blur-md z-20"
                initial="frosted"
                animate={glassControls}
                variants={{
                    frosted: { opacity: 1 },
                    clear: {
                        opacity: 0,
                        transition: {
                            delay: 0.5 + index * 0.2,
                            duration: 1.5,
                            ease: 'easeInOut'
                        }
                    }
                }}
            />

            {/* Gradient & Content */}
            <div className="absolute flex justify-between items-end bottom-0 left-0 w-full h-64 rounded-b-[1.025rem] bg-gradient-to-t from-black/70 to-transparent z-10">
                <div className="flex flex-col mb-5">
                    <h3 className="ml-5 text-base font-bold text-left text-white font-poppins">
                        {item.name}
                    </h3>
                    <p className="ml-5 font-manrope text-[.685rem] text-white">{item.role}</p>
                </div>
                <a
                    href={item.linkedinUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name}'s LinkedIn profile`}
                >
                    <LinkedInLogoIcon className="w-[21.375px] h-[21.375px] mb-5 mr-5 text-white" />
                </a>
            </div>
        </motion.div>
    );
}

export default function Speakers() {
    const sectionRef = useRef(null);
    const sectionInView = useInView(sectionRef, { once: true, threshold: 0.3 });
    const controls = useAnimation();

    useEffect(() => {
        if (sectionInView) {
            controls.start('visible');
        } else {
            controls.set('hidden');
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
                        transition: { duration: 1, ease: 'easeOut' }
                    }
                }}
                className="flex flex-col items-center justify-center gap-4"
            >
                <h3 className="font-poppins text-[#0076B2] font-bold text-3xl md:text-[3.125rem] leading-[1.2]">
                    Meet our Incredible Speakers
                </h3>
                <p className="text-center md:w-3/5 xl:w-[55%] font-normal md:text-[1.125rem] font-manrope text-[#52525B]">
                    Prepare to be inspired by a lineup of visionary leaders, innovators, and
                    change-makers who are shaping the future of Nigeria and the global
                    landscape.
                </p>
            </motion.div>

            <div className="grid w-full grid-cols-1 gap-4 md:max-w-5xl md:grid-cols-2 xl:grid-cols-3">
                {items.map((item, index) => (
                    <SpeakerCard key={index} item={item} index={index} />
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="border border-[#0076B2] flex gap-2 py-4 px-[3.125rem] rounded-[.625rem] font-poppins text-[#0076B2] font-semibold text-base"
            >
                See all our speakers <img src="Icon.svg" alt="" />
            </motion.button>
        </section>
    );
}
