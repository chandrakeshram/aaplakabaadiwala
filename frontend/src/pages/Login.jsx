import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
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
      <div className="flex justify-center items-center">
        <motion.div
          className="max-w-md w-full p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#f39c12]">Login</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Enter your credentials to access your account.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-[#2ecc71] dark:bg-[#3498db] text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <LogIn size={24} />}
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
            <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
              New here? <Link to="/register" className="text-[#2ecc71] dark:text-[#8dffb8]">Register here</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
