import {
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'
import { motion, useAnimation } from 'framer-motion'

import PropTypes from 'prop-types'
import { twMerge } from 'tailwind-merge'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const TeamSection = () => {
  const Teams = [
        {
          name: 'Oladotun Ajayi',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Oladotun-Ajayi.avif',
          role: 'Lead LLN',
          description:
            'It is possible to do great things from a small place'
        },
        {
          name: 'Emmanuel Nduka',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Emmanuel-Nduka.avif',
          role: 'Co-Lead LLN',
          description: 'No man can do these things except God be with him'
        },
        {
          name: 'Tomide Williams',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Tomide-Williams.avif',
          role: 'Team Management Lead',
          description: "If it's got to be, its' up to me"
        },
        {
          name: 'Chioma Arah',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Chioma-Arah.avif',
          role: 'Head, PR & Event Marketing',
          description:
            'Do the best you can until you know better'
        },
        {
          name: 'Goshen Mmoneke',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Goshen-Mmoneke.avif',
          role: 'Head, Awards Management',
          description: "There is nothing small about Goshen"
        },
        {
          name: 'Tosin Olomu',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Tosin-Olomu.avif',
          role: 'Head, Media',
          description:
            'You can do it'
        },
        {
          name: 'Alabi Joshua',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: "/Alabi-Joshua.avif",
          role: 'Head, Logistics',
          description: "Can't find your quote sir...."
        },
        {
          name: 'Bernice Orji',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: "/Bernice-Orji.avif",
          role: 'Head, Community',
          description: 'God is with her, she cannot fail'
        },
        {
          name: 'Clinton Okhai ',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Clinton-Okhai.avif',
          role: 'Head, Ticketing ',
          description: "Growth is your ultimate purpose your destiny is to multiply"
        },
        {
          name: 'Ebenezer Ogunbode',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: '/Ebenezer-Ogunbode.avif',
          role: 'Head, Event Management',
          description: "Don't do it afraid, do it by faith"
        },
        {
          name: 'Faizat Hussein',
          LinkedInURL: 'https://linkedin.com/in/tangafoaf',
          teamImg: "/Faizat-Hussein.avif",
          role: 'Head, Content & Social Media',
          description: "Dare to advance"
        },
        {
          name: 'Isreal Aluko',
          LinkedInURL: 'https://linkedin.com/in/eazyisreal',
          teamImg: "/Isreal-Aluko.avif",
          role: 'Head, Web Development',
          description: 'Do it afraid'
        },
      ]
    

      
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const [ref, inView] = useInView({
    triggerOnce: true, 
    threshold: 0.2
  })

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    } else {
      controls.start('hidden')
    }
  }, [inView, controls])



  return (
    <section
      className={twMerge(
        `text-gray-700 bg-[#fdfdfd] flex flex-col items-center gap-6 w-full py-12 md:px-6 xl:px-[7.25rem] px-4 font-manrope`
      )}
    >
          <motion.h1
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={variants}
        className='text-2xl text-center w-3/5 md:text-5xl text-[#0076B2] font-semibold font-poppins'
      >
        Behind every great event is a dedicated team. 
      </motion.h1>

      <motion.span
        initial='hidden'
        animate={controls}
        variants={variants}
        className='text-[.725rem] text-center w-[90%] md:w-3/4 md:text-xl text-[#52525B] font-poppins pb-18'
      >
        Get to know the passionate individuals driving this experience—creators, community builders, and visionaries committed to making a lasting impact. 
      </motion.span>

      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {Teams.map((team, index) => (
          <TeamCard key={index} team={team} index={index} />
        ))}
      </div>
    </section>
  );
};

const TeamCard = ({ team, index }) => {

  TeamCard.propTypes = {
    team: PropTypes.shape({
      name: PropTypes.string.isRequired,
      LinkedInURL: PropTypes.string.isRequired,
      teamImg: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
  }
  
  
  
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2, 
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }} 
      transition={{
        delay: index * 0.1, 
        duration: 0.2, 
      }}
      className='flex flex-col items-start w-full h-full gap-2 text-left bg-white'
    >
      <img
        src={team.teamImg}
        alt={team.role}
        className='object-cover w-full md:h-[400px] xl:w-[249.375px] mb-4 xl:h-[263.625px]'
      />
      <h3 className='text-[17.81px] leading-[26.72px] font-semibold text-[#101828]'>
        {team.name}
      </h3>
      <p className='text-sm md:text-base text-[#0076B2]'>{team.role}</p>
      <p className='mt-2 mb-4 text-[14.25px] text-[#667085]'>
        {team.description}
      </p>
      <div className='flex gap-1 mt-auto'>
        <a
          href={team.LinkedInURL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-[#98A2B3] transition'
        >
          <TwitterLogoIcon className='w-[21.375px] h-[21.375px]' />
        </a>
        <a
          href={team.LinkedInURL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-500 transition'
        >
          <LinkedInLogoIcon className='w-[21.375px] h-[21.375px]' />
        </a>
        <a
          href={team.LinkedInURL}
          target='_blank'
          rel='noopener noreferrer'
          className='text-gray-500 transition'
        >
          <GlobeIcon className='w-[21.375px] h-[21.375px]' />
        </a>
      </div>
    </motion.div>
  );
};

export default TeamSection;
