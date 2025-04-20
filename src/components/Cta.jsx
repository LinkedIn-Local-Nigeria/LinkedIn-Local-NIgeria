import Button from "./ui/Button";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";

const Cta = () => {
  return (
    <div 
      className="flex flex-col lg:flex-row justify-between items-center lg:items-start p-[1.5rem] lg:p-[5rem]"
      role="region" 
      aria-labelledby="cta-heading"
    >
      {/* Left side content */}
      <div className="flex flex-col items-center max-w-xl gap-3 text-center lg:items-start lg:text-left">
        <span className="flex items-center text-4xl font-semibold tracking-tighter text-gray-800 text-nowrap lg:text-5xl font-poppins">
          <div className="flex items-center mr-2">
            Evolv{" "}
            <LinkedInLogoIcon
              className="w-8 h-8 -mx-1 text-[#0076B2] lg:h-12 lg:w-12"
              aria-label="LinkedIn"
            />{" "}
            g
          </div>
          Beyond
        </span>
        <span className="text-4xl font-semibold tracking-tight text-gray-800 lg:text-5xl font-poppins">
          the Narrative
        </span>
      </div>

      {/* CTA mobile Button */}
      <Button className="w-full mt-4 lg:w-[150px] lg:mt-0">
        Get your ticket
      </Button>
    </div>
  );
};

export default Cta;
