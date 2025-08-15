// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import Router
import Header from './components/Header';
import Home from './pages/Home';
// Import other pages as needed

export default function App() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      
      {/* The main content area, which changes based on the URL */}
      <main className="pt-24 p-6 md:p-12">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add other routes here */}
        </Routes>
      </main>
    </div>
  );
}