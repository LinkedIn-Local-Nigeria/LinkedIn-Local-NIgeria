import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

const Button = ({ className, children, ...props }) => {
  const defaultClasses = twMerge(
    `flex items-center justify-center font-manrope text-[12px] bg-blue-600 py-3 px-3 gap-2 rounded text-white transition duration-300 ease-in-out 
    hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`,
    className
  );

  return (
    <button type="button" className={defaultClasses} {...props}>
      <PaperPlaneIcon className="-rotate-45" />
      {children || "Button"}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
