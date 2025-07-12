// src/components/ui/ScrollToHashElement.jsx

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 

      return () => clearTimeout(timer);
    }
  }, [hash]);

  return null;
};

export default ScrollToHashElement;
