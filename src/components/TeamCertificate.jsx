import { useEffect, useRef, useState } from "react";

import { Download } from "lucide-react";
import html2canvas from "html2canvas";

// Team members list - normalized for matching
const TEAM_MEMBERS = [
  // Event Logistics Department
  "ALABI JOSHUA OPEYEMI", "ADEBAYO NANCY", "OKE ISRAEL ADEDAYO", 
  "CHUKWUDI TOCHI ESTHER", "FAITH AIZAGBORERUME OSENI", "MODUPE ABOSEDE AYOKO",
  "MAYOWA ADEDARA", "CHIMDIEBERE OKECHUKWU",
  
  // Event Management Department
  "MOTUNRAYO OLUSOLA", "ADEYEMI ANITA", "OGUNLEYE VICTORIA", "JOSEPH MATTHEW",
  "ARANSIOLA ELIZABETH", "TASLIMAH WOLI", "DAMILOLA N AWONUGA", "DAMILOLA AWONUGA",
  "IBUKUNOLUWA ISRAEL OMIDIJI", "AKINLOSE FAVOUR PONMILE", "AYODELE ADESUNLOYE",
  "CHIOMA OKO", "VICTORIA ALIU", "KOLAWOLE BABARALOOREOLUWA", "EBENEZER OGUNBODE",
  "HAPPINESS EMORDI",
  
  // Delegate and Attendee Experience Team
  "ONI OLANREWAJU TIMILEHIN", "KELLY-CHUKWUDI NMERICHUKWU OLUWATONI", 
  "NMERICHUKWU KELLY-CHUKWUDI", "AYOMIDE AJAYI-BEMBE", "POPOOLA OLUWAFUNMILAYO",
  "ADEWALE ANNE", "PRECIOUS OLUWAFERANMI", "JUDITH OGBAMI", "VICTORIA DOUGLAS",
  "JOY SALAKO", "MICHAEL ONAWOLE", "ADEYEMI ADEDOLAPO", "EMMANUEL ESANOLUWA",
  "TIJESUNIMI OKUNOLA", "CHUKWUEMEKA DIVINE M", "DIVINE CHUKWUEMEKA",
  
  // Social Media Team
  "APONJOLOSUN ISRAEL AYOKU", "BADA MUHAMMAD ALUTHAIMEEN", "JENNIFER UDEZE",
  "SAMUEL ADENIGBAGBE", "OLOLADE AKINSOLA", "RUTH AYIBAEMI", "FAIZAT HUSSEIN",
  
  // Content Team
  "EZE UNITY", "GRACIOUS BENEDICT", "OLAMIDE AWOGBEMI", "BLOSSOM UMOREN",
  "MOYINOLUWA ISRAEL", "AIWANFO ISAIAH", "ADEJUMO DAVID ADEDAMOLA", "MALIK HUSSEIN",
  "FAITH ONYINYECHI OSHI", "RACHEAL OLALEKAN", "RUKAYAT OGUNLANA", "OLOWOLAFE MOFIYINFOLUWA MARY",

  
  // Video Editing
  "ELIAS ODIBA", "OLASUBOMI OLUKOGA-ADESHINA", "OLUWAFEMI OLUMUYIWA-LOKO",
  "ESTHER ADEBIMPE ADEWOYE", "EMMANUEL MAYUNGBE", "EMMANUELLA MMESOMACHUKWU OBUEKWE",
  "JOANNA JAIYEOLA", "RUTH ANINKAN",
  
  // Motion Design
  "ESTHER OKPOR", "VIDEMMY", "OLUWAFEMI OYENUGA", "FEMI MAVEN",
  
  // Voice Over Artist Team
  "MODUPE ANN DURODOLA", "MITCHEL ONWUCHURUBA",
  
  // Media Team
  "VICTORIA UMOH", "TOSIN OLOMU", "FRANCIS AYOMIDE AFOLABI", "PELUMI DANIEL",
  "MEGWARA FAVOUR", "JESUTOFUNMI OSIN", "OGUNJIMI ADEKUNLE TOLUWANIMI",
  "GBENGA ADEBAYO", "OMOTAYO OKUNLOLA",
  
  // Branding Team
  "IKENNA JUSTIN GABRIEL", "ANGEL IRUOMA AGBODIKE", "IFEOLUWA CHRISTIANAH FANIYI",
  "ADIO CORNELIUS", "VICTOR JOSEPH", "DAVID OLUWADAMILARE CHIMA", "EBUBECHUKWU SAMUEL",
  "PRECIOUS ADEBOWALE", "KATOLA AYOMIPO DICKSON", "GIFT NJOKU", "OLUWAPONMILE AWORETAN",
  
  // Community Management Team
  "BERNICE ORJI", "ETOROMA OGHENEMARO MIRACLE", "YAKUB DAMOLA YAKUB", "UMAR ISHAQ DARAZO",
  "OLUWATOSIN PEACE", "AKOTO BLESSING OGHENEOJIYOVWI", "CHRISTIANA ELOJO",
  "KAMAL SALLAU LAMBA", "HAUWA YAU BULAMA", "ABDULATEEF AKANBI", "ABIOLA AYOKUNLE JOSHUA",
  
  // Web Development
  "ISREAL ALUKO", "ISRAEL ALUKO", "OLUWASEUN AKEREDOLU", "ANIBE DAVID ACHEMA",
  "FARAMADE TOLUWANIMI EMMANUEL", "IDIGHEKERE UDEME UDO", "OLUWATOSIN FAITH OGUNGBAYE",
  "OLUWAPELUMI OLAMILEKAN", "AYOTOMIWA ONIFARA",
  
  // Award Department
  "MMONEKE GOSHEN", "WONDERFUL ADETULA", "ADENIYI BUNMI", "IBUKUNOLUWAPO OGUNDEJI",
  
  // Partnership and Sponsorship
  "ANJOLAOLUWA ADEGBOLA", "BAKRE DAMILOLA", "VICTORIA OLAMIDE", "EBENEZER TOMOYE",
  
  // Leadership
  "TOMIDE WILLIAMS SODUNKE", "MODUPE OREYE", "EMMANUEL NDUKA", "OLADOTUN AJAYI"
];

