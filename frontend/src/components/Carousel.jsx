import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { Link } from 'react-router-dom';

const slides = [
  {
    type: "image",
    src: "./assets/images/Slide1.png",
    title: "Turn Scrap Into Cash",
    message: "Doorstep pickup & instant payment at best market rates.",
  },
  {
    type: "image",
    src: "./assets/images/Slide2.png",
    title: "Watch Our Process",
    message: "Our seamless scrap collection process in action.",
  },
  {
    type: "image",
    src: "./assets/images/Slide3.png",
    title: "Aapla Kabaadiwala",
    message: "The most elegant way to recycle your scrap.",
  },
];

// Variants for smooth cross-fade animation
const fadeVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 1.5, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 1.5, ease: "easeOut" },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  // Auto-play effect
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // longer interval for readability
    return () => clearInterval(timer);
  }, [current]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          variants={fadeVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {slides[current].type === "image" ? (
            <img
              src={slides[current].src}
              alt={slides[current].title}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              src={slides[current].src}
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            />
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

          {/* Text Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              variants={textVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white drop-shadow-xl"
              style={{ textShadow: "0 0 5px #000, 0 0 15px #000" }}
            >
              {slides[current].title}
            </motion.h2>

            <motion.p
              variants={textVariants}
              className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-200 max-w-4xl"
            >
              {slides[current].message}
            </motion.p>

            <motion.div variants={textVariants}>
              <Link
                to="/book-pickup"
                className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-lg md:text-xl rounded-lg shadow-lg hover:bg-green-700 transition"
              >
                <Truck size={24} />
                <span>Book a Pickup</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full text-white hover:bg-white/50 transition z-20 backdrop-blur-sm"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 p-3 rounded-full text-white hover:bg-white/50 transition z-20 backdrop-blur-sm"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
