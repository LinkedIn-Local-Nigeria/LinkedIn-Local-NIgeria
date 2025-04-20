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


