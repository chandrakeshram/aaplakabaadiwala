import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// The main BookPickup component
export default function BookPickup() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', address: '', phone: '', date: '', time: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Ensure a user is logged in before submitting
    if (!user) {
      setMessage({ text: 'You must be logged in to schedule a pickup.', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      // API call to your backend to create a new pickup
      // The fetch URL is now a relative path that starts with /api
      const response = await fetch('/api/pickupRoutes/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Send the user's JWT
        },
        body: JSON.stringify({
          ...form,
          userId: user.id,
          userName: user.name,
          status: 'Pending'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to book pickup.');
      }

      setMessage({ text: 'Pickup booked successfully!', type: 'success' });
      setForm({ name: '', address: '', phone: '', date: '', time: '' });
    } catch (error) {
      console.error("Error booking pickup: ", error);
      setMessage({ text: error.message || 'Error booking pickup. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-6 py-20 md:py-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]">
          Schedule a Scrap Pickup
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Fill out the form below to book a doorstep pickup for your scrap.
        </p>
      </div>

      <div className="flex justify-center">
        <motion.div
          className="flex-1 p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
              <input type="text" id="address" name="address" value={form.address} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date</label>
                <input type="date" id="date" name="date" value={form.date} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100" />
              </div>
              <div className="flex-1">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time</label>
                <input type="time" id="time" name="time" value={form.time} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100" />
              </div>
            </div>
            {message && (
              <div className={`p-4 rounded-lg text-white font-semibold flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                {message.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                <span>{message.text}</span>
              </div>
            )}
            <motion.button type="submit" disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-[#2ecc71] dark:bg-[#3498db] text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : null}
              {loading ? 'Booking...' : 'Book Pickup'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
