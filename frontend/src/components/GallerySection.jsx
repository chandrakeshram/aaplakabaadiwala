import React from 'react';
import { motion } from 'framer-motion';

const galleryImages = [
  { src: "./assets/images/gal1.png", alt: "Scrap collection in progress" },
  { src: "./assets/images/gal2.png", alt: "Recycling facility" },
  { src: "./assets/images/gal3.png", alt: "Happy customer handing over scrap" },
  { src: "./assets/images/gal4.png", alt: "Aapla Kabaadiwala team members" },
  { src: "./assets/images/gal5.png", alt: "Eco-friendly recycling" },
  { src: "./assets/images/gal6.png", alt: "Scrap sorting and processing" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const GallerySection = () => {
  return (
    <motion.section
      className="container mx-auto px-6 py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          Our Gallery
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          A glimpse into our world of waste management and recycling.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            className="relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105"
            variants={itemVariants}
          >
            <img src={image.src} alt={image.alt} className="w-full h-auto object-cover" />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default GallerySection;
