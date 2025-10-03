import { Download } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import WorldMap from "./ui/WorldMap";

function CertificateGenerator() {
  const [name, setName] = useState("");

  const downloadProps = {
    container: "certificate-image-container",
    fileName: `lll-attendee-${new Date().toDateString()}.png`.replaceAll(
      " ",
      "-"
    ),
    height: "2550",
    width: "3300",
  };

  function handlerDownload() {
    if (!name)
      return alert("Enter your full name to download your certificate.");
    element2Png(downloadProps);
  }
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-manrope">
      {/* WorldMap background section */}
      <div className="w-full aspect-[2/1] mt-16 relative overflow-hidden">
        <WorldMap className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h1
            className="text-3xl text-center"
            style={{
              color: "#0076B2",
              fontFamily: "Poppins",
              fontWeight: 800,
              lineHeight: "1.1",
              letterSpacing: 0,
            }}
          >
            Certificate
          </h1>
        </div>
      </div>
      <div className="w-full px-0">
        <section>
          <div className="mt-6 p-4 shadow-xl grid grid-rows-[auto_1fr] gap-5 relative">
            <div className="text-left mb-5 font-manrope">
              <label className="text-black  font-manrope">
                Enter your full name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name as it should appear on your certificate..."
                className="text-[clamp(1.25rem,1.6vw,1.5rem)] font-manrope bg-white text-black px-4 mt-[5px] w-full h-10 border-2  rounded-lg outline-none"
              />
            </div>
            <div
              className="w-full grid place-items-center overflow-hidden relative"
              id="certificate-image-container"
            >
              <div className="w-[60%] text-white flex justify-center items-center text-center absolute top-[56%] left-[20%]">
                <p className="uppercase font-manrope font-bold text-[3vw] whitespace-nowrap">
                  {name || "Your name will appear here"}
                </p>
              </div>
              <img
                className="w-full h-auto block object-cover"
                id="certificate-image"
                src="/llc-attendee-certificate.png"
                alt="linkedin local lagos attendee certificate"
              />
            </div>
            <button
              onClick={handlerDownload}
              className="flex place-items-center font-manrope font-bold w-24 text-green-600 bg-white absolute border-none rounded-full p-3 left-[4%] bottom-[4%] cursor-pointer hover:shadow-xl hover:scale-110"
            >
              <Download size={"25%"} />
              Download
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CertificateGenerator;

function element2Png(downloadProps) {
  console.log(downloadProps);
  async function handleDownload() {
    const elementContainer = document.getElementById(downloadProps.container);
    if (!elementContainer)
      return console.error("container doesn't match any element ID");

    const WIDTH = downloadProps.width;
    const HEIGHT = downloadProps.height;

    const clone = elementContainer.cloneNode(true);

    clone.style.width = `${WIDTH}px`;
    clone.style.height = `${HEIGHT}px`;
    // clone.style.position = "absolute";
    clone.style.left = "-9999px";

    document.body.appendChild(clone);
    await new Promise((r) => setTimeout(r, 100));

    try {
      const canvas = await html2canvas(clone, {
        scale: 1,
        useCORS: true,
        backgroundColor: null,
        logging: true,
        windowWidth: WIDTH,
        windowHeight: HEIGHT,
      });

      const link = document.createElement("a");
      link.download = downloadProps.fileName;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();
    } catch (error) {
      console.log("captured Failed'", error);
    } finally {
      document.body.removeChild(clone);
    }
  }
  return handleDownload();
}
