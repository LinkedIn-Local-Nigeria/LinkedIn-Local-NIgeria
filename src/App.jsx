import "./App.css";
import Navbar from "./components/NavBar";
import Section from "./components/ui/Section";

function App() {
  return (
    <>
      <Navbar />

      <Section id="about" title="About Section" background="bg-[#fdfdfd]">
        <p>Content for the About section goes here...</p>
      </Section>

      <Section id="speakers" title="Speakers Section" background="bg-[#fdfdfd]">
        <p>Content for the Speakers section goes here...</p>
      </Section>

      <Section id="teams" title="Team Section" background="bg-[#fdfdfd]">
        <p>Content for the Teams section goes here...</p>
      </Section>

      <Section id="faqs" title="FAQs Section" background="bg-[#fdfdfd]">
        <p>Content for the FAQs section goes here...</p>
      </Section>
    </>
  );
}

export default App;
