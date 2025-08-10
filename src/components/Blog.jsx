import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Container from "./ui/Container";
import BlogImg1 from "../assets/people.png";
import GroupPics from "../assets/groupphoto.jpg";
import NavBar from "./NavBar";
import Footer from "./Footer";
import BlogImg2 from "../assets/possible.png";
import BlogImg3 from "../assets/throwback.png";
import Container from "./ui/Container";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

// Placeholder images



const blogPosts = [
  {
    title: "The Power of Community in Career Tra...",
    date: "5/16/2025",
    image: BlogImg1,
    link: "/blog/power-of-community",
  },
  {
    title: "Behind the Scenes: Organizing a LinkedIn Local Ev...",
    date: "5/16/2025",
    image: BlogImg2,
    link: "/blog/behind-the-scenes",
  },
  {
    title: "Moments We Won't Forget: LLN in Pi...",
    date: "5/16/2025",
    image: BlogImg3,
    link: "/blog/moments-we-wont-forget",
  },
];

const Blog = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  const heroImageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const heroTextVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="bg-white min-h-screen w-full">
      <NavBar />
      <div className="pt-24">
        <section className="py-16">
          <div className="max-w-screen-xl mx-auto px-4 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14">
              <motion.div
                className="flex flex-col justify-center text-left -mt-16 w-full h-auto rounded-lg"
                variants={heroTextVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-[#1790D0] leading-tight mb-4 text-left">
                  Your Front Row Seat to Nigeria’s{" "}
                  <br className="hidden md:block" />
                  Career Evolution
                </h1>
                <p className="text-gray-700 text-[20px] mb-6 text-left max-w-[400px]">
                  From networking wins to workplace wisdom. Stay inspired, stay
                  informed.
                </p>
                <div className="text-left">
                  <a
                    href="/community"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1790D0] text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition text-base"
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 2L11 13" />
                      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                    </svg>
                    Join Our Community
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="flex justify-center items-center"
                variants={heroImageVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <img
                  src={GroupPics}
                  alt="LinkedIn"
                  className="object-cover bg-[#0a192f] w-full h-[350px] sm:h-[400px] md:h-[400px] lg:h-[500px] rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-left text-3xl md:text-5xl font-bold text-[#1790D0] mb-6 lg:mt-20">
                From The Local <br className="block md:hidden" />
                to The Global
              </h2>
            </div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-16 justify-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {blogPosts.map((post, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center max-w-[530px] w-full rounded-xl"
                  variants={itemVariants}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-w-[530px] h-[300px] sm:h-[400px] md:h-[477px] object-cover rounded-[10px] mb-3"
                  />
                  <div className="flex flex-col flex-1 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-base text-gray-800 truncate max-w-[60%]">
                        {post.title}
                      </h3>
                      <Link
                        to={post.link}
                        className="text-[#1790D0] font-bold flex items-center gap-1 text-sm whitespace-nowrap"
                      >
                        READ MORE <span className="font-bold">&rarr;</span>
                      </Link>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        src={`https://randomuser.me/api/portraits/med/men/${
                          idx + 10
                        }.jpg`}
                        alt="avatar"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs font-semibold text-gray-700">
                        {idx === 0
                          ? "Bola Ade"
                          : idx === 1
                          ? "Chika Precious"
                          : "Emeka Obi"}
                      </span>
                      <span className="text-xs text-gray-500">{post.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Blog;