import { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

const scheduleData = {
  title: 'LinkedIn Local Nigeria 2025 - Your day at a glance',
  days: [
    {
      dayNumber: 1,
      date: 'October 4th, 2025',
      venue: 'Trinity Towers, VI, Lagos',
      audience: '5,000+ guests',
      timeframe: '7:00 AM – 5:00 PM',
      sessions: [
        // Phase 0: Early Arrivals & Volunteer Setup
        {
          id: 'volunteer-setup',
          title: 'Volunteer arrival, setup, briefings',
          timeSlot: '7:00 – 7:30 AM',
          duration: '30 mins',
          timeFrame: '7am',
          type: 'setup',
          color: '#D9D9D9',
        },
        {
          id: 'hospitality-prep',
          title: 'Hospitality prep, sound/light checks, rehearsal',
          timeSlot: '7:30 – 8:00 AM',
          duration: '30 mins',
          timeFrame: '7am',
          type: 'setup',
          color: '#D9D9D9',
        },
        
        // Phase 1: Morning Immersion
        {
          id: 'guest-arrivals',
          title: 'Guest arrivals, networking music, soft ushering',
          timeSlot: '8:00 – 8:10 AM',
          duration: '10 mins',
          timeFrame: '8am',
          type: 'registration',
          color: '#D9D9D9',
        },
        {
          id: 'masterclass',
          title: 'Masterclass: Tosin Olaseinde',
          timeSlot: '8:10 – 8:50 AM',
          duration: '40 mins',
          timeFrame: '8am',
          type: 'masterclass',
          color: '#0076B2',
        },
        {
          id: 'registration',
          title: 'Registration push-in + settling',
          timeSlot: '8:50 – 9:00 AM',
          duration: '10 mins',
          timeFrame: '8am',
          type: 'registration',
          color: '#D9D9D9',
        },
        {
          id: 'opening-prayer',
          title: 'Opening Prayer',
          timeSlot: '9:00 – 9:03 AM',
          duration: '3 mins',
          timeFrame: '9am',
          type: 'ceremony',
          color: '#E1EF8B',
        },
        {
          id: 'national-anthem',
          title: 'National Anthem (Violin Performance)',
          timeSlot: '9:03 – 9:08 AM',
          duration: '5 mins',
          timeFrame: '9am',
          type: 'performance',
          color: '#E1EF8B',
        },
        {
          id: 'icebreaker',
          title: 'Icebreaker: "The Code Cluster Challenge"',
          timeSlot: '9:08 – 9:23 AM',
          duration: '15 mins',
          timeFrame: '9am',
          type: 'interactive',
          color: '#52525B',
        },
        {
          id: 'mc-opening',
          title: 'Opening Address by MC',
          timeSlot: '9:23 – 9:28 AM',
          duration: '5 mins',
          timeFrame: '9am',
          type: 'address',
          color: '#D9D9D9',
        },
        {
          id: 'convener-intro',
          title: 'Convener\'s Introduction (Video + Live)',
          timeSlot: '9:28 – 9:33 AM',
          duration: '5 mins',
          timeFrame: '9am',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'convener-speech',
          title: 'Convener\'s Speech: "Why We\'re Here"',
          timeSlot: '9:33 – 9:45 AM',
          duration: '12 mins',
          timeFrame: '9am',
          type: 'speech',
          color: '#0076B2',
        },

        // Phase 2: Keynote Block 1 — Voices of Impact
        {
          id: 'mc-transition-1',
          title: 'MC transition + housekeeping',
          timeSlot: '9:45 – 9:48 AM',
          duration: '3 mins',
          timeFrame: '9am',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-1',
          title: 'Introduction: Keynote 1',
          timeSlot: '9:48 – 9:51 AM',
          duration: '3 mins',
          timeFrame: '9am',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-1',
          title: 'Keynote 1: Tunde Onakoya',
          timeSlot: '9:51 – 10:11 AM',
          duration: '20 mins',
          timeFrame: '10am',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-1',
          title: 'MC remarks + Award 1',
          timeSlot: '10:11 – 10:14 AM',
          duration: '3 mins',
          timeFrame: '10am',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-2',
          title: 'Introduction: Keynote 2',
          timeSlot: '10:14 – 10:17 AM',
          duration: '3 mins',
          timeFrame: '10am',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-2',
          title: 'Keynote 2: Jesudamilare Adesegun-David',
          timeSlot: '10:17 – 10:37 AM',
          duration: '20 mins',
          timeFrame: '10am',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-2',
          title: 'MC remarks + Award 2',
          timeSlot: '10:37 – 10:40 AM',
          duration: '3 mins',
          timeFrame: '10am',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-3',
          title: 'Introduction: Keynote 3',
          timeSlot: '10:40 – 10:43 AM',
          duration: '3 mins',
          timeFrame: '10am',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-3',
          title: 'Keynote 3: Aishah Ahmad',
          timeSlot: '10:43 – 11:03 AM',
          duration: '20 mins',
          timeFrame: '11am',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-3',
          title: 'MC remarks + Award 3',
          timeSlot: '11:03 – 11:06 AM',
          duration: '3 mins',
          timeFrame: '11am',
          type: 'transition',
          color: '#D9D9D9',
        },

        // Phase 3: Interlude 1 — Art Meets Ambition
        {
          id: 'spoken-word',
          title: 'Spoken Word + Live Drawing Artist',
          timeSlot: '11:06 – 11:21 AM',
          duration: '15 mins',
          timeFrame: '11am',
          type: 'performance',
          color: '#E1EF8B',
        },
        {
          id: 'sponsor-spotlight-1',
          title: 'Sponsor Spotlight 1',
          timeSlot: '11:21 – 11:26 AM',
          duration: '5 mins',
          timeFrame: '11am',
          type: 'sponsor',
          color: '#D9D9D9',
        },

        // Phase 4: Panel Block 1 — Business Beyond Borders
        {
          id: 'fashion-show',
          title: 'Mini Fashion Show: "Dress the Part"',
          timeSlot: '11:26 – 11:36 AM',
          duration: '10 mins',
          timeFrame: '11am',
          type: 'fashion',
          color: '#E1EF8B',
        },
        {
          id: 'mc-remarks-4',
          title: 'MC remarks + Award 4 (fashion showcase)',
          timeSlot: '11:36 – 11:39 AM',
          duration: '3 mins',
          timeFrame: '11am',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'panel-intro-1',
          title: 'Panel 1 Introduction',
          timeSlot: '11:39 – 11:42 AM',
          duration: '3 mins',
          timeFrame: '11am',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'panel-1',
          title: 'Panel 1: Building Businesses That Thrive (Favour Ogazi, Oche Writes, Fabian George, Olubori Paul, Emmanuel Nduka)',
          timeSlot: '11:42 AM – 12:22 PM',
          duration: '40 mins',
          timeFrame: '12pm',
          type: 'session',
          color: '#52525B',
        },
        {
          id: 'mc-remarks-5',
          title: 'MC remarks + Award 5',
          timeSlot: '12:22 – 12:25 PM',
          duration: '3 mins',
          timeFrame: '12pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-4',
          title: 'Introduction: Keynote 4',
          timeSlot: '12:25 – 12:28 PM',
          duration: '3 mins',
          timeFrame: '12pm',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-4',
          title: 'Keynote 4: Samuel Ajiboyede',
          timeSlot: '12:28 – 12:48 PM',
          duration: '20 mins',
          timeFrame: '12pm',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-6',
          title: 'MC remarks + Award 6',
          timeSlot: '12:48 – 12:51 PM',
          duration: '3 mins',
          timeFrame: '12pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-5',
          title: 'Introduction: Keynote 5',
          timeSlot: '12:51 – 12:54 PM',
          duration: '3 mins',
          timeFrame: '12pm',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-5',
          title: 'Keynote 5: Tonye Cole',
          timeSlot: '12:54 – 1:14 PM',
          duration: '20 mins',
          timeFrame: '1pm',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-7',
          title: 'MC remarks + Award 7',
          timeSlot: '1:14 – 1:17 PM',
          duration: '3 mins',
          timeFrame: '1pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'sponsor-spotlight-2',
          title: 'Sponsor Spotlight 2 + Laptop Giveaway 1',
          timeSlot: '1:17 – 1:25 PM',
          duration: '8 mins',
          timeFrame: '1pm',
          type: 'sponsor',
          color: '#D9D9D9',
        },
        {
          id: 'networking-pulse',
          title: 'Interactive Networking Pulse (quick fireside Q&A with crowd)',
          timeSlot: '1:25 – 1:35 PM',
          duration: '10 mins',
          timeFrame: '1pm',
          type: 'interactive',
          color: '#52525B',
        },

        // Phase 5: Midday Recharge
        {
          id: 'networking-break',
          title: 'Refreshments, LinkedIn Wall of Fame, Headshots, Sponsor Booths',
          timeSlot: '1:35 – 2:00 PM',
          duration: '25 mins',
          timeFrame: '1pm',
          type: 'break',
          color: '#D9D9D9',
        },

        // Phase 6: Interlude 2 — Strings of Purpose
        {
          id: 'violin-performance',
          title: 'Violinist Performance + Sponsor Spotlight 3',
          timeSlot: '2:00 – 2:10 PM',
          duration: '10 mins',
          timeFrame: '2pm',
          type: 'performance',
          color: '#E1EF8B',
        },

        // Phase 7: Panel Block 2 — Creativity as Currency
        {
          id: 'mc-transition-2',
          title: 'MC transition + intro',
          timeSlot: '2:10 – 2:13 PM',
          duration: '3 mins',
          timeFrame: '2pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-6',
          title: 'Introduction: Keynote 6',
          timeSlot: '2:13 – 2:16 PM',
          duration: '3 mins',
          timeFrame: '2pm',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-6',
          title: 'Keynote 6: Moji Hunponu-Wusu',
          timeSlot: '2:16 – 2:36 PM',
          duration: '20 mins',
          timeFrame: '2pm',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-8',
          title: 'MC remarks + Award 8',
          timeSlot: '2:36 – 2:39 PM',
          duration: '3 mins',
          timeFrame: '2pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'fireside-intro',
          title: 'Fireside Chat Introduction',
          timeSlot: '2:39 – 2:42 PM',
          duration: '3 mins',
          timeFrame: '2pm',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'fireside-chat',
          title: 'Media/Creative Fireside Chat: Kemi Adetiba, Dr. Foy, Ayo Extreme, Beauty Tukura',
          timeSlot: '2:42 – 3:22 PM',
          duration: '40 mins',
          timeFrame: '3pm',
          type: 'session',
          color: '#52525B',
        },
        {
          id: 'mc-remarks-9',
          title: 'MC remarks + Award 9',
          timeSlot: '3:22 – 3:25 PM',
          duration: '3 mins',
          timeFrame: '3pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'speaker-intro-7',
          title: 'Introduction: Keynote 7',
          timeSlot: '3:25 – 3:28 PM',
          duration: '3 mins',
          timeFrame: '3pm',
          type: 'introduction',
          color: '#D9D9D9',
        },
        {
          id: 'keynote-7',
          title: 'Keynote 7: Taiwo Oyedele',
          timeSlot: '3:28 – 3:48 PM',
          duration: '20 mins',
          timeFrame: '3pm',
          type: 'keynote',
          color: '#0076B2',
        },
        {
          id: 'mc-remarks-10',
          title: 'MC remarks + Award 10',
          timeSlot: '3:48 – 3:51 PM',
          duration: '3 mins',
          timeFrame: '3pm',
          type: 'transition',
          color: '#D9D9D9',
        },
        {
          id: 'sponsor-spotlight-4',
          title: 'Sponsor Spotlight 4 + Laptop Giveaway 2',
          timeSlot: '3:51 – 3:56 PM',
          duration: '5 mins',
          timeFrame: '3pm',
          type: 'sponsor',
          color: '#D9D9D9',
        },

        // Phase 8: The Grand Finale — Celebration & Connection
        {
          id: 'closing-remarks',
          title: 'Closing Remarks by Convener + Group Photo',
          timeSlot: '3:56 – 4:05 PM',
          duration: '9 mins',
          timeFrame: '4pm',
          type: 'closing',
          color: '#0076B2',
        },
        {
          id: 'sponsor-spotlight-5',
          title: 'Sponsor Spotlight 5 + Laptop Giveaway 3',
          timeSlot: '4:05 – 4:15 PM',
          duration: '10 mins',
          timeFrame: '4pm',
          type: 'sponsor',
          color: '#D9D9D9',
        },
        {
          id: 'networking-kickoff',
          title: 'Open Networking Kickoff + Music Lounge',
          timeSlot: '4:15 – 4:30 PM',
          duration: '15 mins',
          timeFrame: '4pm',
          type: 'networking',
          color: '#E1EF8B',
        },
        {
          id: 'laptop-giveaway-4',
          title: 'Laptop Giveaway 4 (during networking)',
          timeSlot: '4:30 – 4:38 PM',
          duration: '8 mins',
          timeFrame: '4pm',
          type: 'giveaway',
          color: '#E1EF8B',
        },
        {
          id: 'laptop-giveaway-5',
          title: 'Laptop Giveaway 5 (surprise element)',
          timeSlot: '4:38 – 4:46 PM',
          duration: '8 mins',
          timeFrame: '4pm',
          type: 'giveaway',
          color: '#E1EF8B',
        },
        {
          id: 'final-networking',
          title: 'Networking, DJ + soft close',
          timeSlot: '4:46 – 5:00 PM',
          duration: '14 mins',
          timeFrame: '5pm',
          type: 'networking',
          color: '#E1EF8B',
        }
      ]
    }
  ]
};


function parseHour(tf) {
  const match = tf.match(/(\d+)(am|pm)/i);
  if (!match) return 0;
  const [_, hour, meridian] = match;
  let h = parseInt(hour, 10);
  if (meridian.toLowerCase() === 'pm' && h !== 12) h += 12;
  if (meridian.toLowerCase() === 'am' && h === 12) h = 0;
  return h;
}

function normalizeSession(session) {
  if (session.type === 'session') {
    return { ...session, color: '#52525B' };
  }
  if (session.type === 'keynote') {
    return { ...session, color: '#0076B2' };
  }
  if (session.type === 'performance' || session.type === 'fashion') {
    return { ...session, color: '#E1EF8B' };
  }
  return session;
}

const SessionCard = ({ session, hideMeta, extraTopPadding }) => {
  const getTypeStyles = (type) => {
    switch (type) {
      case 'masterclass':
      case 'keynote':
      case 'speech':
      case 'closing':
        return 'bg-[#0076B2] text-white';
      case 'session':
      case 'interactive':
        return 'bg-[#52525B] text-white';
      case 'performance':
      case 'fashion':
      case 'networking':
        return 'bg-[#E1EF8B] text-[#52525B]';
      case 'registration':
      case 'ceremony':
      case 'address':
      case 'introduction':
      case 'transition':
      case 'sponsor':
      case 'break':
        return 'bg-[#D9D9D9] text-[#52525B]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border-l-4 p-4 hover:shadow-md transition-all duration-300 ${
        extraTopPadding ? 'pt-8' : ''
      }`}
      style={{ borderLeftColor: session.color }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeStyles(session.type)}`}>
          {session.type}
        </div>
        {!hideMeta && (
          <span className="text-sm text-[#52525B] font-medium">
            {session.duration}
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-[#0076B2] mb-2 text-sm md:text-base leading-tight">
        {session.title}
      </h3>
      
      {!hideMeta && (
        <div className="space-y-1 text-xs md:text-sm text-[#52525B]">
          <p>
            <span className="font-medium">Time:</span> {session.timeSlot}
          </p>
        </div>
      )}
    </div>
  );
};

SessionCard.propTypes = {
  session: PropTypes.object.isRequired,
  hideMeta: PropTypes.bool,
  extraTopPadding: PropTypes.bool,
};


const DayColumn = ({ day }) => {
  const verticalSpanSession = day.sessions.find((s) => s.isFullSpan);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); 
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sessionsByTimeFrame = day.sessions
    .filter((s) => !s.isFullSpan)
    .reduce((acc, session) => {
      if (!acc[session.timeFrame]) acc[session.timeFrame] = [];
      acc[session.timeFrame].push(session);
      return acc;
    }, {});

  const sortedTimeFrames = Object.entries(sessionsByTimeFrame).sort(
    ([a], [b]) => parseHour(a) - parseHour(b)
  );

  const getVerticalSpanTimeFrames = () => {
    if (!verticalSpanSession) return [];
    const [startTime, endTime] = verticalSpanSession.timeSlot.split(' – ');
    const startHour = parseHour(startTime.replace(/:\d+/, '').trim());
    const endHour = parseHour(endTime.replace(/:\d+/, '').trim());

    return sortedTimeFrames
      .filter(([timeFrame]) => {
        const tfHour = parseHour(timeFrame);
        return tfHour >= startHour && tfHour <= endHour;
      })
      .map(([timeFrame]) => timeFrame);
  };

  const verticalSpanTimeFrames = getVerticalSpanTimeFrames();

  const preVerticalSpan = sortedTimeFrames.filter(
    ([tf]) => !verticalSpanTimeFrames.includes(tf)
  );
  const verticalSpanFrames = sortedTimeFrames.filter(([tf]) =>
    verticalSpanTimeFrames.includes(tf)
  );

  useEffect(() => {
    if (containerRef.current && !isMobile) {
      setHeight(containerRef.current.scrollHeight);
    }
  }, [day.sessions, isMobile]);

  const renderSessions = (grouped) => {
    return Object.entries(grouped).map(([key, group]) => {
      const hasGridableItems = group.some(session => 
        session.type === 'session' || session.type === 'keynote'
      );

      if (!hasGridableItems || (group.length === 1 && !hasGridableItems)) {
        return (
          <div key={key}>
            {group.map((session) => (
              <SessionCard
                key={session.id}
                session={normalizeSession(session)}
              />
            ))}
          </div>
        );
      }

      const chunks = [];
      for (let i = 0; i < group.length; i += 3) {
        chunks.push(group.slice(i, i + 3));
      }

      return (
        <div key={key} className="flex flex-col gap-4">
          {chunks.map((chunk, idx) => {
            const cols =
              chunk.length === 1
                ? 'grid-cols-1'
                : chunk.length === 2
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

            return (
              <div key={idx} className={`grid ${cols} gap-4`}>
                {chunk.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={normalizeSession(session)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      );
    });
  };

  const renderTimeFrameSection = (timeFrame, sessions, includeVerticalSpan = false) => {
    let allSessions = [...sessions];
    if (includeVerticalSpan && verticalSpanSession && verticalSpanSession.timeFrame === timeFrame) {
      allSessions.push(verticalSpanSession);
    }

    const grouped = allSessions.reduce((acc, session) => {
      const key = `${session.timeSlot}-${session.duration}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(session);
      return acc;
    }, {});

    return (
      <div key={timeFrame} className="flex flex-col gap-2 mb-4">
        <div className="flex items-center gap-4 sm:gap-8">
          <h2 className="font-bold text-sm sm:text-base whitespace-nowrap text-[#0076B2] font-poppins">{timeFrame}</h2>
          <hr className="flex-1 border-t-2 border-[#E1EF8B]" />
        </div>
        <div className="flex flex-col gap-4 sm:ml-8 md:ml-16">
          {renderSessions(grouped)}
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div className="flex flex-col gap-4 day-column">
        {sortedTimeFrames.map(([timeFrame, sessions]) => {
          const includeVerticalSpan = verticalSpanSession && verticalSpanSession.timeFrame === timeFrame;
          return renderTimeFrameSection(timeFrame, sessions, includeVerticalSpan);
        })}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-4 day-column">
      <div className="flex flex-col flex-1 gap-4">
        {preVerticalSpan.map(([timeFrame, sessions]) => 
          renderTimeFrameSection(timeFrame, sessions)
        )}
      </div>

      {verticalSpanSession && (
        <div className="flex gap-6">
          <div ref={containerRef} className="flex flex-col flex-1 gap-4">
            {verticalSpanFrames.map(([timeFrame, sessions]) => 
              renderTimeFrameSection(timeFrame, sessions)
            )}
          </div>

          <div className="flex-shrink-0 w-80">
            <div style={{ position: 'relative', height }}>
              <div className="sticky top-4">
                <SessionCard
                  session={normalizeSession(verticalSpanSession)}
                  hideMeta={false}
                  extraTopPadding={false}
                />
                <div className="mt-4 text-xs text-center text-gray-500">
                  <p>Extended networking session</p>
                  <p className="mt-1 text-xs">
                    ({verticalSpanTimeFrames.join(', ')})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

DayColumn.propTypes = {
  day: PropTypes.object.isRequired,
};

const Schedule = ({ data = scheduleData }) => {
  const [activeDay] = useState(1);
  const activeDayData = data.days.find(day => day.dayNumber === activeDay);
  
  
  return (
    <div 
      className="bg-[#fdfdfd] shadow-sm px-4 pt-32 bg-contain bg-no-repeat font-manrope"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center gap-6 md:p-4">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-5xl text-center md:text-left text-[#0076B2] font-poppins">
            {data.title}
          </h1>
        </div>
        
        {activeDayData && (
          <div className="mt-8">
            <DayColumn day={activeDayData} />
          </div>
        )}
      </div>
    </div>
  );
};

Schedule.propTypes = {
  data: PropTypes.object,
};

export default Schedule;