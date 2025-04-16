import React from "react";
import ScoopImage from "../assets/Scoop.svg";
import Button from "./ui/Button";

const NewsletterCTA = () => {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-10 px-6 py-16 bg-white font-manrope font- lg:flex-row">
      {/* Text Side */}
      <div className="max-w-xl text-center lg:text-left mb-36">
        <h2 className="text-[50px] font-extrabold text-[#0076B2] font-poppins mb-4 leading-[55.3px]">
          Get the Inside Scoop
        </h2>
        <p className="mb-6 text-[20px] text-[#3F3F46] leading-[27.65px] font-manrope">
          Sign up now for exclusive updates and be the first to know about event news, speakers, and more!
        </p>
        <Button className="flex gap-2 text-white bg-[#0076B2] sm:w-full hover:bg-[#0076B2] px-6 py-3 leading-[20.27px] text-base font-medium rounded-md">
          Join Our Community
        </Button>
      </div>

      {/* Image Side */}
      <div className="w-full max-w-md">
        <img
          src={ScoopImage}
          alt="VR Person"
          className="object-cover w-full shadow-lg rounded-xl"
        />
      </div>
    </section>
  );
};

export default NewsletterCTA;
