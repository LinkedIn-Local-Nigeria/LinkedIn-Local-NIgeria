import { useState } from "react";
import { speakerData } from "./constants/speakers";
import SpeakerCards from "./SpeakerCard";

export default function AllSpeakers() {
  const [currentPage, setCurrentPage] = useState(1);
  const speakersPerPage = 9;

  const indexOfLastSpeaker = currentPage * speakersPerPage;
  const indexOfFirstSpeaker = indexOfLastSpeaker - speakersPerPage;
  const currentSpeakers = speakerData.slice(
    indexOfFirstSpeaker,
    indexOfLastSpeaker
  );
  const totalPages = Math.ceil(speakerData.length / speakersPerPage);

  return (
    <div className="p-6">
      <h2 className="my-12 text-3xl font-bold text-black font-poppins">
        All Speakers
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentSpeakers.map((speaker) => (
          <SpeakerCards key={speaker.id} speaker={speaker} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentPage(index + 1);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-4 py-2 rounded transition duration-200 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
