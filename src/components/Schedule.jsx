import { motion, useAnimation } from "framer-motion";

import PropTypes from 'prop-types';
import { twMerge } from "tailwind-merge";
import { useEffect } from 'react';
import { useInView } from "react-intersection-observer";

// Sample LLN schedule data
const scheduleData = {
  title: 'Your Day at a Glance',
  date: 'Saturday, October 4, 2025',
  sessions: [
    {
      id: 'check-in',
      title: 'Check-in & Registration',
      timeSlot: '08:00am - 09:00am',
      venue: 'Main Lobby',
      duration: '1hr',
      timeFrame: '8am',
      type: 'Registration',
      color: '#D9D9D9',
    },
    {
      id: 'welcome-address',
      title: 'Welcome Address',
      timeSlot: '09:00am - 09:30am',
      venue: 'Main Hall',
      duration: '30m',
      timeFrame: '9am',
      type: 'Welcome',
      color: '#D9D9D9',
    },
    {
      id: 'keynote-1',
      title: 'The Future of Professional Networking in Africa',
      timeSlot: '09:30am - 10:15am',
      venue: 'Main Hall',
      duration: '45m',
      timeFrame: '9am',
      type: 'Keynote',
      speaker: 'Industry Leader',
      color: '#0076B2',
    },
    {
      id: 'panel-1',
      title: 'Building Your Personal Brand on LinkedIn',
      timeSlot: '10:15am - 11:00am',
      venue: 'Main Hall',
      duration: '45m',
      timeFrame: '10am',
      type: 'Panel Discussion',
      panelist: 'Marketing Experts & Thought Leaders',
      color: '#E1EF8B',
    },
    {
      id: 'networking-break-1',
      title: 'Networking Break',
      timeSlot: '11:00am - 11:30am',
      venue: 'Exhibition Area',
      duration: '30m',
      timeFrame: '11am',
      type: 'Break',
      color: '#D9D9D9',
    },
    {
      id: 'workshop-1',
      title: 'LinkedIn for Business: Lead Generation Strategies',
      timeSlot: '11:30am - 12:15pm',
      venue: 'Workshop Room A',
      duration: '45m',
      timeFrame: '11am',
      type: 'Workshop',
      speaker: 'Business Development Expert',
      color: '#52525B',
    },
    {
      id: 'workshop-2',
      title: 'Content Creation That Converts',
      timeSlot: '11:30am - 12:15pm',
      venue: 'Workshop Room B',
      duration: '45m',
      timeFrame: '11am',
      type: 'Workshop',
      speaker: 'Content Strategist',
      color: '#52525B',
    },
    {
      id: 'lunch',
      title: 'Networking Lunch',
      timeSlot: '12:15pm - 01:15pm',
      venue: 'Main Hall',
      duration: '1hr',
      timeFrame: '12pm',
      type: 'Lunch',
      color: '#D9D9D9',
    },
    {
      id: 'fireside-chat',
      title: 'Fireside Chat: Entrepreneurship in the Digital Age',
      timeSlot: '01:15pm - 02:00pm',
      venue: 'Main Hall',
      duration: '45m',
      timeFrame: '1pm',
      type: 'Fireside Chat',
      speaker: 'Successful Entrepreneur',
      color: '#0076B2',
    },
    {
      id: 'breakout-sessions',
      title: 'Breakout Sessions',
      timeSlot: '02:00pm - 02:45pm',
      venue: 'Multiple Rooms',
      duration: '45m',
      timeFrame: '2pm',
      type: 'Breakout Sessions',
      sessions: [
        'Career Transitions',
        'Tech Leadership',
        'Sales Excellence'
      ],
      color: '#E1EF8B',
    },
    {
      id: 'networking-break-2',
      title: 'Final Networking Session',
      timeSlot: '02:45pm - 03:15pm',
      venue: 'Exhibition Area',
      duration: '30m',
      timeFrame: '2pm',
      type: 'Networking',
      color: '#D9D9D9',
    },
    {
      id: 'closing',
      title: 'Closing Remarks & Group Photos',
      timeSlot: '03:15pm - 03:45pm',
      venue: 'Main Hall',
      duration: '30m',
      timeFrame: '3pm',
      type: 'Closing',
      color: '#0076B2',
    }
  ]
};

// Animation variants
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
      delayChildren: 0.2,
    },
  },
};

