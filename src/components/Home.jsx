import { HeroSection } from "./HeroSection";
import Section from "./ui/Section";

const Home = () => {
  return (
    <>
      <Section id="about">
        <HeroSection />
      </Section>

      <Section
        id="speakers"
        title="Speakers Section"
        className="min-h-screen border-t"
        background="bg-[#fdfdfd]"
      >
        <p>Content for the Speakers section goes here...</p>
      </Section>

      <Section
        id="teams"
        title="Team Section"
        className="min-h-screen border-t"
        background="bg-[#fdfdfd]"
      >
        <p>Content for the Teams section goes here...</p>
      </Section>

      <Section
        id="faqs"
        title="FAQs Section"
        className="min-h-screen border-t"
        background="bg-[#fdfdfd]"
      >
        <p>Content for the FAQs section goes here...</p>
      </Section>
    </>
  );
};

export default Home;
