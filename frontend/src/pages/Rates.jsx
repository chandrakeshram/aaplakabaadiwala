import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Rates() {
  const { user } = useAuth();
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch rates from backend
  const fetchRates = async () => {
    setLoading(true);
    setError(null);
        if (!user || !user.token) {
        setLoading(false);
        // This is a common practice to handle unauthenticated state
        // You could also set a specific error message here
        return; 
    }

    try {
      // The fetch call is updated to use a new, public URL
      const response = await fetch('/api/rates', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch rates.');
      }
      const data = await response.json();
      setRates(data.rates || []);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error fetching rates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const filteredRates = selectedCategory === 'all'
    ? rates
    : rates.filter(rate => rate.material === selectedCategory);

  return (
    <motion.div
      className="container mx-auto px-6 py-20 md:py-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]">
          Scrap Rates
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Our transparent pricing for common scrap materials.
        </p>
      </div>

      {/* Category Filter */}
      <motion.div className="flex flex-col items-center space-y-6 md:flex-row md:justify-center md:space-y-0 md:space-x-6">
        <div className="w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white dark:bg-[#2b2b3b] shadow-md transition-colors"
          >
            <option value="all">All Categories</option>
            {rates.map((rateItem) => (
              <option key={rateItem._id} value={rateItem.material}>
                {rateItem.material.charAt(0).toUpperCase() + rateItem.material.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Rates Grid */}
      <motion.div
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {loading ? (
          <div className="text-center text-gray-500 col-span-full">
            <Loader2 className="animate-spin inline" size={48} />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center col-span-full">{error}</p>
        ) : filteredRates.length > 0 ? (
          filteredRates.map((rateItem) => (
            <motion.div
              key={rateItem._id}
              className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] text-center
                         flex flex-col items-center transition-all duration-300 transform hover:scale-105"
              variants={itemVariants}
            >
              <div className="mb-4 text-[#2ecc71] dark:text-[#8dffb8]">
                <DollarSign size={48} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold capitalize">
                {rateItem.material}
              </h3>
              <p className="mt-2 text-3xl md:text-4xl font-bold text-[#f39c12] dark:text-[#f1c40f]">
                ₹ {rateItem.rate}
                <span className="text-lg text-gray-500 dark:text-gray-400">/kg</span>
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Last updated: {new Date(rateItem.lastUpdated).toLocaleDateString()}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full">No rates found for this category.</p>
        )}
      </motion.div>
    </motion.div>
  );
}
