import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Award, Heart } from 'lucide-react';

const stats = [
  { value: '50,000+', label: 'Kilos of Scrap', description: 'Collected and recycled, contributing to a cleaner environment.', icon: <Recycle size={32} /> },
  { value: '2,000+', label: 'Trees Saved', description: 'By recycling paper and wood, we\'ve helped preserve our forests.', icon: <Leaf size={32} /> },
  { value: '1,500+', label: 'Happy Customers', description: 'Our community-focused approach has earned us praise and trust.', icon: <Heart size={32} /> },
  { value: '500+', label: 'Tonnes of CO2', description: 'Reduced from the atmosphere by diverting waste from landfills.', icon: <Award size={32} /> },
];

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

const ImpactSection = () => {
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
          className="text-4xl md:text-5xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          Our Contribution to a Greener Planet
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Every kilogram of scrap collected and recycled makes a tangible difference. Here's a look at the positive impact we've made together.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b] text-center
                       flex flex-col items-center justify-center h-full transition-all duration-300
                       hover:scale-105"
            variants={itemVariants}
          >
            <div className="mb-4 text-[#2ecc71] dark:text-[#8dffb8]">
              {stat.icon}
            </div>
            <h3 className="text-5xl md:text-6xl font-bold text-[#f39c12] dark:text-[#f1c40f]">
              {stat.value}
            </h3>
            <p className="mt-2 text-xl font-semibold leading-snug">
              {stat.label}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ImpactSection;
