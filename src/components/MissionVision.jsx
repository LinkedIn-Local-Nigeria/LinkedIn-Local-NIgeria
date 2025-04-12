import React, { useState, useRef } from "react";
import Vision from '../assets/vision.svg'
import PlayBtn from '../assets/Play.svg'

const visionStatements = [
  {
    image: Vision,
    alt: "Vision Image"
  }
];

const MissionVision = () => {

  const [openIndex, setOpenIndex] = useState(null);
  const [activeAcc, setactiveAcc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);  // State to track if video is playing
  const [isHovered, setIsHovered] = useState(true);  

  const videoRef = useRef(null);  

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
    setactiveAcc(index)
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const accordions = [
    {
      count: 1,
      title: "Our mission",
      text: "To equip Nigerian youth with the networks, skills, and ideas necessary to drive innovation, ethical leadership, and sustainable growth.",
    },
    {
      count: 2,
      title: "Fueling Progress Through Community",
      text: "We embrace creativity and tech to find better ways to serve our clients.",
    },
    {
      count: 3,
      title: "Evolving Beyond the Narrative",
      text: "We build tools and paths that help individuals take control of their finances.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4 bg-white">
    
    <div className="w-full max-h-[470px] aspect-video rounded-xl overflow-hidden shadow mb-14 relative"
       onMouseEnter={() => setIsHovered(true)}
       onMouseLeave={() => setIsHovered(false)}
    >
    <video
      ref={videoRef} 
      className="w-full h-full object-cover"
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      autoPlay={false}
      loop
      muted
      playsInline
    />
    <div
    className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isHovered && !isPlaying ? "block" : "hidden"}`}
    >
    <img
      src={PlayBtn}
      onClick={handlePlayPause}  
      className=" text-white px-6 py-3 rounded-full "
    />
    </div>

  {/* Bottom Section with Text */}
  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent py-12 flex justify-center items-center">
    <p className="text-[20px]  text-white mt-4 mb-[-35px] text-center w-[80%]">
      Empowering professionals on LinkedIn to grow 11x faster with strategic design & development.
    </p>
  </div>
</div>


      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-sm text-left order-2 md:order-1">
          <h2 className="font-inter font-normal text-[20px] leading-[30px] tracking-[0px] text-zinc-600 text-left mb-3">
            OUR MISSION AND VISION
          </h2>
          <h1 className="font-poppins pb-2 text-left font-extrabold text-[40.09px] leading-[45px] tracking-normal text-[#0076B2]">
            We Gather, We Learn, We Evolve.
          </h1>

          <p className="text-gray-700 mb-4 text-left">
            LinkedIn Local Nigeria is bringing together forward-thinking individuals, thought leaders, 
            and change-makers to address the critical question: How do we collectively reshape Nigeria’s 
            future and chart a path toward sustainable growth?
          </p>

          {/* Accordion Section */}
          <div className="space-y-2">
            {accordions.map((item, index) => (
              <div
                key={index}
                className={`border-b  overflow-hidden  
                ${activeAcc === index ? 'border-[#0076B2]' : 'border-[#0076B21A]'}`}
              >
                <h1 className="w-[32px] h-[32px] gap-[6px] pt-[4px] pb-[4px] pl-[12px] rounded-[16px] bg-[#0076B21A] text-[#0076B2]">
                  {item.count}
                </h1>

                <h2
                  onClick={() => toggleOpen(index)}
                  className="w-full text-left py-1 text-[#414141] font-semibold text-[20px] leading-[30px] tracking-[-0.7px] font-poppins"
                >
                  {item.title}
                </h2>

                {openIndex === index && (
                  <div className="pb-2 mb-2 text-gray-600 bg-white">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-xl order-1 md:order-2">
          {visionStatements.map((statement, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={statement.image}
                alt={statement.alt}
                className="w-full max-w-[400px] h-auto"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MissionVision;
