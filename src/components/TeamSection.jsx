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
      name: 'Olivia Rhye',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg,
      role: 'Founder & CEO',
      description:
        'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.'
    },
    {
      name: 'Phoenix Baker',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg1,
      role: 'Engineering Manager',
      description: 'Lead engineering teams at Figma, Pitch and Protocol Labs.'
    },
    {
      name: 'Lana Steiner',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg2,
      role: 'Product Manager',
      description: 'Former PM for Linear, Lambda School and On Deck'
    },
    {
      name: 'Demi Wilkinson',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg3,
      role: 'Frontend Developer',
      description:
        'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.'
    },
    {
      name: 'Candice Wu',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg4,
      role: 'Backend Developer',
      description: 'Lead backend dev at Clearbit, Former Clearbit and Loom'
    },
    {
      name: 'Natali Craig',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg5,
      role: 'Product Designer',
      description:
        'Founding design team at Figma, Former Pleo, Stripe and Tile.'
    },
    {
      name: 'Drew Cano',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg6,
      role: 'UX Researcher',
      description:
        'Lead user research for Slack, Contractor for Netflix and Udacity'
    },
    {
      name: 'Orlando Diggs',
      LinkedInURL: 'https://linkedin.com/in/tangafoaf',
      teamImg: TeamImg7,
      role: 'Customer Success',
      description: 'Lead CX at Wealthsimple. Former PagerDuty and Sqreen'
    }
  ]

  return (
    <section
      className={twMerge(
        `text-gray-700 bg-[#fdfdfd] min-h-screen flex flex-col gap-6 w-full py-12 md:px-[7.25rem]`
      )}
    >
      <h1 className='text-4xl font-bold text-center md:text-5xl font-poppins '>
        Meet the Team
      </h1>
      <span className='text-lg text-center md:text-xl font-poppins pb-18'>
        Behind every greate event is a dedicated team. Get to know the
        passionate individuals driving this experience, each commmitted to
        making a lasting impact and bringing innovative ideas to life
      </span>

      <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {Teams.map((team, index) => (
          <div
            key={index}
            className='flex flex-col items-start h-full gap-2 text-left bg-white'
          >
            <img
              src={team.teamImg}
              alt={team.role}
              className='object-cover w-full mb-4 h-60'
            />
            <h3 className='text-2xl font-semibold text-gray-900'>
              {team.name}
            </h3>
            <p className='text-lg text-gray-500'>{team.role}</p>
            <p className='mt-2 mb-4 text-lg text-gray-400'>
              {team.description}
            </p>
            <div className='flex gap-3 mt-auto'>
              <a
                href={team.LinkedInURL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 transition hover:text-blue-600'
              >
                <TwitterLogoIcon className='w-9 h-9' />
              </a>
              <a
                href={team.LinkedInURL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 transition hover:text-blue-800'
              >
                <LinkedInLogoIcon className='w-9 h-9' />
              </a>
              <a
                href={team.LinkedInURL}
                target='_blank'
                rel='noopener noreferrer'
                className='text-gray-500 transition hover:text-blue-800'
              >
                <GlobeIcon className='w-9 h-9' />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default TeamSection
