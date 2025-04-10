import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import Button from "./ui/Button";

const Cta = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start p-[1.5rem] lg:p-[5rem]">
      {/* Left side content */}
      {/* Left side content */}
      <div className="flex flex-col items-center max-w-xl gap-3 text-center lg:items-start lg:text-left">
        <h2 id="cta-heading" className="flex items-center text-4xl font-semibold tracking-tighter text-gray-800 text-nowrap lg:text-5xl font-poppins">
          <div className="flex items-center mr-2">
            Evolvin{" "}
            <LinkedInLogoIcon className="w-8 h-8 -mx-1 text-blue-600 lg:h-10 lg:w-10" />{" "}
            g
          </div>
          Beyond
        </h2>
        <h3 className="text-4xl font-semibold tracking-tight text-gray-800 lg:text-5xl font-poppins">
          the Narrative
        </h3>
      </div>

      {/* CTA mobile Button */}
      <Button className="w-full mt-4 lg:w-[150px] lg:mt-0">
        Get your ticket
      </Button>
    </div>
  );
};

export default Cta;
