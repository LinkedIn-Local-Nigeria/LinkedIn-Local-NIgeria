
export const speakersQuery = `*[_type == "speaker"]{
  _id,
  name,
  role,
  bio,
  "image": image.asset->url,
  linkedinUrl,
  slug
} | order(_createdAt desc)`;



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
