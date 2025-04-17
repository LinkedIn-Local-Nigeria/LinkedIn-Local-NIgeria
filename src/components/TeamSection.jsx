import {
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon
} from '@radix-ui/react-icons'

import TeamImg from '../assets/Image.svg'
import TeamImg1 from '../assets/Image_1.svg'
import TeamImg2 from '../assets/Image_2.svg'
import TeamImg3 from '../assets/Image_3.svg'
import TeamImg4 from '../assets/Image_4.svg'
import TeamImg5 from '../assets/Image_5.svg'
import TeamImg6 from '../assets/Image_6.svg'
import TeamImg7 from '../assets/Image_7.svg'
import { twMerge } from 'tailwind-merge'

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

  return (
    <section
      className={twMerge(
        `text-gray-700 bg-[#fdfdfd] flex flex-col items-center gap-6 w-full py-12 md:px-6 xl:px-[7.25rem]  px-4 font-manrope`
      )}
    >
      <h1 className='text-2xl leading-[50px] text-center md:text-5xl text-[#0076B2] font-semibold font-poppins'>
        Meet the Team
      </h1>
      <span className='text-sm text-center md:w-3/4 md:text-xl text-[#52525B] font-poppins pb-18'>
        Behind every greate event is a dedicated team. Get to know the
        passionate individuals driving this experience, each commmitted to
        making a lasting impact and bringing innovative ideas to life
      </span>

      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {Teams.map((team, index) => (
          <div
            key={index}
            className='flex flex-col items-start w-full h-full gap-2 text-left bg-white'
          >
            <img
              src={team.teamImg}
              alt={team.role}
              className='object-cover w-full xl:w-[249.375px] mb-4 xl:h-[263.625px]'
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
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamSection
