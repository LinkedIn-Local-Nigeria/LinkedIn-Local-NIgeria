import { useEffect, useRef, useState } from "react";

import SpeakerCards from "./SpeakerCard";
import sanityClient from "../sanity/sanityClient";
import { speakersQuery } from "./lib/queries";

export default function AllSpeakers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [speakerData, setSpeakerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const speakersPerPage = 9;
  const topRef = useRef(null);

  useEffect(() => {
    const getSpeakers = async () => {
      try {
        const res = await sanityClient.fetch(speakersQuery);
        console.table(res);
        setSpeakerData(res);
      } catch (err) {
        console.error("Error fetching speakers:", err);
      } finally {
        setLoading(false);
      }
    };

    getSpeakers();
  }, []);

  useEffect(() => {
    const scrollToTop = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Scroll immediately without delay
    scrollToTop();
  }, [currentPage]);

  if (loading) {
    return (
      <p className="pt-20 text-center text-gray-500">
        Loading speaker details...
      </p>
    );
  }

  if (!loading && speakerData.length === 0) {
    return (
      <p className="pt-20 text-center text-red-500">No speakers found.</p>
    );
  }

  const indexOfLastSpeaker = currentPage * speakersPerPage;
  const indexOfFirstSpeaker = indexOfLastSpeaker - speakersPerPage;
  const currentSpeakers = speakerData.slice(
    indexOfFirstSpeaker,
    indexOfLastSpeaker
  );
  const totalPages = Math.ceil(speakerData.length / speakersPerPage);

  return (
    <div className="px-6 py-40 lg:px-24">
      {/* Scroll target with minimal height instead of h-0 */}
      <div ref={topRef} className="h-1" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentSpeakers.map((speaker) => (
          <SpeakerCards key={speaker._id} speaker={speaker} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded transition duration-200 ${currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}