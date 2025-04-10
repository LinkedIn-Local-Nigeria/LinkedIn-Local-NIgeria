import PropTypes from "prop-types";

const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`max-w-[75rem] mx-auto px-6 sm:px-6 lg:px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired, // Expecting any valid React node
  className: PropTypes.string, // Allowing custom className for styling
};

export default Container;
