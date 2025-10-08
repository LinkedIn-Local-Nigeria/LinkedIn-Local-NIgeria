import { useRef, useState } from "react";

import { Download } from "lucide-react";
import html2canvas from "html2canvas";

function CertificateGenerator() {
  const [name, setName] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  async function handleDownload() {
    if (!name.trim()) {
      return alert("Please enter your full name to download your certificate.");
    }

    const elementContainer = containerRef.current;
    if (!elementContainer) {
      console.error("Container element not found");
      return;
    }

    if (inputRef.current) {
      inputRef.current.blur();
    }

    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(elementContainer, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        windowWidth: elementContainer.scrollWidth,
        windowHeight: elementContainer.scrollHeight,
      });

      const link = document.createElement("a");
      link.download = `${name.trim().replace(/\s+/g, "-").toLowerCase()}-certificate.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Certificate generation failed:", error);
      alert("Failed to generate certificate. Please try again.");
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
              <div className="w-[60%] text-white flex justify-center items-center text-center absolute top-[56%] left-[20%] z-10">
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Your Name here"
                  aria-label="Full name for certificate"
                  className="w-full font-bold text-center text-white uppercase transition-all bg-transparent border-none outline-none font-manrope text-[3vw] placeholder-white/70 focus:placeholder-white/40"
                  style={{
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    caretColor: "white",
                  }}
                />
              </div>

              <img
                className="block object-cover w-full h-auto"
                id="certificate-image"
                src="/llc-attendee-certificate.png"
                alt="LinkedIn Local Nigeria attendee certificate"
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
          </div>
        </section>
      </div>
    </div>
  );
}

export default CertificateGenerator;
