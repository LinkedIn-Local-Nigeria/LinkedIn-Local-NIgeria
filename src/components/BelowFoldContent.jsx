import Container from "./ui/Container";
import Cta from "./Cta";
import Events from "./Events";
import Faq from "./Faq";
import MissionVision from "./MissionVision";
import Scoop from "./Scoop";
import Section from "./ui/Section";
import WhyAttend from "./WhyAttend";
import { memo } from "react";

const BelowFoldContent = memo(() => (
  <>
    <Section id="mission-vision" title="" className="">
      <MissionVision />
    </Section>
    <Section className="" background="bg-[#fdfdfd]">
      <WhyAttend />
    </Section>
    <Section id="events" className="border-t">
      <Events />
    </Section>
  </>
));

BelowFoldContent.displayName = "BelowFoldContent";

export default BelowFoldContent;