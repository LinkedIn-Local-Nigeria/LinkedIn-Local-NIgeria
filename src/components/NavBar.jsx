import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";

const navLinks = [
  { id: 1, label: "About Us", href: "#about" },
  { id: 2, label: "Speakers", href: "#speakers" },
  { id: 3, label: "Teams", href: "#teams" },
  { id: 4, label: "FAQs", href: "#faqs" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav className="lg:px-[6.25rem] flex items-center justify-between z-50 px-6 py-4 border-b border-gray-200 mx-auto fixed w-full bg-opacity-10 backdrop-blur-md">
        <a
          href="/"
          className="text-2xl font-bold text-transparent font-poppins bg-gradient-to-r from-blue-500 to-black bg-clip-text"
        >
          LLN '25
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="relative py-2 font-manrope text-black text-sm font-normal hover:text-blue-700 transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Desktop Button */}
        <Button className="hidden lg:flex">Get your ticket</Button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-black transition ease-in-out cursor-pointer focus:outline-none duration-400"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d={
                  isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
                }
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"></div>
      )}

      {/* Slide-In Mobile Menu sheet */}
      <nav
        ref={menuRef}
        className={`z-50 fixed top-0 right-0 h-full w-3/4 max-w-xs bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden flex flex-col gap-3 px-8 py-6`}
      >
        <div className="flex justify-end">
          <button onClick={toggleMenu} className="text-black">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => {
              setActiveLink(link.id);
              setIsMenuOpen(false);
            }}
            className={`relative font-manrope text-black py-3 px-3 text-sm font-normal hover:text-blue-700 text-start transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full ${
              activeLink === link.id ? "bg-blue-100 rounded" : " "
            }`}
          >
            {link.label}
          </a>
        ))}

        <hr className="border-t border-gray-200" />

        {/* CTA mobile Button */}
        <Button className="w-full mt-2">Get your ticket</Button>
      </nav>
    </>
  );
};

export default Navbar;
