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
    `🎯 LLN '25 in ${timeLeft.days} days: Where industry leaders gather and careers transform. Secure your spot now! `,
    `💼 ${timeLeft.days}d ${timeLeft.hours}h left! Join 5,000+ professionals who chose growth over excuses. Get your LLN '25 ticket! `,
    `🚀 ${timeLeft.days} days to LLN '25: The investment in yourself that pays dividends. Register before it's too late! `,
    `⚡ ${timeLeft.days} days until LLN '25! Smart professionals plan ahead. Smarter ones have already booked. Be smarter. `,
    `🎪 LLN '25: ${timeLeft.days}d ${timeLeft.hours}h remaining! Your competition is already registered. Don't let them get ahead! `,
    `🔥 ${timeLeft.days} days to the most anticipated professional event! Your future network is one ticket away. `,
    `💡 LLN '25 countdown: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m! Breakthrough moments don't wait for perfect timing. Book now! `,
    `🎖️ ${timeLeft.days} days left! LLN '25: Where today's decisions become tomorrow's success stories. Claim your seat! `,
    `⏰ ${timeLeft.days}d ${timeLeft.hours}h until LLN '25! The early bird gets more than the worm – they get the connections that matter. `,
    `🏆 LLN '25 in ${timeLeft.days} days! Winners show up. Champions register early. Legends were already there. Which are you? `,
    `💎 ${timeLeft.days}d ${timeLeft.hours}h to LLN '25! Your biggest regret won't be the ticket price – it'll be missing out. `,
    `🎭 ${timeLeft.days} days remaining! LLN '25: Where professional development meets personal transformation. Ready to level up? `
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