import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Mock data and API functions for demonstration
const mockRates = {
  paper: 15,
  plastic: 20,
  metal: 50,
};

const mockPickups = [
  { _id: 'p1', userName: 'Ajay Sharma', address: '123 Pune Road', phone: '9876543210', date: '2025-08-20', time: '10:00', status: 'Pending' },
  { _id: 'p2', userName: 'Priya Singh', address: '456 Nagpur Street', phone: '9876543211', date: '2025-08-18', time: '14:30', status: 'Completed' },
];

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

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const [rates, setRates] = useState(mockRates);
  const [pickups, setPickups] = useState(mockPickups);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch rates and pickups from the backend (to be replaced with real API calls)
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, these would be fetch() calls to your backend:
      // const ratesRes = await fetch('/api/admin/rates', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      // const pickupsRes = await fetch('/api/pickupRoutes', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
      
      // Simulating API responses
      const ratesData = { rates: mockRates };
      const pickupsData = { pickups: mockPickups };
      
      setRates(ratesData.rates);
      setPickups(pickupsData.pickups);
    } catch (err) {
      setError(err.message || 'Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const handleRateChange = (material, value) => {
    setRates(prev => ({ ...prev, [material]: parseFloat(value) || 0 }));
    // Here you would add a fetch() call to a backend endpoint to save the rate
    console.log(`Updated rate for ${material} to ${value}`);
  };

  const handleStatusChange = (pickupId, newStatus) => {
    setPickups(prev => prev.map(p => (p._id === pickupId ? { ...p, status: newStatus } : p)));
    // Here you would add a fetch() call to a backend endpoint to update the status
    console.log(`Updated status for pickup ${pickupId} to ${newStatus}`);
  };

  const handleDelete = (pickupId) => {
    setPickups(prev => prev.filter(p => p._id !== pickupId));
    // Here you would add a fetch() call to a backend endpoint to delete the pickup
    console.log(`Deleted pickup ${pickupId}`);
  };

  if (!user || !isAdmin) {
    return (
      <div className="container mx-auto px-6 py-20 md:py-28 text-center text-red-500">
        You are not authorized to view this page. Please log in as an administrator.
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-6 py-20 md:py-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]">
          Admin Dashboard
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Manage pickup requests and update scrap rates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Update Rates Section */}
        <motion.div
          className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#2ecc71] dark:text-[#8dffb8] flex items-center gap-2">
            <Edit size={24} /> Update Rates (per KG)
          </h2>
          <div className="space-y-4">
            {Object.entries(rates).map(([material, rate]) => (
              <div key={material} className="flex items-center gap-4">
                <label className="flex-1 text-lg capitalize font-medium">{material}:</label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => handleRateChange(material, e.target.value)}
                  className="w-24 px-3 py-2 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pickup Management Section */}
        <motion.div
          className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-6 text-[#2ecc71] dark:text-[#8dffb8] flex items-center gap-2">
            <Edit size={24} /> Manage Pickups
          </h2>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center text-gray-500 mt-20 flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Loading pickups...
              </div>
            ) : pickups.length > 0 ? (
              pickups.map(pickup => (
                <motion.div
                  key={pickup._id}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-[#1a1a2e] flex flex-col sm:flex-row justify-between items-center text-lg transition-all duration-200"
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06)" }}
                >
                  <div className="flex-1 space-y-1">
                    <p className="font-semibold">{pickup.userName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Date: {pickup.date} | Time: {pickup.time}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Address: {pickup.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone: {pickup.phone}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <select
                      value={pickup.status}
                      onChange={(e) => handleStatusChange(pickup._id, e.target.value)}
                      className="px-2 py-1 rounded bg-white dark:bg-[#2a2a3e] border border-gray-300 dark:border-gray-600"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <button onClick={() => handleDelete(pickup._id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">No new pickup requests.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
