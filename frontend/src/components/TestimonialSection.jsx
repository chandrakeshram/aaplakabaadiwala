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
      className="w-full px-4 sm:px-8 lg:px-20 py-16 sm:py-20 lg:py-28"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-14 lg:mb-20">
        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#2ecc71] dark:text-[#8dffb8]"
          variants={itemVariants}
        >
          What Our Customers Say
        </motion.h2>
        <motion.p
          className="mt-3 sm:mt-5 text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
          variants={itemVariants}
        >
          We are proud to serve our community and help create a positive impact.
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 lg:gap-20"
        variants={containerVariants}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative p-6 sm:p-8 lg:p-10 pt-14 sm:pt-16 lg:pt-20 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]
                       flex flex-col max-w-2xl w-full mx-auto transition-all duration-300 transform"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            {/* Left Quote Icon */}
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 transform rounded-full p-3 sm:p-4 bg-white dark:bg-[#2b2b3b] shadow-md">
              <Quote className="text-[#f39c12] dark:text-[#f1c40f] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
            </div>
            {/* Right User Icon */}
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 transform rounded-full p-3 sm:p-4 bg-white dark:bg-[#2b2b3b] shadow-md">
              <User className="text-[#2ecc71] dark:text-[#8dffb8] w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" />
            </div>

            {/* Testimonial Text */}
            <p className="flex-1 text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              "{testimonial.quote}"
            </p>

            {/* Author */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="font-bold text-base sm:text-lg lg:text-xl text-[#222222] dark:text-[#f0f0f0]">
                {testimonial.name}
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-[#666666] dark:text-[#a0a0a0]">
                {testimonial.city}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TestimonialSection;
