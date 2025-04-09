import DottedMap from "dotted-map";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  className = "relative",
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const map = useMemo(() => {
    return new DottedMap({ height: 100, grid: "diagonal" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.22,
      color: "#00000040",
      shape: "circle",
      backgroundColor: "#fdfdfd",
    });
  }, [map]);

  const projectPoint = useMemo(
    () => (lat, lng) => {
      const x = (lng + 180) * (800 / 360);
      const y = (90 - lat) * (400 / 180);
      return { x, y };
    },
    []
  );

  const createCurvedPath = useMemo(
    () => (start, end) => {
      const midX = (start.x + end.x) / 2;
      const midY = Math.min(start.y, end.y) - 50;
      return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={`w-full aspect-[2/1] bg-[#fdfdfd] rounded-lg font-manrope ${className}`}
    >
      {isVisible && (
        <>
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
            className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
            alt="world map"
            height="495"
            width="1056"
            draggable={false}
          />
          <svg
            ref={svgRef}
            viewBox="0 0 800 400"
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
          >
            <defs>
              <linearGradient
                id="path-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="white" stopOpacity="0" />
                <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
                <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>

            {dots.map((dot, i) => {
              const start = projectPoint(dot.start.lat, dot.start.lng);
              const end = projectPoint(dot.end.lat, dot.end.lng);
              return (
                <g key={`path-${i}`}>
                  <motion.path
                    d={createCurvedPath(start, end)}
                    fill="none"
                    stroke="url(#path-gradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3 * i,
                      ease: "easeOut",
                    }}
                  />
                </g>
              );
            })}

            {dots.map((dot, i) => {
              const start = projectPoint(dot.start.lat, dot.start.lng);
              const end = projectPoint(dot.end.lat, dot.end.lng);
              return (
                <g key={`points-${i}`}>
                  {[start, end].map((point, index) => (
                    <g key={`${index === 0 ? "start" : "end"}-${i}`}>
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="2"
                        fill={lineColor}
                      />
                      <circle
                        cx={point.x}
                        cy={point.y}
                        r="2"
                        fill={lineColor}
                        opacity="0.5"
                      >
                        <animate
                          attributeName="r"
                          from="2"
                          to="8"
                          dur="1.5s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          from="0.5"
                          to="0"
                          dur="1.5s"
                          begin="0s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  ))}
                </g>
              );
            })}
          </svg>
        </>
      )}
    </div>
  );
}

WorldMap.propTypes = {
  dots: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      end: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  lineColor: PropTypes.string,
  className: PropTypes.string,
};