function isTeamMember(inputName) {
  const normalized = inputName.trim().toUpperCase().replace(/\s+/g, " ");
  return TEAM_MEMBERS.includes(normalized);
}

export default function TeamCertificate() {
  const [name, setName] = useState("");
  const [fontSize, setFontSize] = useState("3vw");
  const [errorMessage, setErrorMessage] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const textDisplayRef = useRef(null);

  useEffect(() => {
    const nameLength = name.length;
    let newFontSize;
    
    if (nameLength === 0) {
      newFontSize = "clamp(12px, 2vw, 60px)";
    } else if (nameLength <= 10) {
      newFontSize = "clamp(16px, 2.5vw, 60px)";
    } else if (nameLength <= 15) {
      newFontSize = "clamp(14px, 2vw, 50px)";
    } else if (nameLength <= 20) {
      newFontSize = "clamp(12px, 1.8vw, 45px)";
    } else if (nameLength <= 25) {
      newFontSize = "clamp(10px, 1.5vw, 40px)";
    } else {
      newFontSize = "clamp(8px, 1.2vw, 35px)";
    }
    
    setFontSize(newFontSize);
  }, [name]);

  async function handleDownload() {
    if (!name.trim()) {
      setErrorMessage("Please enter your full name to download your certificate.");
      return;
    }

    // Check if the person is a team member
    if (!isTeamMember(name)) {
      setErrorMessage("Sorry, you are not a registered team member. Only team members can download certificates.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    const elementContainer = containerRef.current;
    if (!elementContainer) {
      console.error("Container element not found");
      return;
    }

    if (inputRef.current && textDisplayRef.current) {
      inputRef.current.style.display = "none";
      textDisplayRef.current.style.display = "block";
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(elementContainer, {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `${name.trim().replace(/\s+/g, "-").toLowerCase()}-certificate.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Certificate generation failed:", error);
      setErrorMessage("Failed to generate certificate. Please try again.");
    } finally {
      if (inputRef.current && textDisplayRef.current) {
        inputRef.current.style.display = "block";
        textDisplayRef.current.style.display = "none";
      }
    }
  }

  return (
    <div className="overflow-x-hidden font-manrope">
      <div className="w-full px-4 pt-20 md:py-40 md:px-20">
        <section>
          <div className="relative p-4 mt-6">
            <div
              ref={containerRef}
              className="relative grid w-full overflow-hidden place-items-center"
              id="certificate-image-container"
            >
              <div className="w-[60%] text-white flex justify-center items-center text-center absolute top-[54%] sm:top-[56%] left-[20%] z-10 px-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value.toUpperCase())}
                  placeholder="ENTER YOUR NAME HERE"
                  maxLength={35}
                  className="w-full font-bold leading-tight text-center text-white uppercase transition-all bg-transparent border-none outline-none font-manrope placeholder-white/70 focus:placeholder-white/40"
                  style={{
                    fontSize: fontSize,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    caretColor: "white",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                />
                <div
                  ref={textDisplayRef}
                  className="w-full font-bold leading-tight text-center text-white font-manrope"
                  style={{
                    fontSize: fontSize,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    display: "none",
                    textTransform: "uppercase",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {name.toUpperCase() || "ENTER YOUR NAME HERE"}
                </div>
              </div>

              <img
                className="block object-cover w-full h-auto"
                id="certificate-image"
                src="/team-certificate.png"
                alt="LinkedIn Local Nigeria attendee certificate"
                crossOrigin="anonymous"
              />
            </div>

            <div className="flex justify-center mt-6 md:justify-start">
              <button
                onClick={handleDownload}
                disabled={!name.trim()}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-bold text-white transition-all bg-green-600 rounded-full cursor-pointer font-manrope hover:bg-green-700 hover:shadow-xl hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Download size={20} />
                Download Certificate
              </button>
            </div>

            {!name.trim() && (
              <p className="mt-4 text-[.75rem] text-center text-gray-500">
                Enter your name on the certificate to enable download
              </p>
            )}
            
            {errorMessage && (
              <p className="mt-4 text-sm font-semibold text-center text-red-600">
                {errorMessage}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
