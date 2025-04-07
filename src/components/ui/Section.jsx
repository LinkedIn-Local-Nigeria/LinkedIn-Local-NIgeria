import React from "react";
import { twMerge } from "tailwind-merge";

const Section = ({ id, title, children,className, background = "bg-[#fdfdfd]" }) => {
  return (
    <section
      id={id}
      className={twMerge(
        `text-gray-500 border-t border-gray-300 min-h-screen`,
        className,
        background
      )}
    >
      <div className="container py-12 mx-auto">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
