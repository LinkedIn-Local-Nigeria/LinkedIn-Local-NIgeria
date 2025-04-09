import { twMerge } from "tailwind-merge";

const Section = ({
  id,
  title,
  children,
  className,
  background = "bg-[#fdfdfd]",
}) => {
  return (
    <section
      id={id}
      className={twMerge(
        `text-gray-500 border-gray-300`,
        className,
        background
      )}
    >
      <div className="mx-auto">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </section>
  );
};

export default Section;
