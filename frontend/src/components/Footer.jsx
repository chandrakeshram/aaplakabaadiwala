import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, PhoneCall, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Our Impact', path: '/impact' },
      { name: 'FAQ', path: '/faq' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { name: 'Book Pickup', path: '/book-pickup' },
      { name: 'Rates', path: '/rates' },
      { name: 'Gallery', path: '/gallery' },
      { name: 'Contact', path: '/contact' },
    ],
  },
];

const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-white dark:bg-[#1a1a2e] text-gray-700 dark:text-gray-300 py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Footer Content */}
      <div className="w-full px-6 sm:px-10 lg:px-20 flex flex-col items-center">
        <div className="w-full max-w-[2000px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-20 text-center lg:text-left">
          
          {/* 1️⃣ Company Info (spans 2 columns on large) */}
          <div className="lg:col-span-2 space-y-6 flex flex-col items-center lg:items-start">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="https://placehold.co/70x70/000000/FFFFFF?text=Logo"
                alt="Logo"
                className="rounded-full"
              />
              <span className="font-bold text-3xl sm:text-4xl lg:text-5xl text-[#222222] dark:text-[#f0f0f0]">
                Aapla <span className="text-[#f39c12]">Kabaadiwala</span>
              </span>
            </Link>
            <p className="max-w-md text-lg sm:text-xl lg:text-2xl leading-relaxed">
              Making a positive impact on the environment, one kilogram of scrap at a time.
            </p>
            <div className="flex gap-5 sm:gap-6 lg:gap-8">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-[#2ecc71] dark:hover:text-[#8dffb8] transition-colors">
                <Facebook size={28} className="sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-[#2ecc71] dark:hover:text-[#8dffb8] transition-colors">
                <Twitter size={28} className="sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-[#2ecc71] dark:hover:text-[#8dffb8] transition-colors">
                <Instagram size={28} className="sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
              </a>
              <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-[#2ecc71] dark:hover:text-[#8dffb8] transition-colors">
                <Linkedin size={28} className="sm:w-8 sm:h-8 lg:w-9 lg:h-9" />
              </a>
            </div>
          </div>

          {/* 2️⃣ Company Links */}
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#2ecc71] dark:text-[#8dffb8] mb-5">
              {footerLinks[0].title}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks[0].links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-lg sm:text-xl hover:text-[#f39c12] dark:hover:text-[#f1c40f] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3️⃣ Quick Links */}
          <div>
            <h4 className="text-xl sm:text-2xl font-semibold text-[#2ecc71] dark:text-[#8dffb8] mb-5">
              {footerLinks[1].title}
            </h4>
            <ul className="space-y-3 sm:space-y-4">
              {footerLinks[1].links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-lg sm:text-xl hover:text-[#f39c12] dark:hover:text-[#f1c40f] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4️⃣ Contact Info */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-xl sm:text-2xl font-semibold text-[#2ecc71] dark:text-[#8dffb8] mb-5">
              Contact
            </h4>
            <div className="space-y-4 sm:space-y-5 text-lg sm:text-xl">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <MapPin size={24} className="text-[#f39c12]" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <Mail size={24} className="text-[#f39c12]" />
                <span>info@aaplakaabaadiwala.com</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <PhoneCall size={24} className="text-[#f39c12]" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-6 text-center text-base sm:text-lg">
          <p>&copy; {new Date().getFullYear()} Aapla Kabaadiwala. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
