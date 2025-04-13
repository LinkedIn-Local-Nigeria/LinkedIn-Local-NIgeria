import Container from "./ui/Container";
import Cta from "./Cta";
import { EventInfo } from "./EventInfo";
import { HeroSection } from "./HeroSection";
import Section from "./ui/Section";
import TeamSection from '../components/TeamSection';
import MissionVision from '../components/MissionVision';
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

        {/* Other sections goes here */}



        <Section
         id="mission-vision"
         title=""
         className="min-h-screen"
        >
          <MissionVision />

        </Section>


        <Section
          id="speakers"
          className="min-h-screen"
          background="bg-[#fdfdfd]"
        >
          <p>Content for the Speakers section goes here...</p>
        </Section>

        <Section
          id="teams"
          title="Speakers Section"
          className="min-h-screen border-t"
        >
         <TeamSection />
        </Section>

        <Section
          id="faqs"
          title="FAQs Section"
          className="min-h-screen border-t"
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
