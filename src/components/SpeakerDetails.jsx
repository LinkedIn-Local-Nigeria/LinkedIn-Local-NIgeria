import {
  GlobeIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../sanity/sanityClient";
import { speakerBySlug } from "./lib/queries";
import { useParams } from "react-router-dom";

// Sanity Image Helper
const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

export default function SpeakerDetail() {
  const { slug } = useParams();
  const [speaker, setSpeaker] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeaker = async () => {
      try {
        const data = await sanityClient.fetch(speakerBySlug(slug));
        setSpeaker(data);
      } catch (err) {
        console.error("Failed to fetch speaker", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeaker();
  }, [slug]);

  if (loading) {
    return (
      <p className="pt-20 text-center text-gray-500">Loading speaker details...</p>
    );
  }

  if (!speaker) {
    return (
      <p className="pt-20 text-center text-red-500">Speaker not found</p>
    );
  }

  return (
    <section className="max-w-6xl px-4 pb-20 mx-auto pt-28 font-manrope">
      <head>
        <title>{speaker.name} | Speaker Detail</title>
      </head>

      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
        <div className="w-full md:bg-blue-600 bg-none md:w-1/2">
          <img
            src={urlFor(speaker.image).url()}
            alt={speaker.name}
            className="h-[500px] md:-translate-x-4 md:translate-y-4 object-cover w-full"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col w-full gap-4 text-left md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-[#101828]">
            {speaker.name}
          </h1>
          <h2 className="text-lg md:text-xl pb-4 font-manrope font-normal text-[#0076B2]">
            {speaker.role || "No role specified"}
          </h2>
          <p
            className="text-base text-[#667085]"
            style={{ lineHeight: "1.90rem" }}
          >
            {speaker.bio || "No biography available."}
          </p>

          <div className="flex gap-4 mt-4">
            {speaker.linkedinUrl && (
              <a
                href={speaker.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98A2B3] border p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                <LinkedInLogoIcon className="w-6 h-6" />
              </a>
            )}
            {speaker.twitterUrl && (
              <a
                href={speaker.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98A2B3] border p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                <TwitterLogoIcon className="w-6 h-6" />
              </a>
            )}
            {speaker.websiteUrl && (
              <a
                href={speaker.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98A2B3] border p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white cursor-pointer"
              >
                <GlobeIcon className="w-6 h-6" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
