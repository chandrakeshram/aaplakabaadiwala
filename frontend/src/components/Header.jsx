import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  Info,
  Briefcase,
  Mail,
  LogIn,
  LogOut,
  User,
  Truck,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../context/AuthContext";
import { icon } from "leaflet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  const words = ["Kabaadiwala", "Mitra", "Khaas"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 80;
  const delayBetweenWords = 1500;

  // Typing effect
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
  }, [displayedText, isDeleting, currentWordIndex, words]);

  // Scroll effect
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
    { name: "Rates", path: "/rates", icon: <Briefcase size={20} /> },
    { name: "Contact", path: "/contact", icon: <Mail size={20} /> },
    {name : "Book Pickup", path : "/bookpickup", icon: <Truck size={20}/> },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20, transition: { when: "afterChildren" } },
    visible: {
      opacity: 1,
      y: 0,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full px-4 py-4 z-50 transition-colors duration-300 bg-white dark:bg-[#1a1a2e]
        ${
          isScrolled
            ? "shadow-lg border-b border-gray-200 dark:border-[#3a3a4c]"
            : "shadow-none border-b border-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://placehold.co/40x40/000000/FFFFFF?text=Logo"
            alt="Logo"
            className="rounded-full"
          />
          <span className="font-bold text-3xl text-[#222222] dark:text-[#f0f0f0] font-poppins">
            Aapla{" "}
            <span className="text-[#f39c12] animate-pulse">{displayedText}</span>
          </span>
        </Link>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center gap-8 font-poppins">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="group text-xl relative flex items-center gap-2 text-[#666666] dark:text-[#a0a0a0] hover:text-[#2ecc71] transition-colors duration-200"
            >
              {link.icon}
              {link.name}
              <span className="absolute left-0 -bottom-1 h-[2px] bg-[#2ecc71] transition-all duration-300 w-0 group-hover:w-full"></span>
            </Link>
          ))}
          <ThemeSwitcher />

          {user ? (
            <>
              {/* ✅ Show username */}
              <span className="ml-4 flex items-center gap-2 text-lg font-semibold text-[#222222] dark:text-[#f0f0f0]">
                <User size={20} /> {user.name || user.username}
              </span>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="ml-4 px-5 py-2 rounded-full bg-gray-500 text-white font-semibold shadow-md hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  Admin
                </Link>
              )}
              <motion.button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="ml-4 px-5 py-2 rounded-full bg-[#e74c3c] dark:bg-[#c0392b] text-white font-semibold shadow-md hover:bg-[#c0392b] transition-colors flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </motion.button>
            </>
          ) : (
            <Link
              to="/login"
              className="ml-4 px-5 py-2 rounded-full bg-[#2ecc71] dark:bg-[#3498db] text-white font-semibold shadow-md hover:bg-[#27ae60] dark:hover:bg-[#2980b9] transition-colors flex items-center gap-2"
            >
              <LogIn size={18} /> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#222222] dark:text-[#f0f0f0] focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-[#1a1a2e] mt-4 rounded-lg shadow-xl font-poppins"
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
                  className="px-4 py-2 rounded-lg text-xl flex items-center gap-3 text-[#222222] dark:text-[#f0f0f0] hover:bg-[#2ecc71] hover:text-white transition-colors duration-200"
                  variants={linkVariants}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}

              {user ? (
                <>
                  {/* ✅ Show username in mobile menu */}
                  <span className="px-4 py-2 text-lg flex items-center gap-2 font-semibold text-[#222222] dark:text-[#f0f0f0]">
                    <User size={20} /> {user.name || user.username}
                  </span>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="px-4 py-2 rounded-lg text-xl bg-gray-500 text-white flex items-center gap-3 transition-colors duration-200 hover:bg-gray-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin
                    </Link>
                  )}
                  <motion.button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 mt-2 rounded-lg text-lg bg-[#e74c3c] dark:bg-[#c0392b] text-white flex items-center gap-3 transition-colors duration-200 hover:bg-[#c0392b]"
                  >
                    <LogOut size={20} /> Logout
                  </motion.button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 mt-2 rounded-lg text-lg bg-[#2ecc71] dark:bg-[#3498db] text-white flex items-center gap-3 transition-colors duration-200 hover:bg-[#27ae60] dark:hover:bg-[#2980b9]"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn size={20} /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
