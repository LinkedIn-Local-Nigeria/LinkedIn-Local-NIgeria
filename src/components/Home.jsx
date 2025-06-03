import { Helmet } from "react-helmet";
import Container from "./ui/Container";
import Cta from "./Cta";
import { EventInfo } from "./EventInfo";
import Events from "./Events";
import Faq from "../components/Faq"
import { HeroSection } from "./HeroSection";
import MissionVision from '../components/MissionVision';
import Scoop from "./Scoop";
import Section from "./ui/Section";
import Speakers from "../components/Speakers"
import TeamSection from '../components/TeamSection';
import WhyAttend from "../components/WhyAttend";

const Home = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>LinkedIn Local Nigeria 2025 | We Gather, We Learn, We Evolve</title>
        <meta name="title" content="LinkedIn Local Nigeria 2025 | We Gather, We Learn, We Evolve" />
        <meta 
          name="description" 
          content="Join Nigeria's largest professional networking event. Connect with industry leaders, entrepreneurs, and innovators at LinkedIn Local Nigeria 2025. Register now for an unforgettable experience." 
        />
        <meta name="keywords" content="LinkedIn Local Nigeria, professional networking, business event Nigeria, career development, entrepreneurs Nigeria, LinkedIn event, networking conference" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="LinkedIn Local Nigeria" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://linkedinlocalnigeria.com/" />
        <meta property="og:title" content="LinkedIn Local Nigeria 2025 | We Gather, We Learn, We Evolve" />
        <meta 
          property="og:description" 
          content="Join Nigeria's largest professional networking event. Connect with industry leaders, entrepreneurs, and innovators at LinkedIn Local Nigeria 2025." 
        />
        <meta property="og:image" content="https://linkedinlocalnigeria.com/images/instagram-og.png" />
        <meta property="og:site_name" content="LinkedIn Local Nigeria" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://linkedinlocalnigeria.com/" />
        <meta property="twitter:creator" content="@LinkedInLocalNG" />
        <meta property="twitter:title" content="LinkedIn Local Nigeria 2025 | We Gather, We Learn, We Evolve" />
        <meta 
          property="twitter:description" 
          content="Join Nigeria's largest professional networking event. Connect with industry leaders, entrepreneurs, and innovators." 
        />
        <meta property="twitter:image" content="https://linkedinlocalnigeria.com/images/twitter-og.png" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0076B2" />
        <link rel="canonical" href="https://linkedinlocalnigeria.com/" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "LinkedIn Local Nigeria 2025",
              "description": "Nigeria's largest professional networking event bringing together industry leaders, entrepreneurs, and innovators.",
              "startDate": "2025-03-15", // Update with actual date
              "endDate": "2025-03-15",   // Update with actual date
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Event Venue", // Update with actual venue
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Event Address",
                  "addressLocality": "Lagos",
                  "addressRegion": "Lagos State",
                  "addressCountry": "Nigeria"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": "LinkedIn Local Nigeria",
                "url": "https://linkedinlocalnigeria.com"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://linkedinlocalnigeria.com/#register",
                "price": "Free", // Update if paid
                "priceCurrency": "NGN",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        /> */}
      </Helmet>

      <Section id="about" background="bg-[#FDFDFD]">
        <HeroSection />
      </Section>
      <section className="mobile-vertical-lines desktop-vertical-lines">
        <Section className="py-10 border-t" background="bg-[#fdfdfd]">
          <Container>
            <EventInfo />
          </Container>
        </Section>

        <Section
          id="mission-vision"
          title=""
          className=""
        >
          <MissionVision />
        </Section>

        <Section
          className=""
          background="bg-[#fdfdfd]"
        >
          <WhyAttend />
        </Section>

        <Section
          id="speakers"
          className=""
          background="bg-[#fdfdfd]"
        >
          <Speakers />
        </Section>

        <Section
          id="events"
          className="border-t "
        >
          <Events />
        </Section>
        <Section
          id="scoop"
          className="border-t"
        >
          <Container>
            <Scoop />
          </Container>
        </Section>

        <Section
          id="teams"
          className="border-t"
        >
          <TeamSection />
        </Section>

        <Section
          id="faqs"
          title=""
          className="border-t "
        >
          <Faq/>
        </Section>

        <Section className="desktop-cta-bg mobile-cta-bg">
          <Container>
            <Cta />
          </Container>
        </Section>
      </section>
    </>
  );
};

export default Home;
