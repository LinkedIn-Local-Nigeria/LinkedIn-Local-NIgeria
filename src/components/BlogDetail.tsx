import React, { useEffect, useState } from "react";

import Container from "../components/ui/Container";
import { Link } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from "@sanity/image-url";
import { motion } from "framer-motion";
import sanityClient from '../sanity/sanityClient'
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source) => builder.image(source);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const query = `
          *[_type == "blog" && slug.current == $slug][0] {
            _id,
            title,
            slug,
            image,
            authorName,
            authorAvatar,
            date,
            body
          }
        `;

        const postData = await sanityClient.fetch(query, { slug });

        if (!postData) {
          setError("Blog post not found");
        } else {
          setPost(postData);
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const portableTextComponents = {
    block: {
      normal: ({ children }) => <p className="text-gray-700 mb-6 text-justify">{children}</p>,
      h1: ({ children }) => <h1 className="text-2xl md:text-3xl font-bold text-[#1790D0] mt-8 mb-4">{children}</h1>,
      h2: ({ children }) => <h2 className="text-xl md:text-2xl font-bold text-[#1790D0] mt-6 mb-3">{children}</h2>,
      h3: ({ children }) => <h3 className="text-lg md:text-xl font-bold text-[#1790D0] mt-4 mb-2">{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[#1790D0] pl-4 my-6 italic text-gray-600">
          {children}
        </blockquote>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value.href}
          className="text-[#1790D0] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({ value }) => (
        <div className="my-8">
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || "Blog image"}
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
          {value.caption && (
            <p className="text-sm text-gray-500 text-center mt-2">{value.caption}</p>
          )}
        </div>
      ),
    },
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen w-full">
        <NavBar />
        <div className="pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1790D0] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen w-full">
        <NavBar />
        <div className="pt-24 pb-16">
          <Container>
            <div className="text-center py-16">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {error || "Blog post not found"}
              </h1>
              <p className="text-gray-600 mb-8">
                The blog post you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#1790D0] hover:underline font-medium"
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
          </Container>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen w-full text-left">
      <NavBar />
      <div className="pt-24 pb-16">
        <Container>
          <div className="px-4 py-8 md:px-6 lg:py-12 max-w-screen mx-auto">
            <motion.article
              className="prose prose-gray dark:prose-invert max-w-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {post.image && (
                <img
                  src={urlFor(post.image).width(800).height(400).url()}
                  alt={post.title}
                  className="w-full max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-full object-cover rounded-lg mb-8"
                />
              )}

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-left text-[#1790D0] my-6 lg:my-14 max-w-2xl lg:leading-snug">
                {post.title}
              </h1>

              <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
                {post.authorAvatar ? (
                  <img
                    src={urlFor(post.authorAvatar).width(32).height(32).url()}
                    alt={post.authorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#1790D0] flex items-center justify-center text-white text-sm font-bold">
                    {post.authorName?.charAt(0)?.toUpperCase() || 'A'}
                  </div>
                )}
                <span className="font-medium">{post.authorName}</span>
                <span>•</span>
                <span>{formatDate(post.date)}</span>
              </div>

              {post.body && (
                <div className="prose-content">
                  <PortableText
                    value={post.body}
                    components={portableTextComponents}
                  />
                </div>
              )}
            </motion.article>

            <div className="flex justify-start mt-12">
              <Link
                className="inline-flex items-center gap-2 text-[#1790D0] hover:underline font-medium transition-colors duration-200"
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