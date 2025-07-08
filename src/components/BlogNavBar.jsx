import React, { useState, useRef, useEffect } from "react";

const BlogNavBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);

  // Focus input when shown
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Close search input if clicked outside or Escape pressed
  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    }
    function handleEscape(event) {
      if (event.key === "Escape") {
        setShowSearch(false);
      }
    }
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showSearch]);

  return (
    <nav className="w-full bg-[#f7f9fa] py-3 border-b border-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 relative">
        {/* Logo (styled text) */}
        <div className="text-2xl font-bold italic text-transparent bg-gradient-to-r from-blue-700 to-black bg-clip-text font-poppins">
          LLN '25
        </div>
        {/* Nav Links */}
        <ul className="flex gap-8 items-center text-base font-normal text-[#222] mx-auto">
          <li><a href="#" className="text-[#1790D0] border-b-2 border-[#1790D0] pb-1">All</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Newsletters</a></li>
          <li><a href="#">Podcasts</a></li>
          <li><a href="#">Resources</a></li>
        </ul>
        {/* Search Icon or Input */}
        <div className="flex items-center ml-4 min-w-[48px]">
          {showSearch ? (
            <input
              ref={inputRef}
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder="Search..."
              className="w-48 px-3 py-2 rounded-md border border-gray-300 shadow bg-white focus:outline-none focus:ring-2 focus:ring-[#1790D0] text-sm text-black"
              onBlur={() => setShowSearch(false)}
            />
          ) : (
            <button
              className="text-[#1790D0] text-2xl focus:outline-none"
              onClick={() => setShowSearch(true)}
              aria-label="Open search"
            >
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BlogNavBar; 