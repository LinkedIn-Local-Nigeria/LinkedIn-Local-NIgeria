import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const CountdownMarquee = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-10-04T00:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

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

  const wittyMessages = [
    `🎟️ LLN '25: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m left! Your FOMO is showing... Buy tickets before they disappear! `,
    `⚡ ${timeLeft.days} days until LLN '25! Still thinking about it? That's cute. Buy your ticket NOW! `,
    `🚀 LLN '25 in ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m! Don't be the friend who says "I wish I went..." Get your ticket! `,
    `🔥 ${timeLeft.days} days left! Your future self is begging you to buy that LLN '25 ticket RIGHT NOW! `,
    `💸 LLN '25: ${timeLeft.days}d ${timeLeft.hours}h away! Money can't buy happiness, but it can buy tickets to happiness! `,
    `🎭 ${timeLeft.days} days until the most epic event! Stop scrolling, start buying! LLN '25 tickets won't sell themselves! `,
    `⏰ ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m until LLN '25! Time's ticking louder than your excuses! Buy tickets! `,
    `🎪 The countdown is real: ${timeLeft.days} days to LLN '25! Your couch will understand if you leave it for this! `,
  ];

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
            x: [0, -2000]
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {wittyMessages.map((message, index) => (
            <span key={index} className="text-sm font-medium mx-8">
              {message}
            </span>
          ))}
        </motion.div>
      </div>

      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
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

export default CountdownMarquee;