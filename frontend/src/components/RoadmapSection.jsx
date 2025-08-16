import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, Handshake, Truck, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    title: 'Step 1: Explore the Rates',
    description: 'Browse our transparent pricing for various scrap materials on our website.',
    icon: <DollarSign size={40} />,
  },
  {
    title: 'Step 2: Book a Pickup',
    description: 'Schedule a doorstep pickup at your convenience using our online form.',
    icon: <Calendar size={40} />,
  },
  {
    title: 'Step 3: Get a Quote',
    description: 'Our team will arrive on time, weigh your scrap, and provide an instant quote.',
    icon: <Handshake size={40} />,
  },
  {
    title: 'Step 4: Successful Collection',
    description: 'Receive instant payment and a digital receipt for your contribution.',
    icon: <Truck size={40} />,
  },
  {
    title: 'Step 5: Recycling Process',
    description: 'Your scrap is sent to certified facilities for processing and recycling.',
    icon: <CheckCircle2 size={40} />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const RoadmapSection = () => {
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
          className="text-5xl md:text-7xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          Our Simple Process
        </motion.h2>
        <motion.p
          className="mt-4 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          Selling your scrap is as easy as 1, 2, 3!
        </motion.p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center text-center relative
                       p-10 rounded-full bg-white dark:bg-[#2b2b3b] shadow-xl min-w-[340px] max-w-[340px] w-full h-[340px]
                       transition-all duration-300 transform md:hover:scale-105"
            variants={itemVariants}
          >
            <div className="absolute -top-6 bg-[#2ecc71] dark:bg-[#8dffb8] text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-md">
              {index + 1}
            </div>
            <div className="mb-4 text-[#2ecc71] dark:text-[#8dffb8]">
              {step.icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mt-4 text-[#222222] dark:text-[#f0f0f0]">{step.title}</h3>
            <p className="mt-2 text-lg text-[#666666] dark:text-[#a0a0a0]">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RoadmapSection;
