import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle, Trash2 } from "lucide-react";
const pickupurl = "http://localhost:5001/api/pickupRoutes";
export default function BookPickup() {
  const [form, setForm] = useState({ name: "", address: "", phone: "", date: "", time: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [pickups, setPickups] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  const fetchPickups = async () => {
    try {
      const response = await fetch(pickupurl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch pickups.");
      }
      const data = await response.json();
      setPickups(data.pickups || []);
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || "Error fetching pickups.", type: "error" });
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchPickups();
    const interval = setInterval(fetchPickups, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch(pickupurl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, createdAt: new Date().toISOString(), status: "Pending" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to book pickup.");
      }

      setMessage({ text: "Pickup booked successfully!", type: "success" });
      setForm({ name: "", address: "", phone: "", date: "", time: "" });
      fetchPickups();
    } catch (error) {
      console.error(error);
      setMessage({ text: error.message || "Error booking pickup. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 md:px-12 py-16 md:py-28"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#2ecc71] dark:text-[#8dffb8]">
          Schedule a Scrap Pickup
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          Fill out the form below to book a doorstep pickup for your scrap.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Form */}
        <motion.div
          className="flex-1 p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100 text-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8] transition-all"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100 text-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8] transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100 text-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8] transition-all"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100 text-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8] transition-all"
                />
              </div>
              <div>
                <label className="block mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100 text-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8] transition-all"
                />
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`p-4 rounded-lg flex items-center gap-2 text-white font-semibold ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {message.type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                <span>{message.text}</span>
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-[#2ecc71] dark:bg-[#3498db] text-white font-semibold flex items-center justify-center gap-2 text-lg disabled:opacity-50 transition-all hover:scale-105"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : null}
              {loading ? "Booking..." : "Book Pickup"}
            </motion.button>
          </form>
        </motion.div>

        {/* Past Pickups */}
        <motion.div
          className="flex-1 p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-[#2ecc71] dark:text-[#8dffb8]">
            Your Recent Pickups
          </h2>
          <div className="space-y-4">
            {fetchLoading ? (
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Loader2 className="animate-spin" size={20} /> Loading pickups...
              </div>
            ) : pickups.length > 0 ? (
              pickups.map((pickup) => (
                <motion.div
                  key={pickup._id || pickup.id}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-[#1a1a2e] flex flex-col sm:flex-row justify-between items-center text-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex-1">
                    <p className="font-semibold">
                      {pickup.date} at {pickup.time}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Status:{" "}
                      <span
                        className={
                          pickup.status === "Pending"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      >
                        {pickup.status}
                      </span>
                    </p>
                  </div>
                  <button className="mt-2 sm:mt-0 text-red-500 hover:text-red-700 transition-colors">
                    <Trash2 size={24} />
                  </button>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No pickups booked yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
