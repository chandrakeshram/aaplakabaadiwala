// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
// import About from './pages/About'; 
// import Services from './pages/Services'; 
// import Contact from './pages/Contact'; 
import AnimatedBackground from './components/AnimatedBackground';

export default function App() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      
      {/* This main container holds all your page content and the background */}
      {/* Its position is set to relative, which is a key part of the fix */}
      <main className="relative pt-24 p-6 md:p-12 min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
        
        {/* The background is placed here and will only fill the <main> tag */}
        <AnimatedBackground />

        {/* The routes and content must be placed above the background */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </main>
    </div>
  );
}