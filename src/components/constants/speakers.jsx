import slugify from "slugify";

const rawSpeakerData = [
  {
    id: 1,
    image: "/tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 2,
    name: "Alice Johnson",
    image: "/tunde.svg",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports",
  },
  {
    id: 3,
    name: "Tonye Cole",
    image: "/tonye.svg",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 4,
    image: "/tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 5,
    image: "/tonye.svg",
    name: "Tonye Cole",
    role: "Co-Founder, Sahara Groups",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 6,
    image: "/tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 7,
    image: "/tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 8,
    image: "/tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
  {
    id: 9,
    image: "/tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
    description:
      "Tunde Onakoya is a Nigerian chess master, coach, and social impact advocate, best known as the founder of Chess in Slums Africa — a nonprofit initiative that teaches chess to children living in underserved communities. He has been recognized for his efforts to promote education and critical thinking through chess, empowering young minds in Nigeria and beyond. Tunde's work has garnered international attention, making him a prominent figure in the intersection of sports.",
  },
];

const slugCount = {};
export const speakerData = rawSpeakerData.map((speaker) => {
  let baseSlug = slugify(speaker.name, { lower: true, strict: true });
  let slug = baseSlug;

  if (slugCount[baseSlug]) {
    slug = `${baseSlug}-${slugCount[baseSlug]}`;
  }
  slugCount[baseSlug] = (slugCount[baseSlug] || 0) + 1;

  return { ...speaker, slug };
});
