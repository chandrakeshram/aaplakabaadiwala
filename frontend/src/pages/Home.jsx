import React from 'react';
import { motion } from "framer-motion";
import Carousel from '../components/Carousel';
import AboutSection from '../components/AboutSection';
import ImpactSection from '../components/ImpactSection';
import PresenceSection from '../components/PresenceSection';
import RoadmapSection from '../components/RoadmapSection';
import TestimonialSection from '../components/TestimonialSection';
import GallerySection from '../components/GallerySection';

const Home = () => {
  return (
    <>
      <Carousel />
      
      {/* This container has the padding and full width for the rest of the content */}
      <div className="px-6 w-full md:px-0 py-8">
        
        <AboutSection />
        <PresenceSection/>
        <RoadmapSection/>
        {/* The new Impact Section is placed here */}
        <ImpactSection />
        <GallerySection/>
        <TestimonialSection/>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="my-12 p-8 rounded-2xl shadow-xl transition-colors duration-300 bg-white dark:bg-[#2b2b3b]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          >
            <h2 className="text-4xl font-bold mb-3 text-[#2ecc71] dark:text-[#8dffb8]">
              Section {i + 1}
            </h2>
            <p className="text-xl text-[#444444] dark:text-[#a0a0a0] leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default Home;
