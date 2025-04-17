import Button from "./ui/Button";
import ScoopImage from "../assets/Scoop.svg";

const NewsletterCTA = () => {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-10 px-4 bg-white xl:py-16 font-manrope lg:flex-row">
      {/* Text Side */}
      <div className="flex flex-col max-w-xl pb-10 text-left r lg:text-left">
        <h2 className="md:text-[50px] text-left text-[1.725rem] font-extrabold text-[#0076B2] font-poppins mb-4 leading-[55.3px]">
          Get the Inside Scoop
        </h2>
        <p className="mb-6  md:text-[20px] text-[#3F3F46] md:leading-[27.65px] font-manrope">
          Sign up now for exclusive updates and be the first to know about event news, speakers, and more!
        </p>
        <Button className="flex gap-2 text-white bg-[#0076B2] w-full xl:w-1/2  hover:bg-[#0076B2] px-6 py-3 leading-[20.27px] text-base font-medium rounded-md">
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
