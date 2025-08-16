import React from 'react';
import { motion } from 'framer-motion';
import { Quote, User } from 'lucide-react';

const testimonials = [
  {
    quote: "Aapla Kabaadiwala made selling scrap so easy! The process was fast, and the prices were fair. It feels great to contribute to a cleaner environment without any hassle.",
    name: "Ajay Sharma",
    city: "Pune",
  },
  {
    quote: "The service is incredibly professional. They were on time and gave a transparent quote. Highly recommend for anyone looking to recycle their waste.",
    name: "Priya Singh",
    city: "Nagpur",
  },
  {
    quote: "I was impressed with the efficiency. Booking a pickup was simple, and the payment was instant. It’s a fantastic initiative for a circular economy.",
    name: "Rohan Patel",
    city: "Mumbai",
  },
  {
    quote: "An excellent service that truly makes a difference. The team is friendly, and the process is seamless from start to finish. A must-use for every household.",
    name: "Sneha Rao",
    city: "Nashik",
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
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const TestimonialSection = () => {
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
          What Our Customers Say
        </motion.h2>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          We are proud to serve our community and help create a positive impact.
        </motion.p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24" // Increased gap on desktop
        variants={containerVariants}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative p-10 pt-16 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]
                       flex flex-col max-w-3xl w-full transition-all duration-300 transform"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 transform rounded-full p-4 bg-white dark:bg-[#2b2b3b] shadow-md">
              <Quote size={48} className="text-[#f39c12] dark:text-[#f1c40f]" />
            </div>
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transform rounded-full p-4 bg-white dark:bg-[#2b2b3b] shadow-md">
              <User size={48} className="text-[#2ecc71] dark:text-[#8dffb8]" />
            </div>
            <p className="flex-1 text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "{testimonial.quote}"
            </p>
            <div className="mt-6 text-center">
              <p className="font-bold text-lg text-[#222222] dark:text-[#f0f0f0]">{testimonial.name}</p>
              <p className="text-sm text-[#666666] dark:text-[#a0a0a0]">{testimonial.city}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TestimonialSection;
