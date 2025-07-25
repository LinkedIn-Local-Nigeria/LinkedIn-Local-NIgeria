import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import PropTypes from "prop-types";
import { motion } from "framer-motion";

const MAP_DIMENSIONS = {
  width: 800,
  height: 400,
  viewBox: "0 0 800 400",
};

const OBSERVER_CONFIG = {
  threshold: 0.1,
  rootMargin: "100px",
};

const FALLBACK_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
  <rect width="100%" height="100%" fill="#fdfdfd" />
  <text x="50%" y="50%" text-anchor="middle" fill="#666" font-size="20">
    Unable to load map
  </text>
</svg>`;

const MapGradient = memo(({ lineColor }) => (
  <defs>
    <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="white" stopOpacity="0" />
      <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
      <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
      <stop offset="100%" stopColor="white" stopOpacity="0" />
    </linearGradient>
  </defs>
));

MapGradient.displayName = "MapGradient";
MapGradient.propTypes = {
  lineColor: PropTypes.string,
};

const AnimatedPath = memo(({ path, index }) => (
  <motion.path
    d={path}
    fill="none"
    stroke="url(#path-gradient)"
    strokeWidth="1"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.3 * index,
      ease: "easeOut",
    }}
  />
));

AnimatedPath.displayName = "AnimatedPath";
AnimatedPath.propTypes = {
  path: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

const AnimatedPoint = memo(({ point, lineColor }) => (
  <g>
    <circle cx={point.x} cy={point.y} r="2" fill={lineColor} />
    <circle cx={point.x} cy={point.y} r="2" fill={lineColor} className="animate-pulse">
      <style>
        {`
          .animate-pulse {
            animation: pulse 1.5s infinite ease-out;
          }
          @keyframes pulse {
            0% { r: 2; opacity: 0.5; }
            100% { r: 8; opacity: 0; }
          }
        `}
      </style>
    </circle>
  </g>
));

AnimatedPoint.displayName = "AnimatedPoint";
AnimatedPoint.propTypes = {
  point: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  lineColor: PropTypes.string.isRequired,
};

const WorldMap = memo(({ dots = [], lineColor = "#0ea5e9", className = "relative" }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mapError, setMapError] = useState(false);

  const projectPoint = useCallback((lat, lng) => {
    const x = (lng + 180) * (MAP_DIMENSIONS.width / 360);
    const y = (90 - lat) * (MAP_DIMENSIONS.height / 180);
    return { x, y };
  }, []);

  const createCurvedPath = useCallback((start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  const processedDots = useMemo(() => {
    if (!Array.isArray(dots) || dots.length === 0) {
      console.warn("WorldMap: No valid dots provided");
      return [];
    }
    return dots
      .slice(0, 72)
      .map((dot, index) => {
        if (!dot?.start?.lat || !dot?.start?.lng || !dot?.end?.lat || !dot?.end?.lng) {
          console.warn(`WorldMap: Invalid dot data at index ${index}`, dot);
          return null;
        }
        const start = projectPoint(dot.start.lat, dot.start.lng);
        const end = projectPoint(dot.end.lat, dot.end.lng);
        const path = createCurvedPath(start, end);
        return { start, end, path };
      })
      .filter(Boolean);
  }, [dots, projectPoint, createCurvedPath]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      OBSERVER_CONFIG
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const containerClasses = useMemo(
    () => `w-full aspect-[2/1] bg-[#fdfdfd] rounded-lg font-manrope ${className}`,
    [className]
  );

  const handleImageError = () => {
    console.warn("WorldMap: Failed to load /world-map.svg");
    setMapError(true);
  };

  return (
    <div ref={containerRef} className={containerClasses}>
      {isVisible && (
        <>
          {mapError ? (
            <div
              className="h-full w-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: FALLBACK_SVG }}
            />
          ) : (
            <img
              src="/world-map.svg"
              alt="world map"
              className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
              width="800"
              height="400"
              draggable={false}
              onError={handleImageError}
            />
          )}
          <svg
            viewBox={MAP_DIMENSIONS.viewBox}
            className="absolute inset-0 w-full h-full pointer-events-none select-none"
          >
            <MapGradient lineColor={lineColor} />
            {processedDots.map((dot, i) => (
              <g key={`path-${i}`}>
                <AnimatedPath path={dot.path} index={i} />
              </g>
            ))}
            {processedDots.map((dot, i) => (
              <g key={`points-${i}`}>
                <AnimatedPoint point={dot.start} lineColor={lineColor} />
                <AnimatedPoint point={dot.end} lineColor={lineColor} />
              </g>
            ))}
          </svg>
        </>
      )}
    </div>
  );
});

WorldMap.displayName = "WorldMap";
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
  ),
  lineColor: PropTypes.string,
  className: PropTypes.string,
};

export default WorldMap;