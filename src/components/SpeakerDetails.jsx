import {
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanity/sanityClient";
import { speakerBySlug } from "./lib/queries";
import { useParams } from "react-router-dom";

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

export default function SpeakerDetail() {
  const { slug } = useParams();
  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchSpeaker = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await sanityClient.fetch(speakerBySlug(slug));
        setSpeaker(data);
      } catch (err) {
        console.error("Failed to fetch speaker", err);
        setError("Failed to load speaker details");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeaker();
  }, [slug]);

  useEffect(() => {
    const scrollToTop = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const timer = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timer);
  }, [slug, loading]);

  if (loading) {
    return (
      <div className="px-4 pb-20 mx-auto sm:max-w-2xl lg:max-w-6xl pt-28 font-manrope">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500">Loading speaker details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 pb-20 mx-auto sm:max-w-2xl lg:max-w-6xl pt-28 font-manrope">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="mb-4 text-lg text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!speaker) {
    return (
      <div className="px-4 pb-20 mx-auto sm:max-w-2xl lg:max-w-6xl pt-28 font-manrope">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="mb-4 text-lg text-red-500">Speaker not found</p>
            <button 
              onClick={() => window.history.back()} 
              className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <head>
        <title>{speaker.name} | Speaker Detail</title>
        <meta name="description" content={speaker.bio || `Learn more about ${speaker.name}`} />
        <meta property="og:title" content={`${speaker.name} | Speaker Detail`} />
        <meta property="og:description" content={speaker.bio || `Learn more about ${speaker.name}`} />
        {speaker.image && (
          <meta property="og:image" content={urlFor(speaker.image).url()} />
        )}
      </head>

      <section 
        ref={topRef}
        className="px-4 pb-20 mx-auto sm:max-w-2xl lg:max-w-6xl pt-28 font-manrope"
      >
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
          <div className="relative w-full md:bg-blue-600 bg-none md:w-1/2">
            {speaker.image ? (
              <img
                src={urlFor(speaker.image).url()}
                alt={`${speaker.name} portrait`}
                className="object-cover w-full h-full aspect-[3/4] rounded-lg md:-translate-x-4 md:translate-y-4"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/placeholder-avatar.jpg'; 
                  e.target.alt = 'Speaker portrait unavailable';
                }}
              />
            ) : (
              <div className="w-full h-full aspect-[3/4] rounded-lg md:-translate-x-4 md:translate-y-4 bg-gray-200 flex items-center justify-center">
                <span className="text-lg text-gray-500">No image available</span>
              </div>
            )}
          </div>

          {/* Speaker Details */}
          <div className="flex flex-col w-full gap-4 text-left md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold font-poppins text-[#101828]">
              {speaker.name}
            </h1>
            
            {speaker.role && (
              <h2 className="text-lg md:text-xl pb-4 font-manrope font-normal text-[#0076B2]">
                {speaker.role}
              </h2>
            )}
            
            {speaker.bio && (
              <p
                className="text-base text-[#667085] leading-relaxed"
                style={{ lineHeight: "1.90rem" }}
              >
                {speaker.bio}
              </p>
            )}

            {/* Social Links */}
            {(speaker.linkedinUrl || speaker.twitterUrl || speaker.websiteUrl) && (
              <div className="flex gap-4 mt-4">
                {speaker.linkedinUrl && (
                  <a
                    href={speaker.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#98A2B3] border border-gray-200 p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    aria-label={`Visit ${speaker.name}'s LinkedIn profile`}
                  >
                    <LinkedInLogoIcon className="w-6 h-6" />
                  </a>
                )}
                
                {speaker.twitterUrl && (
                  <a
                    href={speaker.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#98A2B3] border border-gray-200 p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    aria-label={`Visit ${speaker.name}'s Twitter profile`}
                  >
                    <TwitterLogoIcon className="w-6 h-6" />
                  </a>
                )}
                
                {speaker.websiteUrl && (
                  <a
                    href={speaker.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#98A2B3] border border-gray-200 p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                    aria-label={`Visit ${speaker.name}'s website`}
                  >
                    <GlobeIcon className="w-6 h-6" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}