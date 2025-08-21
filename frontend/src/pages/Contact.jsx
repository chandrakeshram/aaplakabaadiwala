import React from 'react';
import { motion } from 'framer-motion';
import { Mail, PhoneCall, MapPin, Recycle, Trash2, Battery, Paperclip } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const floatingVariants = {
  animate: (i) => ({
    y: ["-10%", "10%"],
    x: ["-5%", "5%"],
    rotate: [0, 15, -15, 0],
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 8 + i * 2,
        ease: "easeInOut",
      },
      x: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 12 + i * 3,
        ease: "easeInOut",
      },
      rotate: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 15 + i * 4,
        ease: "linear",
      },
    },
  }),
};

const icons = [
  { icon: <Recycle size={64} className="text-[#2ecc71] dark:text-[#8dffb8]" />, top: "10%", left: "5%" },
  { icon: <Trash2 size={48} className="text-[#f39c12] dark:text-[#f1c40f]" />, bottom: "20%", right: "15%" },
  { icon: <Battery size={56} className="text-[#3498db] dark:text-[#2980b9]" />, top: "40%", right: "30%" },
  { icon: <Paperclip size={72} className="text-[#2ecc71] dark:text-[#8dffb8]" />, bottom: "5%", left: "40%" },
  { icon: <Recycle size={80} className="text-[#f39c12] dark:text-[#f1c40f]" />, top: "60%", left: "20%" },
  { icon: <Trash2 size={56} className="text-[#3498db] dark:text-[#2980b9]" />, top: "20%", right: "5%" },
];

export default function Contact() {
  return (
    <motion.div
      className="container mx-auto px-6 py-20 md:py-28"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center mb-12 md:mb-16">
        <motion.h1
          className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          Contact Us
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Your trusted scrap buyer and waste management company. We're here to help!
        </motion.p>
      </div>

      <div className="flex flex-col-reverse md:flex-row items-stretch md:justify-between gap-12 max-w-5xl mx-auto">
        {/* Right Side: Animated Icons */}
        <motion.div
          className="relative flex-1 flex justify-center items-center w-full min-h-[300px] md:min-h-0 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          {icons.map((item, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{ top: item.top, left: item.left, bottom: item.bottom, right: item.right }}
              variants={floatingVariants}
              animate="animate"
              custom={index}
            >
              {item.icon}
            </motion.div>
          ))}
        </motion.div>

        {/* Left Side: Contact Info */}
        <motion.div
          className="flex-1 space-y-8 text-center md:text-left p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]"
          variants={itemVariants}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-[#f39c12] dark:text-[#f1c40f]"
            variants={itemVariants}
          >
            Get in Touch
          </motion.h3>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed"
            variants={itemVariants}
          >
            We are the most reliable <b>scrap buyer</b> in Pune. Our dedicated team is always ready to assist you with your <b>recycling needs</b>.
          </motion.p>
          <motion.div className="mt-8 space-y-4" variants={itemVariants}>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <Mail size={32} className="text-[#2ecc71]" />
              <span className="text-lg font-semibold">info@aaplakaabaadiwala.com</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <PhoneCall size={32} className="text-[#2ecc71]" />
              <span className="text-lg font-semibold">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
              <MapPin size={32} className="text-[#2ecc71]" />
              <span className="text-lg font-semibold">Pune, Maharashtra, India</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
