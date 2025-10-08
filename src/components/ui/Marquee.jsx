import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const PostEventMarquee = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastConfettiDate = sessionStorage.getItem('lastConfettiDate');
    
    if (lastConfettiDate !== today) {
      setShowConfetti(true);
      sessionStorage.setItem('lastConfettiDate', today);
      
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const postEventMessages = [
    `🎉 LLN '25 was a massive success! Thank you to all 5,000+ attendees who made it unforgettable! `,
    `✨ Missed LLN '25? Catch the highlights on youtube `,
    `🏆 LLN '25 brought together industry leaders, innovators, and game-changers. Were you part of history? `,
    `📸 Relive the magic! Browse LLN '25 photo gallery and see the moments that sparked connections. `,
    `💼 LLN '25 Alumni: Your network just grew by 5,000. Now it's time to leverage those connections! `,
    `🚀 The conversations started at LLN '25 don't end here. Join our community forum to keep the momentum going! `,
    `🎯 LLN '25 delivered breakthrough insights and powerful networking. Check out session recordings now! `,
    `⭐ Thank you for making LLN '25 legendary! Save the date for LLN '26 - it's going to be even bigger! `,
    `💡 LLN '25 testimonials are in: "Career-changing," "Inspiring," "Unmissable." Read what attendees are saying! `,
    `🔥 The energy, the speakers, the connections - LLN '25 exceeded all expectations! See you next year? `,
    `📱 Stay connected! Follow us for LLN '26 announcements, exclusive content, and community updates. `,
    `🎊 LLN '25 may be over, but the impact lives on. Share your experience and tag us! `
  ];

  // Create confetti particles
  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'][i % 7],
    delay: Math.random() * 2,
    x: Math.random() * 100,
  }));

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1790D0] to-[#0c5a7a] text-white py-2 overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -2500]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
        >
          {postEventMessages.map((message, index) => (
            <span key={index} className="mx-8 text-sm font-medium">
              {message}
            </span>
          ))}
        </motion.div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: particle.color,
                left: `${particle.x}%`,
                top: '-10px',
              }}
              initial={{ y: -10, rotate: 0, opacity: 1 }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: particle.delay,
                ease: "easeIn",
                opacity: {
                  times: [0, 0.8, 1],
                  duration: 3,
                }
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PostEventMarquee;