import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { Leaf, Recycle, Lightbulb, Factory } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

const iconVariants = {
  rotate: {
    rotate: 360,
    transition: { duration: 20, ease: "linear", repeat: Infinity },
  },
  pulse: {
    scale: [1, 1.08, 1],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity },
  }
};

export default function AboutSection() {
  return (
    <motion.section
      className="container mx-auto px-4 py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row justify-center items-center gap-20 md:gap-48 w-full">
        
        {/* Left Side: Animated Icon */}
        <motion.div
          className="relative flex-1 flex justify-center items-center"
          variants={itemVariants}
        >
          <div
            className="relative w-full md:w-[38rem] md:h-[38rem] flex items-center justify-center
                       bg-transparent rounded-3xl aspect-square"
          >
            {/* Center Rotating Recycle Icon */}
            <motion.div
              className="absolute z-0 w-2/3 h-2/3 flex items-center justify-center"
              variants={iconVariants}
              animate={["rotate", "pulse"]}
            >
              <Recycle size={200} className="text-[#2ecc71] dark:text-[#27ae60] md:size-[280px]" />
            </motion.div>

            {/* Surrounding Icons */}
            <div className="relative z-10 grid grid-cols-2 gap-x-20 gap-y-20 md:gap-x-40 md:gap-y-40">
              <motion.div variants={itemVariants} className="text-center">
                <Leaf size={72} className="mx-auto mb-2 text-[#2ecc71] dark:text-[#27ae60] md:size-[120px]" />
                <p className="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  Eco-Friendly
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <Lightbulb size={72} className="mx-auto mb-2 text-[#2ecc71] dark:text-[#27ae60] md:size-[120px]" />
                <p className="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  Innovation
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <Factory size={72} className="mx-auto mb-2 text-[#2ecc71] dark:text-[#27ae60] md:size-[120px]" />
                <p className="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  Industrial
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-center">
                <Recycle size={72} className="mx-auto mb-2 text-[#2ecc71] dark:text-[#27ae60] md:size-[120px]" />
                <p className="text-xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                  Recycling
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Text Content */}
        <motion.div
          className="flex-1 max-w-[600px] space-y-8 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-[#2ecc71] dark:text-[#8dffb8]"
            variants={itemVariants}
          >
            Our Eco-System Towards
          </motion.h3>

          <motion.h2
            className="text-5xl md:text-7xl font-bold leading-tight"
            variants={itemVariants}
          >
            Sustainability & <br /> Circular Economy
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 leading-relaxed"
            variants={itemVariants}
          >
            Aapla Kabaadiwala, with its deep understanding of waste, has developed
            sustainable strategies and techniques to manage waste efficiently & cost-effectively,
            contributing to a circular economy while infusing sustainability into lives.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 
                            bg-[#f39c12] text-white rounded-xl shadow-lg 
                            hover:bg-[#e67e22] transition-colors font-bold text-lg md:text-xl"
            >
              Learn More
              <motion.span whileHover={{ x: 5 }}>&rarr;</motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
