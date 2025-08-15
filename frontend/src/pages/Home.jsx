// src/pages/Home.jsx
import React from 'react';
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-4">
        Welcome to the Home Page
      </h1>
      <p className="text-xl text-center max-w-2xl mx-auto text-gray-700 dark:text-gray-300">
        This is the main content of your home page. The navbar at the top is a separate component handled in App.jsx.
      </p>

      {/* Repeating content to make the page scrollable */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="my-12 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-colors duration-300"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-3 text-green-600 dark:text-green-400">
            Section {i + 1}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default Home;