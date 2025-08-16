import React from 'react';
import { motion } from "framer-motion";
import Carousel from '../components/Carousel';
import AboutSection from '../components/AboutSection';
import ImpactSection from '../components/ImpactSection';
import PresenceSection from '../components/PresenceSection';
import RoadmapSection from '../components/RoadmapSection';
import TestimonialSection from '../components/TestimonialSection';
import GallerySection from '../components/GallerySection';
import ReachOutForm from '../components/ReachOutForm';

const Home = () => {
  return (
    <>
      <Carousel />
      
      
        
        <AboutSection />
        <PresenceSection/>
        <RoadmapSection/>
        {/* The new Impact Section is placed here */}
        <ImpactSection />
        <GallerySection/>
        <TestimonialSection/>
        <ReachOutForm/>
        
    </>
  );
};

export default Home;
