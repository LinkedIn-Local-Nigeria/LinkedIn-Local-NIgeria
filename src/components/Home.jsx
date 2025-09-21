/* eslint-disable react/display-name */

import { Suspense, lazy, memo } from "react";

import Container from "./ui/Container";
import { EventInfo } from "./EventInfo";
import { Helmet } from "react-helmet-async";
import HeroSection from "./HeroSection";
import PropTypes from "prop-types";
import Section from "./ui/Section";

const BelowFoldContent = lazy(() =>
  import("../components/BelowFoldContent").then((module) => ({
    default: module.default || module.BelowFoldContent,
  })).catch(() => ({
    default: () => <div>Error loading content</div>
  }))
);


const AdditionalContent = lazy(() =>
  import("../components/AdditionalContent").then((module) => ({
    default: module.default || module.AdditionalContent,
  })).catch(() => ({
    default: () => <div>Error loading additional content</div>
  }))
);

const Speakers = lazy(() =>
  import("../components/Speakers").then((module) => ({
    default: module.default || module.Speakers,
  })).catch(() => ({
    default: () => <div>Error loading speakers</div>
  }))
);

const TeamSection = lazy(() =>
  import("../components/TeamSection").then((module) => ({
    default: module.default || module.TeamSection,
  })).catch(() => ({
    default: () => <div>Error loading team</div>
  }))
);

const SectionSkeleton = memo(({ height = "h-64", className = "" }) => (
  <div className={`bg-gray-100 animate-pulse rounded-lg ${height} ${className}`}>
    <div className="flex items-center justify-center h-full">
      <div className="text-sm text-gray-400">Loading...</div>
    </div>
  </div>
));

SectionSkeleton.displayName = "SectionSkeleton";
SectionSkeleton.propTypes = {
  height: PropTypes.string,
  className: PropTypes.string,
};

const SEOHead = memo(() => (
  <Helmet>
    {/* Basic SEO */}
    <title>LinkedIn Local Nigeria 2025 | Inspiring Talks, Networking, and Innovation</title>
    <meta
      name="description"
      content="Join LinkedIn Local Nigeria 2025 to connect with industry leaders, discover new ideas, and be inspired by world-class speakers. Secure your spot today."
    />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://www.linkedninlocalnigeria.com/" />

    {/* Open Graph for social sharing */}
    <meta property="og:title" content="LinkedIn Local Nigeria 2025 | Inspiring Talks, Networking, and Innovation" />
    <meta
      property="og:description"
      content="Join LinkedIn Local Nigeria 2025 to connect with industry leaders, discover new ideas, and be inspired by world-class speakers."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.linkedninlocalnigeria.com/" />
    <meta property="og:image" content="/world-map.svg" />

    {/* Twitter Card */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="LinkedIn Local Nigeria 2025 | Inspiring Talks, Networking, and Innovation" />
    <meta
      name="twitter:description"
      content="Join LinkedIn Local Nigeria 2025 to connect with industry leaders, discover new ideas, and be inspired by world-class speakers."
    />
    <meta name="twitter:image" content="/world-map.svg" />

    {/* Preload asset */}
    <link rel="preload" href="/world-map.svg" as="image" />
  </Helmet>
));

const HeroSectionWrapper = memo(() => (
  <Section id="about" background="bg-[#FDFDFD]">
    <HeroSection />
  </Section>
));

const EventInfoSection = memo(() => (
  <Section className="py-10 border-t" background="bg-[#fdfdfd]">
    <Container>
      <EventInfo />
    </Container>
  </Section>
));

const BelowFoldSection = memo(() => (
  <Section id="below-fold" className="border-t">
    <Suspense fallback={<SectionSkeleton height="h-96" />}>
      <BelowFoldContent />
    </Suspense>
  </Section>
));

const SpeakersSection = memo(() => (
  <Section id="speakers" className="border-t" background="bg-[#fdfdfd]">
    <Suspense fallback={<SectionSkeleton height="h-[32rem]" />}>
      <Speakers />
    </Suspense>
  </Section>
));

const TeamSectionWrapper = memo(() => (
  <Section id="teams" className="border-t">
    <Suspense fallback={<SectionSkeleton height="h-[40rem]" />}>
      <TeamSection />
    </Suspense>
  </Section>
));

const Home = memo(() => {
  return (
    <>
      <SEOHead />
      <HeroSectionWrapper />
      <section className="mobile-vertical-lines desktop-vertical-lines">
        
        <EventInfoSection />
        <BelowFoldSection />
        <SpeakersSection />
        <TeamSectionWrapper />
        <AdditionalContent />
      </section>
    </>
  );
});

Home.displayName = "Home";

export default Home;