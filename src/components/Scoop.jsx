import React from "react";
import CTAImage from "../assets/EventImage1.png";
import Button from "./ui/Button";

const NewsletterCTA = () => {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-10 px-6 py-16 bg-white font-manrope font- lg:flex-row">
      {/* Text Side */}
      <div className="max-w-xl text-center lg:text-left">
        <h2 className="text-4xl font-extrabold text-[#0076B2] font-poppins mb-4">
          Get the Inside Scoop
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          Sign up now for exclusive updates and be the first to know about event news, speakers, and more!
        </p>
        <Button className="flex items-center gap-2 text-white bg-[#0076B2] hover:bg-[#005a8a] px-6 py-3 text-base font-medium rounded-md">
          Join Our Community
        </Button>
      </div>

      {/* Image Side */}
      <div className="w-full max-w-md">
        <img
          src={CTAImage}
          alt="VR Person"
          className="object-cover w-full shadow-lg rounded-xl"
        />
      </div>
    </section>
  );
};

export default NewsletterCTA;
