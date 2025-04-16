import React, { useState, useRef, useEffect } from "react";
import EventImage1 from "../assets/EventImage1.png";
import EventImage2 from "../assets/EventImage2.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import Button from "./ui/Button";

const Events = () => {
  const EventCards = [
    {
      id: 1,
      title: "Event 1",
      description: "TechTalk 2025: Innovations Reshaping the Future",
      date: "29 . 9 . 2025",
      time: "10:00 AM",
      imageUrl: EventImage1,
    },
    {
      id: 2,
      title: "Event 2",
      description: "Code & Connect: Bridging Gaps with Digital Solutions",
      date: "2023 . 10 . 02",
      time: "11:00 AM",
      imageUrl: EventImage2,
    },
    {
      id: 3,
      title: "Event 3",
      description: "Empowering Africa through Tech Innovation",
      date: "2023 . 10 . 10",
      time: "2:00 PM",
      imageUrl: EventImage1,
    },
    {
      id: 4,
      title: "Event 4",
      description: "Campus Connect: Next-Gen Builders",
      date: "2023 . 11 . 05",
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
    const maxIndex = EventCards.length - 1;
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
    <section className="flex flex-col md:flex-row justify-between items-start gap-8 px-6 md:px-12 py-10 bg-[#FDFDFD] font-manrope">
    {/* Left Column: Header, Description, Controls */}
    <div className="w-full md:w-1/3">
      <h2 className="text-[#0076B2] text-[35px] leading-[55px] font-semibold font-poppins">
        Upcoming Event
      </h2>
      <p className="text-[18px] leading-[28px] text-gray-700 mt-4">
        Mark your calendar for our exciting mini-events, including Twitter Spaces, Campus Tours, and IG Lives, designed to inspire and connect!
      </p>
      {/* Controls */}
      <div className="flex items-center gap-4 mt-6 justify-start">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
        </button>
        <div className="px-4 py-1 bg-[#fff] text-black rounded-full text-[18px]">
          {currentIndex + 1} / {EventCards.length}
        </div>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          disabled={currentIndex === EventCards.length - 1}
        >
          <ChevronRightIcon className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  
    {/* Right Column: Slider */}
    <div
      ref={sliderRef}
      className="w-full md:w-2/3 flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-4"
    >
      {EventCards.map((event) => (
        <div
          key={event.id}
          className="min-w-[300px] max-w-[330px] shrink-0 relative border border-gray-200 rounded-xl shadow-md"
          style={{ height: "420px" }}
        >
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl text-white">
            <p className="text-sm font-medium">{event.date} / {event.time}</p>
            <p className="text-lg font-semibold mt-1">{event.description}</p>
            <Button className="mt-4 w-full bg-[#0076B2] hover:bg-[#005c8f]">Get Your Ticket</Button>
          </div>
        </div>
      ))}
    </div>
  </section>
  
  );
};

export default Events;
