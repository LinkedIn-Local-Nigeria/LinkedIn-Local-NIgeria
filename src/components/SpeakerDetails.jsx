import { useParams } from "react-router-dom";
import { speakerData } from "./constants/speakers";
import PropTypes from "prop-types";
import slugify from "slugify";

export default function SpeakerDetail() {
  const { slug } = useParams();
  const speaker = speakerData.find(
    (item) => slugify(item.name, { lower: true }) === slug
  );

  if (!speaker) return <p>Speaker not found</p>;

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-full rounded-lg"
      />
      <h1 className="mt-4 text-3xl text-black font-bold">{speaker.name}</h1>
      <h2 className="text-lg text-gray-500">{speaker.role}</h2>
      <p className="mt-4">{speaker.role}</p>
      <a
        href={speaker.link}
        className="inline-block mt-4 text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        View LinkedIn
      </a>
    </div>
  );
}

SpeakerDetail.propTypes = {
  speaker: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};
