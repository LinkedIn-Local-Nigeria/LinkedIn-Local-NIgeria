
export const speakersQuery = `*[_type == "speaker"]{
  _id,
  name,
  role,
  bio,
  "image": image.asset->url,
  linkedinUrl,
  slug
} | order(
  select(
    name == "Tunde Onakoya" => 0,
    name == "Oluwatosin Olaseinde" => 1,
    name == "Tochukwu MacFoy" => 2,
    name == "Dr. Aishah N. Ahmad" => 3,
    name == "Taiwo Oyedele" => 4,
    name == "Tonye Cole" => 5,
    name == "Moji Hunponu-Wusu" => 6,
    name == "Beauty Etsanyi Tukura" => 7,
    999
  )
)`;



export const speakerBySlug = (slug) => `
  *[_type == "speaker" && slug.current == "${slug}"][0]{
    _id,
    name,
    role,
    bio,
    "image": image.asset->url,
    linkedinUrl,
    twitterUrl,
    websiteUrl
  }
`;
