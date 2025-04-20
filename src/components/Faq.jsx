import { useState } from 'react';

const faqItems = [
  {
    question: 'How can I participate in the Twitter Spaces, Campus Tours, and IG Lives?',
    answer: 'Simply follow us on LinkedIn, Twitter, Instagram (@linkedinlocalnigeria) and stay updated on our upcoming event schedule to join these sessions live.',
  },
  {
    question: 'What is LinkedIn Local Nigeria all about?',
    answer: 'It’s a networking initiative that brings professionals together to connect beyond the screen and build real community.',
  },
  {
    question: 'Is LinkedIn Local Nigeria open to students?',
    answer: 'Yes, students and professionals at all levels are encouraged to join and grow their network.',
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FAFCFF] flex flex-col gap-8 w-full py-16 md:px-12 px-4 justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <h2 className="text-[#0076B2] font-poppins text-[1.25rem] md:text-[2.5rem] xl:text-[3.125rem] font-semibold">
          Frequently Asked Questions
        </h2>
        <p className="text-sm w-3/4  md:text-base xl:text-[1.125rem] text-[#667085] font-manrope">
          Everything you need to know about the LinkedIn Local Nigeria Event.
        </p>
      </div>

      <div className="w-full max-w-3xl flex flex-col gap-4">
        {faqItems.map((item, index) => ( 
          <div key={index} className="flex flex-col">
            <button
              onClick={() => toggleIndex(index)}
              className="text-left font-semibold text-[#101828] text-sm md:text-base xl:text-lg w-full flex justify-between items-center py-4 focus:outline-none"
            >
              <span>{item.question}</span>
              <img
                src={activeIndex === index ? 'collapse.svg' : 'expand.svg'}
                alt={activeIndex === index ? 'Collapse' : 'Expand'}
              />
            </button>
            {activeIndex === index && (
              <p className="text-[#667085] text-[.75rem] md:-base text-left font-manrope pb-4">
                {item.answer}
              </p>
            )}
            {index < faqItems.length - 1 && <hr className="border-[#E4E7EC]" />}
          </div>
        ))}
      </div>
    </section>
  );
}
