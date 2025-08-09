import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion"; 
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Container from "../components/ui/Container";
import BlogImg1 from "../assets/people.png";
import { Link } from 'react-router-dom'

const BlogDetail = () => {
  const { slug } = useParams(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen w-full text-left">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="px-4 py-8 md:px-6 lg:py-12 max-w-screen mx-auto">
            <motion.article 
              className="prose prose-gray dark:prose-invert"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={BlogImg1}
                alt="People collaborating in a library"
                width={800}
                height={400}
                className="w-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] object-cover rounded-lg mb-8"
              />

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-left text-[#1790D0] my-6 lg:my-14 max-w-2xl lg:leading-snug">
                The Power of Community in Caring <br className="hidden lg:block"/> for Tomorrow
              </h1>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
                <img
                  src="https://randomuser.me/api/portraits/women/5.jpg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>Chloe Prometeus</span>
                <span>•</span>
                <span>5/1/2021</span>
              </div>
              <p className="text-gray-700 mb-6 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum, arcu vehicula vulputate
                egestas, diam nibh egestas arcu, sit amet commodo magna turpis et nunc. Suspendisse commodo iaculis velit, id
                ullamcorper massa. Ut laoreet rutrum interdum. Maecenas commodo sagittis rutrum. Praesent faucibus lacus
                rutrum in fringilla commodo. Quisque in minim lectus. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Nam quam ipsum, tincidunt vitae maximus et, lobortis et in. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam sit amet luctus eros,
                sit amet interdum tellus. Quisque a sollicitudin lectus, in vulputate elit. Proin convallis vulputate ex, ac
                sagittis ipsum ultrices vel. Pellentesque pulvinar eget odio.
              </p>
              <p className="text-gray-700 mb-6 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vestibulum, arcu vehicula vulputate
                egestas, diam nibh egestas arcu, sit amet commodo magna turpis et nunc. Suspendisse commodo iaculis velit, id
                ullamcorper massa. Ut laoreet rutrum interdum. Maecenas commodo sagittis rutrum. Praesent faucibus lacus
                rutrum in fringilla commodo. Quisque in minim lectus. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Nam quam ipsum, tincidunt vitae maximus et, lobortis et in. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam sit amet luctus eros,
                sit amet interdum tellus. Quisque a sollicitudin lectus, in vulputate elit. Proin convallis vulputate ex, ac
                sagittis ipsum ultrices vel. Pellentesque pulvinar eget odio .
              </p>
              <p className="text-gray-700 text-justify">
                Mauris vestibulum, arcu vehicula vulputate egestas, diam nibh egestas arcu, sit amet commodo magna turpis et
                nunc. Suspendisse commodo iaculis velit, id ullamcorper massa. Ut laoreet rutrum interdum. Maecenas commodo
                sagittis rutrum. Praesent faucibus lacus rutrum in fringilla commodo. Quisque in minim lectus. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nam quam ipsum, tincidunt vitae
                maximus et, lobortis et in. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac
                turpis egestas. Aliquam sit amet luctus eros, sit amet interdum tellus. Quisque a sollicitudin lectus, in
                vulputate elit. Proin convallis vulputate ex, ac sagittis ipsum ultrices vel. Pellentesque pulvinar eget odio
              </p>
            </motion.article>
            <div className="flex justify-start mt-12">
              <Link
                className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                to="/blog"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                BACK TO ARTICLES
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default BlogDetail;