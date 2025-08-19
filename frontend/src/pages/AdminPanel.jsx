import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();
  const [pickups, setPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  // Fetch pickups from backend
  const fetchPickups = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const pickupsRes = await fetch('/api/pickups', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const pickupsData = await pickupsRes.json();
      if (!pickupsRes.ok) throw new Error(pickupsData.message || 'Failed to fetch pickups.');
      setPickups(pickupsData.pickups);
      
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchPickups();
    }
  }, [isAdmin]);

  const handleStatusChange = async (pickupId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/pickups/${pickupId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status.');
      setPickups(prev => prev.map(p => (p._id === pickupId ? { ...p, status: newStatus } : p)));
      setActionFeedback(`Pickup ${pickupId} marked as ${newStatus}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (pickupId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/pickups/${pickupId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to delete pickup.');
      setPickups(prev => prev.filter(p => p._id !== pickupId));
      setActionFeedback(`Pickup ${pickupId} deleted successfully.`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500 mt-20"><Loader2 className="animate-spin inline" size={48} /> Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">Error: {error}</div>;
  }
  
  if (!user || !isAdmin) {
    return <div className="container mx-auto px-6 py-20 md:py-28 text-center text-red-500">You are not authorized to view this page. Please log in as an administrator.</div>;
  }

  const pendingPickups = pickups.filter(p => p.status === 'Pending');
  const completedPickups = pickups.filter(p => p.status === 'Completed');
  const rejectedPickups = pickups.filter(p => p.status === 'Rejected');

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
      
      {actionFeedback && (
        <div className="p-4 bg-green-500 text-white rounded-lg text-center mb-6">
          {actionFeedback}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Pickups */}
        <motion.div className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-yellow-600 flex items-center gap-2">
            Pending Pickups
          </h2>
          <div className="space-y-4">
            {pendingPickups.length > 0 ? pendingPickups.map(pickup => (
              <PickupCard key={pickup._id} pickup={pickup} onStatusChange={handleStatusChange} onDelete={handleDelete} />
            )) : <p className="text-gray-500 dark:text-gray-400">No pending requests.</p>}
          </div>
        </motion.div>
        {/* Completed Pickups */}
        <motion.div className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
            Completed Pickups
          </h2>
          <div className="space-y-4">
            {completedPickups.length > 0 ? completedPickups.map(pickup => (
              <PickupCard key={pickup._id} pickup={pickup} onStatusChange={handleStatusChange} onDelete={handleDelete} />
            )) : <p className="text-gray-500 dark:text-gray-400">No completed pickups.</p>}
          </div>
        </motion.div>
        {/* Rejected Pickups */}
        <motion.div className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]" variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
            Rejected Pickups
          </h2>
          <div className="space-y-4">
            {rejectedPickups.length > 0 ? rejectedPickups.map(pickup => (
              <PickupCard key={pickup._id} pickup={pickup} onStatusChange={handleStatusChange} onDelete={handleDelete} />
            )) : <p className="text-gray-500 dark:text-gray-400">No rejected pickups.</p>}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// A reusable component for a pickup card
const PickupCard = ({ pickup, onStatusChange, onDelete }) => (
  <motion.div
    className="p-4 rounded-lg bg-gray-100 dark:bg-[#1a1a2e] flex flex-col sm:flex-row justify-between items-center text-lg transition-all duration-200"
    whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.06)" }}
  >
    <div className="flex-1 space-y-1 text-left">
      <p className="font-semibold">{pickup.userName}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Date: {pickup.date} | Time: {pickup.time}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Address: {pickup.address}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">Phone: {pickup.phone}</p>
    </div>
    <div className="flex items-center gap-2 mt-2 sm:mt-0">
      <select
        value={pickup.status}
        onChange={(e) => onStatusChange(pickup._id, e.target.value)}
        className="px-2 py-1 rounded bg-white dark:bg-[#2a2a3e] border border-gray-300 dark:border-gray-600"
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button onClick={() => onDelete(pickup._id)} className="text-red-500 hover:text-red-700 transition-colors">
        <Trash2 size={20} />
      </button>
    </div>
  </motion.div>
);
