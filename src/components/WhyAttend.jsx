import { motion } from 'framer-motion';

const items = [
  {
    image: "people.svg",
    title: "5000+ Attendees (virtual + physical)",
    description: "Founders, creators, doers, and decision-makers from across Nigeria and beyond. ",
  },
  {
    image: "pitch.svg",
    title: "10+ Pitches and Showcase",
    description: "Discover startups building tomorrow’s solutions—today",
  },
  {
    image: "chartbar.svg",
    title: "6+ Countries Represented",
    description: "Diverse global insights with a distinctly African heartbeat.",
  },
  {
    image: "person-add.svg",
    title: "10+ World-Class speakers",
    description: "Visionaries, trailblazers, and thought leaders sharing bold, actionable ideas",
  },
  {
    image: "Group.svg",
    title: "10+ Exhibitors",
    description: "Tech, tools, and platforms driving the future of Nigeria. ",
  },
  {
    image: "result.svg",
    title: "Unfiltered Conversations",
    description:  "Real people, real stories, real impact.",
  },
];

export default function WhyAttend() {
  return (
    <section className="bg-[#FAFCFF] flex flex-col gap-12 w-full justify-center py-20 px-6 md:px-16">
      
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center gap-4">
        <motion.h3
          className="font-poppins text-[#0076B2] font-bold text-3xl md:text-[3.125rem] leading-[1.2]"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
          viewport={{ once: true }}
        >
         Why Attend LLN 2025? 
        </motion.h3>

        <motion.p
          className="text-center md:w-3/5 xl:w-[45%] font-normal md:text-[1.125rem] font-manrope text-[#52525B]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80, delay: 0.2 }}
          viewport={{ once: true }}
        >
         It’s not just an event. It’s an experience. 
        </motion.p>
      </div>

      {/* Animated Grid Items */}
      <div className="grid grid-cols-1 gap-0 border-gray-300 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className={`
              flex flex-col items-center p-8 text-center border-gray-300
              border-b last:border-b-0
              md:border-b md:border-r
              md:[&:nth-child(2n)]:border-r-0
              md:[&:nth-child(n+5)]:border-b-0
              xl:border-b xl:border-r
              xl:[&:nth-child(3n)]:border-r-0
              xl:[&:nth-child(2n)]:border-r
              xl:[&:nth-child(4n)]:border-r
              xl:[&:nth-child(n+4)]:border-b-0
            `}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
              type: "spring",
              stiffness: 60,
            }}
            viewport={{ once: true }}
          >
            <img src={item.image} alt={item.title} className="w-16 h-16 mb-4" />
            <h4 className="mb-2 md:text-xl font-bold font-poppins text-[#18181B]">{item.title}</h4>
            <p className="font-manrope text-sm md:text-base text-[#52525B]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
