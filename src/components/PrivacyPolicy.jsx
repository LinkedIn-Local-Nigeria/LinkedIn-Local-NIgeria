import { useEffect, useRef, useState } from "react";

import { WorldMap } from "./ui/WorldMap";
import { mapdots } from "./constants/mapdots";

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

export default function PrivacyPolicy() {
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
            className="text-center"
            style={{
              color: '#0076B2',
              fontFamily: 'Poppins',
              fontWeight: 800,
              fontSize: '2.5rem',
              lineHeight: '1.1',
              letterSpacing: 0,
            }}
          >
            Privacy Policy
          </h1>
        </div>
      </div>
      <div className="w-full px-0">
        <div className="px-4 mt-20 mb-20 ml-4 space-y-12 max-w-7xl md:ml-20">
          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              1. Information We Collect
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              We may collect the following:
            </p>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              <li>Personal Information: Name, email, phone number, social media handle, and job title during registration.</li>
              <li>Usage Data: IP address, browser type, pages visited, and access time.</li>
              <li>Media: Photos and videos taken during the event.</li>
            </ul>
          </section>
          
          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
            2. How We Use Your Information
            </h3>
            <p className="text-left  font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              We use your information to:
            </p>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              <li>Process your event registration.</li>
              <li>Communicate updates or changes related to the event.</li>
              <li>Improve our services and website.</li>
              <li>Share highlights from the event (photos, testimonials) with your consent.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              3. How we share information
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
               We do not sell your personal data. We may share information:
            </p>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
            <li>With event partners or sponsors strictly for event-related purposes.</li>
            <li>If legally required (e.g., compliance with Nigerian laws).</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              4. Security of Your Information
            </h3>
            <p className="text-left  font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              We implement industry-standard security measures to protect your data. However, no system is 100% secure.
            </p>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              5. Your Rights
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              You may:
            </p>
            <ul className="list-disc pl-5 md:pl-6 text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              <li>Request access to your data.</li>
              <li>Ask us to delete or update your information.</li>
              <li>Opt out of newsletters or marketing emails.</li>
            </ul>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              6. Cookies
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              Our website may use cookies to improve user experience. You can disable cookies in your browser settings.
            </p>
          </section> 

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              7. Changes to the Policy
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              We may update this policy occasionally. We'll notify users through the website if major changes occur.
            </p>
          </section>

          <section>
            <h3 className="mb-6 font-poppins font-semibold text-left text-[28px] md:text-[40px] leading-snug text-[#0076B2]">
              8. Contact Us
            </h3>
            <p className="text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B]">
              If you have questions about this policy, contact us at:
            </p>
            <ul className="list-none pl-0 text-left font-manrope text-base md:text-[20px] leading-6 md:leading-[30px] text-[#52525B] mt-2">
              <li><b>Email:</b> info@llnteam.com</li>
              <li><b>Phone:</b> +2348022471093</li>
              <li><b>Address:</b> www.linkedinnlocalnigeria.com</li>
            </ul>
          </section>
        </div>
      </div>

    </div>
  );
} 