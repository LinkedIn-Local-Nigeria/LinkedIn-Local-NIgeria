import { motion } from 'framer-motion';

const items = [
  {
    image: "people.svg",
    title: "5000+ Attendees",
    description: "A Virtual and Physical mix of professionals, entrepreneurs, innovators, young creator and decision-makers from across industries.",
  },
  {
    image: "chartbar.svg",
    title: "60+ Countries",
    description: "A diverse global audience with insights from other economies.",
  },
  {
    image: "Group.svg",
    title: "30+ Exhibitors",
    description: "Companies and organizations showcasing solutions, technologies, and ideas driving Nigeria’s future.",
  },
  {
    image: "pitch.svg",
    title: "10+ Pitches and Showcase",
    description: "Opportunities to pitch cutting-edge innovations and startups solving real world problems.",
  },
  {
    image: "person-add.svg",
    title: "10+ world class speakers",
    description: "Visionaries, entrepreneurs, and industry leaders sharing actionable insights.",
  },
  {
    image: "result.svg",
    title: "Result",
    description: "Culmination of insights, connections, and opportunities that drive measurable business outcomes and social impact.",
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
          Why is it worth attending?
        </motion.h3>

        <motion.p
          className="text-center md:w-3/5 xl:w-[45%] font-normal md:text-[1.125rem] font-manrope text-[#52525B]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 80, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Gain valuable insights, expand your network, and discover new opportunities for growth and success.
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
