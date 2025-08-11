import Container from "./ui/Container";
import Cta from "./Cta";
import Faq from "./Faq";
import Scoop from "./Scoop";
import Section from "./ui/Section";
import { memo } from "react";

const AdditionalContent = memo(() => (
  <>
    <Section id="scoop" className="border-t">
      <Container>
        <Scoop />
      </Container>
    </Section>
    <Section id="faqs" title="" className="border-t">
      <Faq />
    </Section>
    <Section className="desktop-cta-bg mobile-cta-bg">
      <Container>
        <Cta />
      </Container>
    </Section>
  </>
));

AdditionalContent.displayName = "AdditionalContent";

export default AdditionalContent;