import PropTypes from "prop-types";
import { twMerge } from "tailwind-merge";

const Section = ({ id, title, children, className, background = "" }) => {
  return (
    <section
      id={id}
      className={twMerge(`text-gray-500`, className, background)}
    >
      <div className="mx-auto">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>
        {children}
      </div>
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  background: PropTypes.string,
};

export default Section;
