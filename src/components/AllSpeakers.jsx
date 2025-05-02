import { speakerData } from "./constants/speakers";
import SpeakerCards from "./SpeakerCard";

export default function AllSpeakers() {
  return (
    <div className="p-6">
      <h2 className="my-40 text-2xl font-bold text-black font-poppins">
        All Speakers
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {speakerData.map((speaker) => {
          return <SpeakerCards key={speaker.id} speaker={speaker} />;
        })}
      </div>
    </div>
  );
}
