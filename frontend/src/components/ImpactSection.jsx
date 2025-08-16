import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Recycle, Award, Heart } from 'lucide-react';

const stats = [
  { target: 50000, label: 'Kilos of Scrap', description: 'Collected and recycled, contributing to a cleaner environment.', icon: <Recycle size={48} /> },
  { target: 2000, label: 'Trees Saved', description: 'By recycling paper and wood, we\'ve helped preserve our forests.', icon: <Leaf size={48} /> },
  { target: 1500, label: 'Happy Customers', description: 'Our community-focused approach has earned us praise and trust.', icon: <Heart size={48} /> },
  { target: 500, label: 'Tonnes of CO2', description: 'Reduced from the atmosphere by diverting waste from landfills.', icon: <Award size={48} /> },
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

const AnimatedNumber = ({ target, duration = 2000 }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCurrentValue(start);
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <h3 ref={ref} className="text-6xl md:text-7xl font-extrabold text-[#f39c12] dark:text-[#f1c40f]">
      {currentValue.toLocaleString()}+
    </h3>
  );
};

const ImpactSection = () => {
  return (
    <motion.section
      className="container mx-auto px-6 py-24 md:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="text-center mb-16 md:mb-20">
        <motion.h2
          className="text-5xl md:text-6xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          Our Contribution to a Greener Planet
        </motion.h2>
        <motion.p
          className="mt-6 text-2xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Every kilogram of scrap collected and recycled makes a tangible difference.  
          Here's a look at the positive impact we've made together.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-10 rounded-3xl shadow-2xl bg-white dark:bg-[#2b2b3b] text-center
                       flex flex-col items-center justify-center h-full transition-all duration-300
                       hover:scale-105"
            variants={itemVariants}
          >
            <div className="mb-6 text-[#2ecc71] dark:text-[#8dffb8]">
              {stat.icon}
            </div>
            <AnimatedNumber target={stat.target} />
            <p className="mt-4 text-2xl md:text-3xl font-bold leading-snug">
              {stat.label}
            </p>
            <p className="mt-3 text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ImpactSection;
