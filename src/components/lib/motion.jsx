import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const MotionSection = ({
  children,
  variant = "slide",
  direction = "left",
  delay = 0,
  duration = 0.8,
  threshold = 0.3,
  staggerChildren = 0.2,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  });

  const parentVariants = {
    slide: {
      hidden: {
        opacity: 0,
        x: direction === "left" ? -100 : 100,
      },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.6, 0.01, -0.05, 0.95], 
          staggerChildren,
        },
      },
    },
    zoom: {
      hidden: {
        opacity: 0,
        scale: 0.8,
      },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: "anticipate",
          staggerChildren,
        },
      },
    },
    flip: {
      hidden: {
        opacity: 0,
        rotateX: 90,
        x: direction === "left" ? -50 : 50,
      },
      visible: {
        opacity: 1,
        rotateX: 0,
        x: 0,
        transition: {
          duration,
          delay,
          ease: [0.6, 0.01, -0.05, 0.95],
          staggerChildren,
        },
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: duration * 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={parentVariants[variant]}
    >
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <motion.div key={index} variants={childVariants}>
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={childVariants}>{children}</motion.div>
      )}
    </motion.div>
  );
};

MotionSection.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["slide", "zoom", "flip"]),
  direction: PropTypes.oneOf(["left", "right"]),
  delay: PropTypes.number,
  duration: PropTypes.number,
  threshold: PropTypes.number,
  staggerChildren: PropTypes.number,
};

MotionSection.defaultProps = {
  variant: "slide",
  direction: "left",
  delay: 0,
  duration: 0.8,
  threshold: 0.3,
  staggerChildren: 0.2,
};

export default MotionSection;