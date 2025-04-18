import Button from "./ui/Button";
import ScoopImage from "../assets/Scoop.svg";
import { motion } from "framer-motion";

const NewsletterCTA = () => {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-10 px-4 bg-white xl:py-16 font-manrope lg:flex-row">
      {/* Text Side */}
      <div className="flex flex-col max-w-xl pb-10 text-left lg:text-left">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="md:text-[50px] text-left text-[1.625rem] font-extrabold text-[#0076B2] font-poppins mb-4 leading-[55.3px]"
        >
          Get the Inside Scoop
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 md:text-[20px] text-[#3F3F46] md:leading-[27.65px] font-manrope"
        >
          Sign up now for exclusive updates and be the first to know about event news, speakers, and more!
        </motion.p>
        <Button className="flex gap-2 text-white bg-[#0076B2] w-full xl:w-1/2 hover:bg-[#0076B2] px-6 py-3 leading-[20.27px] text-base font-medium rounded-md">
          Join Our Community
        </Button>
      </div>

      {/* Image Side */}
      <div className="w-full max-w-md">
        <motion.img
          src={ScoopImage}
          alt="Scoop Image"
          className="object-cover w-full shadow-lg rounded-xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }} 
        />
      </div>
    </section>
  );
};

export default NewsletterCTA;
