import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

import Button from "./ui/Button";
import Container from "./ui/Container";
import EventImage1 from "../assets/EventImage1.png";
import EventImage2 from "../assets/EventImage2.jpg";
import { motion } from "framer-motion";

const Events = () => {
  const EventCards = [
    {
      id: 1,
      title: "Event 1",
      description: "TechTalk 2025: Innovations Reshaping the Future",
      date: "2025 . 09 . 29",
      time: "10:00 AM",
      imageUrl: EventImage1,
    },
    {
      id: 2,
      title: "Event 2",
      description: "Code & Connect: Bridging Gaps with Digital Solutions",
      date: "2025 . 10 . 02",
      time: "11:00 AM",
      imageUrl: EventImage2,
    },
    {
      id: 3,
      title: "Event 3",
      description: "Empowering Africa through Tech Innovation",
      date: "2025 . 10 . 10", 
      time: "2:00 PM",
      imageUrl: EventImage1,
    },
    {
      id: 4,
      title: "Event 4",
      description: "Campus Connect: Next-Gen Builders",
      date: "2025 . 11 . 05", 
      time: "4:00 PM",
      imageUrl: EventImage2,
    },
    {
      id: 5,
      title: "Event 5",
      description: "Campus Connect: Next-Gen Builders",
      date: "2025 . 11 . 05", 
      time: "4:00 PM",
      imageUrl: EventImage2,
    },
  ];

  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const containerWidth = (sliderRef.current.offsetWidth) / 1.0;
      setCardWidth(containerWidth);
    }
  }, []);

  const scroll = (direction) => {
    const maxIndex = Math.max(0, EventCards.length - 2);
    const newIndex =
      direction === "left"
        ? Math.max(currentIndex - 2, 0)
        : Math.min(currentIndex + 2, maxIndex);

    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }

    setCurrentIndex(newIndex);
  };

  return (
    <section className="flex flex-col xl:flex-row justify-between items-start gap-8 px-4 xl:px-0 py-10 bg-[#FDFDFD] font-manrope">
      <Container>
        <div className="flex flex-col justify-end w-full gap-3 ml-auto xl:w-3/4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[#0076B2] text-left md:text-[35px] text-3xl font-semibold font-poppins"
          >
            Upcoming Event
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-sm md:text-[18px] md:leading-[28px] text-gray-700 text-left"
          >
            Mark your calendar for our exciting mini-events, including Twitter Spaces, Campus Tours, and IG Lives, designed to inspire and connect!
          </motion.p>
          <div className="items-center justify-start hidden gap-4 mt-6 xl:flex">
            <button
              onClick={() => scroll("left")}
              className="flex items-center justify-center w-10 h-10 border border-[#0076B2] rounded-full disabled:opacity-50 transform transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-12"
              disabled={currentIndex === 0}
              aria-label="Previous events"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
            </button>
            <div className="px-4 py-1 bg-[#fff] text-black rounded-full text-[18px]">
              {currentIndex + 1} / {EventCards.length}
            </div>
            <button
              onClick={() => scroll("right")}
              className="flex items-center justify-center w-10 h-10 border rounded-full border-[#0076B2] disabled:opacity-50 transform transition-all duration-500 ease-in-out hover:scale-110 hover:rotate-12"
              disabled={currentIndex === EventCards.length - 1}
              aria-label="Next events"
            >
              <ChevronRightIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={sliderRef}
        className="flex w-full gap-6 pb-4 overflow-x-auto xl:w-2/3 scroll-smooth no-scrollbar"
      >
        {EventCards.map((event) => (
          <motion.div
            key={event.id}
            className="min-w-[300px] shrink-0 relative border border-gray-200"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true}} 
            style={{ height: "420px" }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-sm font-medium text-left"
              >
                {event.date} / {event.time}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-1 text-lg font-semibold text-left"
              >
                {event.description}
              </motion.p>
              <Button className="mt-4 w-full bg-[#0076B2] hover:bg-[#005c8f] transform transition-transform duration-300 ease-out hover:scale-105">
                Get Your Ticket
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Events;
