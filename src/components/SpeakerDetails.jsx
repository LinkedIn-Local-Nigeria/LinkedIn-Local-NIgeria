import { useParams } from "react-router-dom";
import { speakerData } from "./constants/speakers";
import slugify from "slugify";

export default function SpeakerDetail() {
  const { slug } = useParams();

  const speaker = speakerData.find(
    (item) => slugify(item.name, { lower: true, strict: true }) === slug
  );

  if (!speaker) return <p>Speaker not found</p>;

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-full rounded-lg"
      />
      <h1 className="mt-4 text-3xl font-bold text-black">{speaker.name}</h1>
      <p className="mt-4">{speaker.role || 'No biography available.'}</p>
      <a
        href={speaker.link || "#"}
        className="inline-block mt-4 text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        View LinkedIn
      </a>
    </div>
  );
}
