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
    <meta name="robots" content="index, follow" />
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
      </section>
    </>
  );
});

Home.displayName = "Home";

export default Home;