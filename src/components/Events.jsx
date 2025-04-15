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
      const containerWidth = sliderRef.current.offsetWidth;
      const computedCardWidth = containerWidth / 1.2;
      setCardWidth(computedCardWidth);
    }
  }, []);

  const scroll = (direction) => {
    const maxIndex = EventCards.length - 1;
    let newIndex =
      direction === "left"
        ? Math.max(currentIndex - 1, 0)
        : Math.min(currentIndex + 1, maxIndex);

    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }

    setCurrentIndex(newIndex);
  };

  return (
    <section className="flex flex-col lg:flex-row gap-10 font-manrope justify-center items-center bg-[#FDFDFD] py-10 px-4 md:px-12">
      {/* Text Section */}
      <div className="flex flex-col items-start justify-center max-w-2xl gap-6 text-start">
        <h1 className="text-[#0076B2] text-4xl font-semibold text-left font-poppins">
          Upcoming Events
        </h1>
        <span className="max-w-2xl text-lg text-start gray-600 text-t">
          Mark your calendar for our exciting mini-events, including Twitter
          Spaces, Campus Tours, and IG Lives, designed to inspire and connect!
        </span>
      </div>

      {/* Slider + Buttons */}
      <div className="relative w-full max-w-[90vw] lg:max-w-3xl overflow-hidden">
        {/* Left button */}
        <button
          onClick={() => scroll("left")}
          className="absolute z-20 flex items-center justify-center w-10 h-10 text-gray-600 transition -translate-y-1/2 bg-white border border-gray-400 rounded-full shadow-md top-1/2 left-2 hover:bg-gray-100"
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Cards container */}
        <div
          ref={sliderRef}
          className="flex gap-6 py-6 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {EventCards.map((event) => (
            <div
              key={event.id}
              className="relative shrink-0"
              style={{
                width: `${cardWidth}px`,
                maxWidth: `${cardWidth}px`,
                height: "550px",
              }}
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="object-cover w-full h-full shadow-md rounded-xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-left text-white bg-gradient-to-t from-black/80 to-transparent">
                <p className="mt-2 text-lg font-medium">
                  {event.date} / {event.time}
                </p>
                <p className="mt-1 text-2xl font-bold">{event.description}</p>

                <Button className="w-full mt-4 text-lg">
                  Get Your Ticket
                </Button>
              </div>
            </div>
          ))}

          {/* Slide counter */}
          <div className="absolute z-30 items-center justify-center px-3 py-1 text-sm text-center text-white translate-x-1/2 rounded-full bottom-6 right-1/2 bg-black/70">
            {currentIndex + 1} / {EventCards.length}
          </div>
        </div>

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          className="absolute z-20 flex items-center justify-center w-10 h-10 text-gray-600 transition -translate-y-1/2 bg-white border border-gray-400 rounded-full shadow-md top-1/2 right-2 hover:bg-gray-100"
          disabled={currentIndex === EventCards.length - 1}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Events;
