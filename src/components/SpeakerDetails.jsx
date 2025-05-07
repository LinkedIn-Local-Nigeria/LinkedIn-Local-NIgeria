import { useParams } from "react-router-dom";
import { speakerData } from "./constants/speakers";
import slugify from "slugify";
import {
  LinkedInLogoIcon,
  TwitterLogoIcon,
  GlobeIcon,
} from "@radix-ui/react-icons";

export default function SpeakerDetail() {
  const { slug } = useParams();

  const speaker = speakerData.find(
    (item) => slugify(item.name, { lower: true, strict: true }) === slug
  );

  if (!speaker)
    return <p className="text-center text-red-500">Speaker not found</p>;

  return (
    <section className="max-w-6xl px-4 pb-20 mx-auto pt-28 font-manrope">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
        <div className="w-full md:bg-blue-600 bg-none md:w-1/2">
          <img
            src={speaker.image}
            alt={speaker.name}
            className="h-[500px] md:-translate-x-4 md:translate-y-4 object-cover w-full"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col w-full gap-4 text-left md:text-left md:w-2/3">
          <h1 className="text-2xl md:text-3xl font-bold font-poppins text-[#101828]">
            {speaker.name}
          </h1>
          <h2 className="text-lg md:text-xl pb-4 font-manrope font-normal text-[#0076B2]">
            {speaker.role}
          </h2>
          <p
            className="text-base text-[#667085]"
            style={{ lineHeight: "1.90rem" }}
          >
            {speaker.description || "No biography available."}
          </p>

          <div className="flex gap-4 mt-4">
            {speaker && (
              <a
                href={speaker.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98A2B3] border p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                <LinkedInLogoIcon className="w-6 h-6" />
              </a>
            )}
            {speaker && (
              <a
                href={speaker.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#98A2B3] border p-4 rounded-full transition-all duration-300 hover:bg-blue-600 hover:text-white"
              >
                <TwitterLogoIcon className="w-6 h-6" />
              </a>
            )}
            {speaker && (
              <a
                href={speaker.link}
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