const sessionVariant = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// Helper function to parse hour
function parseHour(timeFrame) {
  const match = timeFrame.match(/(\d+)(am|pm)/i);
  if (!match) return 0;
  const [_, hour, meridian] = match;
  let h = parseInt(hour, 10);
  if (meridian.toLowerCase() === 'pm' && h !== 12) h += 12;
  if (meridian.toLowerCase() === 'am' && h === 12) h = 0;
  return h;
}

// Session card component
const SessionCard = ({ session }) => {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Keynote':
      case 'Fireside Chat':
      case 'Closing':
        return 'bg-[#0076B2] text-white';
      case 'Workshop':
        return 'bg-[#52525B] text-white';
      case 'Panel Discussion':
      case 'Breakout Sessions':
        return 'bg-[#E1EF8B] text-[#52525B]';
      case 'Break':
      case 'Lunch':
      case 'Registration':
      case 'Welcome':
      case 'Networking':
        return 'bg-[#D9D9D9] text-[#52525B]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div 
      variants={sessionVariant}
      className="p-4 transition-shadow duration-300 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(session.type)}`}>
          {session.type}
        </div>
        <span className="text-sm text-[#52525B] font-medium">
          {session.duration}
        </span>
      </div>
      
      <h3 className="font-semibold text-[#0076B2] mb-2 text-sm md:text-base">
        {session.title}
      </h3>
      
      <div className="space-y-1 text-xs md:text-sm text-[#52525B]">
        <p>
          <span className="font-medium">Time:</span> {session.timeSlot}
        </p>
        <p>
          <span className="font-medium">Venue:</span> {session.venue}
        </p>
        
        {session.speaker && (
          <p>
            <span className="font-medium">Speaker:</span> {session.speaker}
          </p>
        )}
        
        {session.panelist && (
          <p>
            <span className="font-medium">Panelists:</span> {session.panelist}
          </p>
        )}
        
        {session.sessions && (
          <div>
            <span className="font-medium">Topics:</span>
            <ul className="mt-1 ml-4 list-disc list-inside">
              {session.sessions.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

SessionCard.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    timeSlot: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    speaker: PropTypes.string,
    panelist: PropTypes.string,
    sessions: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

// Time frame section component
const TimeFrameSection = ({ timeFrame, sessions }) => {
  const renderSessions = () => {
    const chunks = [];
    for (let i = 0; i < sessions.length; i += 2) {
      chunks.push(sessions.slice(i, i + 2));
    }

    return chunks.map((chunk, idx) => {
      const cols = chunk.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2';
      
      return (
        <div key={idx} className={`grid ${cols} gap-4`}>
          {chunk.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      );
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6 sm:gap-8">
        <h2 className="font-bold text-lg md:text-xl text-[#0076B2] whitespace-nowrap font-poppins">
          {timeFrame}
        </h2>
        <hr className="flex-1 border-t-2 border-[#E1EF8B]" />
      </div>
      
      <div className="flex flex-col gap-4 ml-0 md:ml-8">
        {renderSessions()}
      </div>
    </div>
  );
};

TimeFrameSection.propTypes = {
  timeFrame: PropTypes.string.isRequired,
  sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Main schedule component
const LLNSchedule = ({ data = scheduleData }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    controls.start(inView ? "visible" : "hidden");
  }, [inView, controls]);

  // Group sessions by time frame
  const sessionsByTimeFrame = data.sessions.reduce((acc, session) => {
    if (!acc[session.timeFrame]) acc[session.timeFrame] = [];
    acc[session.timeFrame].push(session);
    return acc;
  }, {});

  // Sort time frames
  const sortedTimeFrames = Object.entries(sessionsByTimeFrame).sort(
    ([a], [b]) => parseHour(a) - parseHour(b)
  );

  return (
    <section
      className={twMerge(
        "bg-[#fdfdfd] w-full py-40 px-4 md:px-6 xl:px-[7.25rem] font-manrope"
      )}
      aria-labelledby="schedule-section-heading"
      role="region"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeIn}
          className="mb-12 text-center"
        >
          <h1
            id="schedule-section-heading"
            className="text-2xl md:text-5xl text-[#0076B2] font-semibold font-poppins mb-4"
          >
            {data.title}
          </h1>
          <p className="text-lg md:text-xl text-[#52525B] font-manrope">
            {data.date}
          </p>
        </motion.div>

        {/* Schedule */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, threshold: 0.1 }}
          className="space-y-8"
        >
          {sortedTimeFrames.map(([timeFrame, sessions]) => (
            <TimeFrameSection
              key={timeFrame}
              timeFrame={timeFrame}
              sessions={sessions}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

LLNSchedule.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sessions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

export default LLNSchedule;