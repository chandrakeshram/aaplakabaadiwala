import React from 'react';
import { motion } from 'framer-motion';
import { Mail, PhoneCall } from 'lucide-react'; // Added Mail and PhoneCall icons

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const ReachOutForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <motion.section
      className="container mx-auto px-6 py-20 md:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="text-center mb-12 md:mb-16">
        <motion.h2
          className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          Reach Out to Us
        </motion.h2>
        <motion.p
          className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Have a question, feedback, or want to schedule a pickup? We're here to help!
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-16 max-w-6xl mx-auto items-stretch">
        {/* Left Side: Contact Info (Classic Look) */}
        <motion.div
          className="flex-1 flex flex-col items-center md:items-start text-center md:text-left p-12 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-4xl md:text-5xl font-bold text-[#f39c12]">Get in Touch</h3>
          </motion.div>
          <motion.p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-md" variants={itemVariants}>
            We would love to hear from you. Feel free to contact us with any inquiries.
          </motion.p>
          <motion.div className="mt-8 space-y-4" variants={itemVariants}>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <Mail size={32} className="text-[#2ecc71]" />
              <span className="text-lg">info@aaplakaabaadiwala.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <PhoneCall size={32} className="text-[#2ecc71]" />
              <span className="text-lg">+91 98765 43210</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: The Form Itself */}
        <motion.div
          className="flex-1 p-12 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8]
                           bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8]
                           bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="phone" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8]
                           bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm
                           focus:outline-none focus:ring-2 focus:ring-[#2ecc71] dark:focus:ring-[#8dffb8]
                           bg-gray-50 dark:bg-[#1a1a2e] text-lg text-gray-900 dark:text-gray-100"
                required
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              className="w-full px-6 py-3 rounded-lg bg-[#2ecc71] dark:bg-[#3498db] text-white
                         font-semibold shadow-md text-lg hover:bg-[#27ae60] dark:hover:bg-[#2980b9] transition-colors"
              variants={itemVariants}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ReachOutForm;
