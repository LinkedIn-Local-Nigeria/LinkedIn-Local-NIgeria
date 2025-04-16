import Container from "./ui/Container";
import Cta from "./Cta";
import { EventInfo } from "./EventInfo";
import Events from "./Events";
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
          id="speakers"
          className=""
          background="bg-[#fdfdfd]"
        >
          <WhyAttend />
          <Speakers />
        </Section>

        <Section
          id="teams"
          className="border-t "
        >
          <Container>
            <Events />
          </Container>
        </Section>
        <Section
          id="teams"
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
          title="FAQs Section"
          className="border-t "
        >
          <p>Content for the FAQs section goes here...</p>
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
