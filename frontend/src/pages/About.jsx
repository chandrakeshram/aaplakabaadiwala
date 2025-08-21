import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Lightbulb, Factory, Award, Handshake, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function About() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <motion.div
      className="container mx-auto px-6 py-20 md:py-28"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center mb-12 md:mb-16">
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          About Aapla Kabaadiwala
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Your trusted partner for <b>scrap collection services</b> and <b>waste management</b> in Pune.
        </motion.p>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-24">
        {/* Left Side: Animated SVG */}
        <motion.div
          className="relative flex-1 flex justify-center items-center w-full max-w-lg md:max-w-none"
          variants={itemVariants}
        >
          <svg viewBox="0 0 200 200" className="w-full h-auto text-[#2ecc71] dark:text-[#8dffb8]">
            <motion.circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="5" strokeDasharray="5 5" animate={{ rotate: 360 }} transition={{ duration: 20, ease: "linear", repeat: Infinity }} />
            <motion.circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="3" animate={{ rotate: -360 }} transition={{ duration: 15, ease: "linear", repeat: Infinity }} />
            <motion.text x="100" y="105" textAnchor="middle" fontSize="18" fill="currentColor" fontWeight="bold">Recycle</motion.text>
          </svg>
        </motion.div>

        {/* Right Side: Mission & Vision */}
        <motion.div
          className="flex-1 space-y-8 text-center md:text-left"
          variants={containerVariants}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-[#f39c12] dark:text-[#f1c40f]"
            variants={itemVariants}
          >
            Our Mission & Vision
          </motion.h3>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
            variants={itemVariants}
          >
            We are dedicated to building a greener, cleaner Pune by providing seamless and transparent <b>scrap recycling services</b>. Our mission is to transform the way waste is managed and empower communities to embrace a sustainable, <b>circular economy</b>. We aim to be the most trusted <b>scrap buyer</b> in the region.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2ecc71] text-white font-semibold shadow-md hover:bg-[#27ae60] transition-colors"
            >
              <Award size={20} />
              See Our Impact
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-20 text-center">
        <motion.h3
          className="text-3xl md:text-4xl font-bold text-[#f39c12] dark:text-[#f1c40f]"
          variants={itemVariants}
        >
          Why Choose Us?
        </motion.h3>
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <Leaf size={64} className="text-[#2ecc71] dark:text-[#8dffb8] mb-4" />
            <h4 className="text-xl font-bold">Eco-Friendly</h4>
            <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
              We are committed to <b>eco-friendly recycling</b> practices to reduce our carbon footprint.
            </p>
          </motion.div>
          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <Recycle size={64} className="text-[#2ecc71] dark:text-[#8dffb8] mb-4" />
            <h4 className="text-xl font-bold">Transparent Pricing</h4>
            <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
              Get the <b>best rates</b> for your scrap with our transparent and fair pricing model.
            </p>
          </motion.div>
          <motion.div
            className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] flex flex-col items-center text-center"
            variants={itemVariants}
          >
            <Factory size={64} className="text-[#2ecc71] dark:text-[#8dffb8] mb-4" />
            <h4 className="text-xl font-bold">Hassle-Free Pickup</h4>
            <p className="mt-2 text-base text-gray-700 dark:text-gray-300">
              Our <b>doorstep pickup service</b> makes selling scrap easy and convenient for you.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
