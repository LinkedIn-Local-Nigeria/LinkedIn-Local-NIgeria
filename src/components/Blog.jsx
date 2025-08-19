import { useEffect, useState } from "react";

import Button from "./ui/Button";
import Container from "./ui/Container";
import GroupPics from "../assets/groupphoto.jpg";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import sanityClient from '../sanity/sanityClient'

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source) => builder.image(source);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const query = `
          *[_type == "blog"] | order(date desc) [0...6] {
            _id,
            title,
            slug,
            image,
            authorName,
            "authorAvatar": authorAvatar.asset->url,
            date
          }
        `;


        const posts = await sanityClient.fetch(query);
        setBlogPosts(posts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateTitle = (title, maxLength = 40) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + "...";
  };

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

  if (loading) {
    return (
      <div className="bg-white min-h-screen w-full">
        <NavBar />
        <div className="py-24 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1790D0] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen w-full">
        <NavBar />
        <div className="py-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-[#1790D0] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full">
      <NavBar />
      <div className="py-24">
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
                  Your Front Row Seat to Nigeria's{" "}
                  <br className="hidden md:block" />
                  Career Evolution
                </h1>
                <p className="text-gray-700 text-[20px] mb-6 text-left max-w-[400px]">
                  From networking wins to workplace wisdom. Stay inspired, stay
                  informed.
                </p>
                <div className="text-left">
                  <a
                    href="https://chat.whatsapp.com/E4dv58mY9ax2v7qvbLEItI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full xl:w-1/2"
                  >
                    <Button className="flex gap-2 whitespace-nowrap text-white w-full px-6 py-3 leading-[20.27px] text-base font-medium rounded-md transition-colors duration-300">
                      Join Our Community
                    </Button>
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
                  alt="LinkedIn Local Nigeria Community"
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

            {blogPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg">No blog posts available yet.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for new content!</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-16 justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {blogPosts.map((post) => (
                  <Link
                    key={post._id}
                    to={`/blog/${post.slug.current}`}
                    className="flex flex-col items-center max-w-[530px] w-full rounded-xl transition-shadow duration-300"
                  >
                    <motion.div
                      className="flex flex-col items-center w-full"
                      variants={itemVariants}
                    >
                      <img
                        src={urlFor(post.image).width(530).height(477).url()}
                        alt={post.title}
                        className="w-full max-w-[530px] h-[300px] sm:h-[400px] md:h-[477px] object-cover rounded-[10px] mb-3"
                        loading="lazy"
                      />
                      <div className="flex flex-col flex-1 w-full px-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-base text-gray-800 truncate max-w-[70%]">
                            {truncateTitle(post.title)}
                          </h3>
                          <span className="text-[#1790D0] font-bold flex items-center gap-1 text-sm whitespace-nowrap">
                            READ MORE <span className="font-bold">&rarr;</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          {post.authorAvatar ? (
                            <img
                              src={urlFor(post.authorAvatar).width(24).height(24).url()}
                              alt={post.authorName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-[#1790D0] flex items-center justify-center text-white text-xs font-bold">
                              {post.authorName?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-gray-700">
                            {post.authorName || 'Anonymous'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>

                ))}
              </motion.div>
            )}
          </Container>
        </section>
      </div>
    </div>
  );
};

export default Blog;