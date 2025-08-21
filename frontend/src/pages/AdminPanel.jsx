import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Trash2, Undo2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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
  const [deletedPickups, setDeletedPickups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionFeedback, setActionFeedback] = useState(null);

  // Fetch pickups
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found.');

      const pickupsRes = await fetch(`${API_BASE_URL}/api/pickups`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const pickupsData = await pickupsRes.json();
      if (!pickupsRes.ok) throw new Error(pickupsData.message || 'Failed to fetch pickups.');
      setPickups(pickupsData.pickups || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  // ✅ Status change handler
  const handleStatusChange = async (pickupId, newStatus) => {
    const selectedPickup = pickups.find(p => p._id === pickupId);
    if (!selectedPickup) return;

    if (newStatus === "Deleted") {
      // Move to deleted
      setDeletedPickups(prev => [...prev, { ...selectedPickup, status: "Deleted" }]);
      setPickups(prev => prev.filter(p => p._id !== pickupId));
      setActionFeedback(`Pickup of ${selectedPickup.userName} moved to Deleted.`);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/pickups/${pickupId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status.');

      const updatedPickups = pickups.map(p =>
        p._id === pickupId ? { ...p, status: newStatus } : p
      );
      setPickups(updatedPickups);
      setActionFeedback(`Pickup of ${selectedPickup.userName} marked as ${newStatus}.`);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Empty all deleted pickups
  const handleEmptyDeleted = () => {
    setDeletedPickups([]);
    setActionFeedback("🗑️ Deleted pickups cleared.");
  };

  // 🔄 Undo delete (restore to Pending)
  const handleUndoDelete = (pickup) => {
    setDeletedPickups(prev => prev.filter(p => p._id !== pickup._id));
    setPickups(prev => [...prev, { ...pickup, status: "Pending" }]);
    setActionFeedback(`Pickup of ${pickup.userName} restored to Pending.`);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-6">
          <PickupSection title="Pending Pickups" color="text-yellow-600" items={pendingPickups} onStatusChange={handleStatusChange} showControls />
          <PickupSection title="Completed Pickups" color="text-green-600" items={completedPickups} onStatusChange={handleStatusChange} showControls />
          <PickupSection title="Rejected Pickups" color="text-red-600" items={rejectedPickups} onStatusChange={handleStatusChange} showControls />
          <PickupSection title="Deleted Pickups" color="text-gray-600" items={deletedPickups} showControls={false} onUndo={handleUndoDelete} />
        </div>
      </div>

      {deletedPickups.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleEmptyDeleted}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 mx-auto"
          >
            <Trash2 size={20} /> Empty Deleted Pickups
          </button>
        </div>
      )}
    </motion.div>
  );
}

const PickupSection = ({ title, color, items, onStatusChange, onUndo, showControls = true }) => (
  <motion.div className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]" variants={itemVariants}>
    <h2 className={`text-2xl font-bold mb-6 ${color} flex items-center gap-2`}>
      {title}
    </h2>
    <div className="space-y-4">
      {items.length > 0 ? items.map(pickup => (
        <PickupCard
          key={pickup._id}
          pickup={pickup}
          onStatusChange={onStatusChange}
          onUndo={onUndo}
          showControls={showControls}
          isDeleted={title === "Deleted Pickups"}
        />
      )) : <p className="text-gray-500 dark:text-gray-400">No {title.toLowerCase()}.</p>}
    </div>
  </motion.div>
);

const PickupCard = ({ pickup, onStatusChange, onUndo, showControls, isDeleted }) => (
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
      {showControls && (
        <select
          value={pickup.status}
          onChange={(e) => onStatusChange(pickup._id, e.target.value)}
          className="px-2 py-1 rounded bg-white dark:bg-[#2a2a3e] border border-gray-300 dark:border-gray-600"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Rejected">Rejected</option>
          <option value="Deleted">Deleted</option>
        </select>
      )}
      {isDeleted && (
        <button
          onClick={() => onUndo(pickup)}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-1"
        >
          <Undo2 size={16} /> Undo
        </button>
      )}
    </div>
  </motion.div>
);
