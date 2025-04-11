import Section from './components/ui/Section';
import TeamSection from './components/TeamSection';

const MainContent = () => {
  return (
    <>
      <Section id='about' title='About Section' background='bg-[#fdfdfd]'>
        <p>Content for the About section goes here...</p>
      </Section>

      <Section id='speakers' title='Speakers Section' background='bg-[#fdfdfd]'>
        <p>Content for the Speakers section goes here...</p>
      </Section>

      <TeamSection id='teams' title='Team Section' background='bg-[#fdfdfd]'/>

      <Section id='faqs' title='FAQs Section' background='bg-[#fdfdfd]'>
        <p>Content for the FAQs section goes here...</p>
      </Section>
    </>
  );
};

export default MainContent;
