import { useState } from 'react';

const faqItems = [
  {
    question: 'Who should attend LinkedIn Local Nigeria 2025?',
    answer: `LLN 2025 is for anyone who’s passionate about networking, collaboration, and shaping the future of Nigeria. Whether you're a startup founder, business executive, entrepreneur, young professional, or influencer, you’ll find value in connecting with like-minded people and industry leaders.`
  },
  {
    question: 'What’s the event schedule? ',
    answer: 'The full agenda will be shared closer to the event, but expect inspiring keynotes, breakout sessions, panel discussions, and networking opportunities throughout the day.',
  },
  {
    question: 'Can I still attend if I’m new to LinkedIn? ',
    answer: ` Absolutely! Whether you're a LinkedIn pro or just getting started, LLN 2025 offers something for everyone. It’s about building relationships and growing together. `,
  },
  {
    question: 'What should I bring? ',
    answer: `Your learning materials, curiosity, energy, and an open mind! And, of course, don’t forget your business cards and networking tools.`,
  },
  {
    question: 'Will there be virtual attendance options?',
    answer: `Yes! For those who can’t make it in person, we'll be offering a virtual pass to participate in key sessions and join the conversation from anywhere.`,
  },
  {
    question: 'Can I volunteer or get involved with LLN 2025? ',
    answer: `We’d love to have you! Become a volunteer or partner with us to help make this event an unforgettable experience. `,
  },
  {
    question: 'Are group tickets available?',
    answer: `Yes, group tickets will be available. Reach out to us for discounts and special packages for teams, companies, or organizations.`,
  },
  {
    question: 'How can I become a sponsor? ',
    answer: `We have several exciting sponsorship opportunities. Reach out here to explore how your brand can get involved and get in front of a highly engaged audience.`,
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
          Everything you need to know about the LinkedIn Local Nigeria.
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
