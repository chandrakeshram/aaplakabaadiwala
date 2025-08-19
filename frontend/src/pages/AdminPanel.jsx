// frontend/components/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, Edit } from 'lucide-react';
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

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch pickups from backend
  const fetchPickups = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/pickups", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch pickups.");
      const data = await res.json();
      setPickups(data.pickups || []);
    } catch (err) {
      setError(err.message || "Error fetching pickups.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPickups();
    }
  }, [isAdmin]);

  // Update pickup status
  const handleStatusChange = async (pickupId, newStatus) => {
    try {
      const res = await fetch(`/api/pickups/${pickupId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status.");

      const data = await res.json();
      setPickups(prev =>
        prev.map(p => (p._id === pickupId ? { ...p, status: data.pickup.status } : p))
      );
    } catch (err) {
      console.error(err.message);
      alert("Error updating status.");
    }
  };

  // Delete pickup
  const handleDelete = async (pickupId) => {
    try {
      const res = await fetch(`/api/pickups/${pickupId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete pickup.");

      setPickups(prev => prev.filter(p => p._id !== pickupId));
    } catch (err) {
      console.error(err.message);
      alert("Error deleting pickup.");
    }
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
          Manage pickup requests.
        </p>
      </div>

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
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : pickups.length > 0 ? (
            pickups.map(pickup => (
              <motion.div
                key={pickup._id}
                className="p-4 rounded-lg bg-gray-100 dark:bg-[#1a1a2e] flex flex-col sm:flex-row justify-between items-center text-lg transition-all duration-200"
                whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06)" }}
              >
                <div className="flex-1 space-y-1">
                  <p className="font-semibold">{pickup.userName}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date: {pickup.date} | Time: {pickup.time}
                  </p>
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
                  <button
                    onClick={() => handleDelete(pickup._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No new pickup requests.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
