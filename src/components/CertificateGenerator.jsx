import { useRef, useState } from "react";

import { Download } from "lucide-react";
import html2canvas from "html2canvas";

function CertificateGenerator() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const downloadProps = {
    container: "certificate-image-container",
    fileName: `lll-attendee-${new Date().toDateString()}.png`.replaceAll(" ", "-"),
    height: 2550,
    width: 3300,
  };

  async function handleDownload() {
    if (!name.trim()) {
      return alert("Please enter your full name to download your certificate.");
    }

    const elementContainer = document.getElementById(downloadProps.container);
    if (!elementContainer) {
      console.error("Container element not found");
      return;
    }

    // Hide the input cursor and blur effect during capture
    if (inputRef.current) {
      inputRef.current.blur();
    }

    const clone = elementContainer.cloneNode(true);
    clone.style.width = `${downloadProps.width}px`;
    clone.style.height = `${downloadProps.height}px`;
    clone.style.position = "absolute";
    clone.style.left = "-9999px";
    clone.style.top = "0";

    // Find and style the input in the clone to look like static text
    const clonedInput = clone.querySelector('input');
    if (clonedInput) {
      clonedInput.style.caretColor = 'transparent';
      clonedInput.style.border = 'none';
      clonedInput.style.outline = 'none';
    }

    document.body.appendChild(clone);
    await new Promise((resolve) => setTimeout(resolve, 100));

    try {
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        width: downloadProps.width,
        height: downloadProps.height,
      });

      const link = document.createElement("a");
      link.download = downloadProps.fileName;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.error("Certificate generation failed:", error);
      alert("Failed to generate certificate. Please try again.");
    } finally {
      document.body.removeChild(clone);
    }
  }

  return (
    <div className="overflow-x-hidden ont-manrope">
      <div className="w-full px-4 pt-20 md:py-40 md:px-20">
        <section>
          <div className="relative p-4 mt-6 ">
            <div
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
                  className="uppercase font-manrope font-bold text-[3vw] text-center w-full bg-transparent border-none outline-none text-white placeholder-white/70 focus:placeholder-white/40 transition-all"
                  style={{
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
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
              <p className="mt-4 text-[.75rem] center text-gray-500 text-">
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