import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-bold">LLN '25</div>
      <ul className="hidden md:flex space-x-6">
        <li><Link to="/about" className="hover:text-blue-500">About us</Link></li>
        <li><Link to="/speakers" className="hover:text-blue-500">Speakers</Link></li>
        <li><Link to="/teams" className="hover:text-blue-500">Teams</Link></li>
        <li><Link to="/faqs" className="hover:text-blue-500">FAQs</Link></li>
      </ul>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Get Tickets</button>
    </nav>
  );
};