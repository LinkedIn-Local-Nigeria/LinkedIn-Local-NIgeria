import  { useEffect, useRef, useState } from "react";

import WorldMap  from "./ui/WorldMap";

const sections = [
  "Information We Collect",
  "How We Use Your Information",
  "How We Share Information",
  "Security of Your Information",
  "Your Rights",
  "Cookies",
  "Changes to this Policy",
  "Contact Us",
];

export default function TermsOfUse() {
  const [activeSection, setActiveSection] = useState(-1);
  const itemRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((_, idx) => document.getElementById(`section${idx + 1}`));
      const scrollPosition = window.scrollY + window.innerHeight / 4;
      let current = -1;
      sectionElements.forEach((el, idx) => {
        if (el && el.offsetTop < scrollPosition) {
          current = idx;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Calculate the indicator bar's top and height
    if (itemRefs.current[activeSection]) {
      const first = itemRefs.current[0];
      const last = itemRefs.current[activeSection];
      if (first && last) {
        const sidebarRect = first.parentNode.getBoundingClientRect();
        const top = first.offsetTop;
        const height = last.offsetTop + last.offsetHeight - first.offsetTop;
        setIndicatorStyle({ top, height });
      }
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-manrope">
      {/* WorldMap background section */}
      <div className="w-full aspect-[2/1] mt-16 relative overflow-hidden">
        <WorldMap className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className="text-2xl text-center"
            style={{
              color: '#0076B2',
              fontFamily: 'Poppins',
              fontWeight: 800,
              lineHeight: '1.1',
              letterSpacing: 0,
            }}
          >
            Terms and Conditions
          </h1>
        </div>
      </div>
      <div className="w-full px-0">
        <div className="px-4 mt-32 mb-32 ml-4 space-y-12 max-w-7xl md:ml-20">
          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
              1. Use of Website
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              You agree to use this website only for lawful purposes related to event registration, participation, and engagement.
            </p>
          </section>
          
          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
            2. Event Registration
            </h3>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-sm md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
                <li>All attendees must register with accurate details.</li>
                <li>We reserve the right to approve or decline registration.</li>
                <li>Tickets may be limited and are available on a first-come, first-served basis.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
              3. Content Usage
            </h3>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-sm md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
                <li>By attending the event, you consent to the use of your image in photos or videos for promotional purposes.</li>
                <li>You may not use any content from the event or website (logos, media, materials) without written permission.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
              4. Code Of Conduct
            </h3>
            <p className="text-left  font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              Attendees must:
            </p>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-sm md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
                <li>Show respect to fellow participants.</li>
                <li>Avoid harassment, discrimination, or inappropriate behavior.</li>
                <li>Follow the event rules as announced by organizers.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
              5. Refunds and Cancellations
            </h3>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-sm md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
                <li>Tickets are non-refundable unless the event is canceled by the organizers.</li>
                <li>If rescheduled, your ticket will remain valid for the new date.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
              6. Limitation of Liability
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              LinkedIn Local Nigeria is not liable for:
            </p>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-sm md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
                <li>Personal injury, loss, or damage during the event.</li>
                <li>Technical issues on the website beyond our control.</li>
            </ul>
          </section> 

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-sm md:text-[40px] leading-snug text-[#0076B2]">
              7. Changes to the Policy
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              We may update these Terms occasionally. By continuing to use the site, you accept the revised terms.
            </p>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-base md:text-[40px] leading-snug text-[#0076B2]">
              8. Contact Us
            </h3>
            <p className="text-left font-manrope text-sm md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
             For inquiries, email us at info@llnteam.com.
            </p>
          </section>
        </div>
      </div>

    </div>
  );
} 