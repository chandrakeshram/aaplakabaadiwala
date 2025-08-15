// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { Menu, X, Home, Info, Briefcase, Mail } from "lucide-react";
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // State for the typewriter effect
  const words = ['Kabaadiwala', 'Mitra', 'Khaas'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 80;
  const delayBetweenWords = 1500;

  useEffect(() => {
    const word = words[currentWordIndex];
    let timer;
    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(word.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (displayedText.length < word.length) {
        timer = setTimeout(() => {
          setDisplayedText(word.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetweenWords);
      }
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentWordIndex]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "About", path: "/about", icon: <Info size={20} /> },
    { name: "Services", path: "/services", icon: <Briefcase size={20} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={20} /> },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.1 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      // The background color is now solid, not translucent
      className={`fixed top-0 left-0 w-full px-4 py-4 z-50 transition-colors duration-300 bg-white dark:bg-gray-950
        ${isScrolled
          ? 'shadow-lg border-b border-gray-200 dark:border-gray-700'
          : 'shadow-none border-b border-transparent'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://placehold.co/40x40/000000/FFFFFF?text=Logo"
            alt="Logo"
            className="rounded-full"
          />
          <span className="font-bold text-2xl text-gray-800 dark:text-white font-poppins">
            Aapla <span className="text-yellow-500 animate-pulse">{displayedText}</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-poppins">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="group text-lg relative flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            >
              {link.icon}
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[2px] bg-green-600 dark:bg-green-400 transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
          ))}
          <ThemeSwitcher />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 dark:text-gray-200 focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-950 mt-4 rounded-lg shadow-xl font-poppins"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="flex flex-col p-4 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="px-4 py-2 rounded-lg text-lg flex items-center gap-3 text-gray-800 dark:text-gray-100 hover:bg-green-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  variants={linkVariants}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;