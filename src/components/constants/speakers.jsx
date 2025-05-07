import slugify from "slugify";

const rawSpeakerData = [
  {
    id: 1,
    image: "tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 2,
    name: "Alice Johnson",
    image: "tunde.svg",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 3,
    name: "Tonye Cole",
    image: "tonye.svg",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 4,
    image: "tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 5,
    image: "tonye.svg",
    name: "Tonye Cole",
    role: "Co-Founder, Sahara Groups",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 6,
    image: "tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 7,
    image: "tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 8,
    image: "tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
  {
    id: 9,
    image: "tunde.svg",
    name: "Tunde Onakoya",
    role: "Founder, Chess in Slums Africa",
    link: "https://www.linkedin.com/in/tundeonakoya",
  },
];

// Generate slugs and ensure uniqueness
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
