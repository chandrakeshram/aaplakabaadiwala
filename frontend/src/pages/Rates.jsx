import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  DollarSign,
  Trash2,
  PlusCircle,
  Save,
  MapPin,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
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

export default function Rates() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Multiple filters
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");

  const [newRate, setNewRate] = useState({
    material: "",
    rate: "",
    district: "",
  });

  const API_URL = `${API_BASE_URL}/api/rates`;

  // Fetch rates
  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) throw new Error("Failed to fetch rates");
      const data = await res.json();
      setRates(data.rates || []);
    } catch (err) {
      setError(err.message || "Error fetching rates");
    } finally {
      setLoading(false);
    }
  };

  // Create new rate
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          material: newRate.material,
          rate: Number(newRate.rate),
          district: newRate.district,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create rate");
      }

      setNewRate({ material: "", rate: "", district: "" });
      fetchRates();
    } catch (err) {
      alert(err.message);
    }
  };

  // Update rate
  const handleUpdate = async (id, updatedRate) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedRate),
      });
      if (!res.ok) throw new Error("Failed to update rate");
      fetchRates();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete rate
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this rate?")) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete rate");
      fetchRates();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  // 🔹 Filtering logic (district + material)
  const filteredRates = rates.filter((r) => {
    const districtMatch =
      selectedDistrict === "all" || r.district === selectedDistrict;
    const materialMatch =
      selectedMaterial === "all" || r.material === selectedMaterial;
    return districtMatch && materialMatch;
  });

  // 🔹 Unique dropdown values
  const uniqueDistricts = [...new Set(rates.map((r) => r.district))];
  const uniqueMaterials = [...new Set(rates.map((r) => r.material))];

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
          Scrap Rates by District
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Find transparent pricing for materials in your district.
        </p>
      </div>

      {/* 🔹 Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {/* District Filter */}
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="px-6 py-3 rounded-lg bg-white dark:bg-[#2b2b3b] shadow-md"
        >
          <option value="all">All Districts</option>
          {uniqueDistricts.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Material Filter */}
        <select
          value={selectedMaterial}
          onChange={(e) => setSelectedMaterial(e.target.value)}
          className="px-6 py-3 rounded-lg bg-white dark:bg-[#2b2b3b] shadow-md"
        >
          <option value="all">All Materials</option>
          {uniqueMaterials.map((m, i) => (
            <option key={i} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Rates Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {loading ? (
          <Loader2 className="animate-spin mx-auto" size={48} />
        ) : error ? (
          <p className="text-red-500 text-center col-span-full">{error}</p>
        ) : filteredRates.length > 0 ? (
          filteredRates.map((rate) => (
            <motion.div
              key={rate._id}
              className="p-6 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] text-center flex flex-col items-center"
              variants={itemVariants}
            >
              <DollarSign size={40} className="mb-2 text-[#2ecc71]" />
              <h3 className="text-xl font-bold">{rate.material}</h3>
              <p className="text-2xl font-bold text-[#f39c12]">
                ₹ {rate.rate} <span className="text-sm">/kg</span>
              </p>
              <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                <MapPin size={14} /> {rate.district}
              </p>
              <p className="text-xs text-gray-500">
                Updated:{" "}
                {rate.lastUpdated
                  ? new Date(rate.lastUpdated).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* Admin controls */}
              {user?.role?.toLowerCase() === "admin" && (
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={() =>
                      handleUpdate(rate._id, {
                        ...rate,
                        rate: Number(rate.rate) + 1,
                      })
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded flex items-center"
                  >
                    <Save size={16} /> Update
                  </button>
                  <button
                    onClick={() => handleDelete(rate._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded flex items-center"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-gray-500">No rates found.</p>
        )}
      </motion.div>

      {/* Admin Create Form */}
      {user?.role?.toLowerCase() === "admin" && (
        <div className="mt-12 p-6 border rounded-lg bg-gray-50 dark:bg-[#2b2b3b]">
          <h2 className="text-2xl font-bold mb-4">Add New Rate</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <input
              type="text"
              placeholder="Material"
              value={newRate.material}
              onChange={(e) =>
                setNewRate({ ...newRate, material: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Rate"
              value={newRate.rate}
              onChange={(e) => setNewRate({ ...newRate, rate: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="District"
              value={newRate.district}
              onChange={(e) =>
                setNewRate({ ...newRate, district: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded flex items-center"
            >
              <PlusCircle size={18} /> Add Rate
            </button>
          </form>
        </div>
      )}
    </motion.div>
  );
}
