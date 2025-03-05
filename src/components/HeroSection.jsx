import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
      <section className="relative h-screen flex flex-col items-center justify-center text-white text-center bg-cover bg-center" style={{ backgroundImage: "url('LinkedIn-Local-NIgeria\public\images\hero.jpeg')" }}>
        <motion.h1 initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-4xl md:text-6xl font-bold">
          Welcome to <span className="text-blue-500">LinkedIn</span> Local Nigeria 2025
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="mt-4 text-lg md:text-2xl">
          Evolving Beyond The Narrative
        </motion.p>
      </section>
    );
  };