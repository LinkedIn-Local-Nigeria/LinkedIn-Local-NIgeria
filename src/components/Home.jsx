/* eslint-disable react/display-name */

import { Suspense, lazy, memo } from "react";

import Container from "./ui/Container";
import { EventInfo } from "./EventInfo";
import { Helmet } from "react-helmet-async";
import HeroSection  from "./HeroSection";
import PropTypes from "prop-types";
import Section from "./ui/Section";

const BelowFoldContent = lazy(() =>
  import("../components/BelowFoldContent").then((module) => ({
    default: module.default || module.BelowFoldContent,
  }))
);

const Speakers = lazy(() =>
  import("../components/Speakers").then((module) => ({
    default: module.default || module.Speakers,
  }))
);
const TeamSection = lazy(() =>
  import("../components/TeamSection").then((module) => ({
    default: module.default || module.TeamSection,
  }))
);

const SectionSkeleton = memo(({ height = "h-64" }) => (
  <div className={`bg-gray-100 animate-pulse rounded-lg ${height}`} />
));

SectionSkeleton.displayName = "SectionSkeleton";
SectionSkeleton.propTypes = {
  height: PropTypes.string,
};

const SEOHead = memo(() => (
  <Helmet>
    <title>LinkedIn Local Nigeria 2025 | We Gather, We Learn, We Evolve</title>
    <meta
      name="description"
      content="Join Nigeria's largest professional networking event. Connect with industry leaders, entrepreneurs, and innovators at LinkedIn Local Nigeria 2025."
    />
    <meta
      name="keywords"
      content="LinkedIn Local Nigeria, professional networking, business event Nigeria, career development, entrepreneurs Nigeria, LinkedIn event"
    />
    <meta name="robots" content="index, follow" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#0076B2" />
    <link rel="canonical" href="https://linkedinlocalnigeria.com/" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="preload" href="/group-pic.webp" as="image" />
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