import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, User, Lock, UserPlus, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(form.name, form.email, form.password);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
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
            <h1 className="text-3xl md:text-4xl font-bold text-[#f39c12]">User Registration</h1>
            <p className="mt-2 text-gray-700 dark:text-gray-300">Create a new account to schedule pickups.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a2e] text-gray-900 dark:text-gray-100"
                required
              />
            </motion.div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-[#2ecc71] dark:bg-[#3498db] text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <UserPlus size={24} />}
              {loading ? 'Registering...' : 'Register'}
            </motion.button>
            <div className="text-center mt-4 text-gray-700 dark:text-gray-300">
              Already have an account? <Link to="/login" className="text-[#2ecc71] dark:text-[#8dffb8]">Login here</Link>
            </div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
