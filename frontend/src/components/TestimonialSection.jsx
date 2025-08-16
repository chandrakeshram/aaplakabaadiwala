import React from "react";
import { motion } from "framer-motion";
import { Quote, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "Aapla Kabaadiwala made selling scrap so easy! The process was fast, and the prices were fair. It feels great to contribute to a cleaner environment without any hassle.",
    name: "Ajay Sharma",
    city: "Pune",
  },
  {
    quote:
      "The service is incredibly professional. They were on time and gave a transparent quote. Highly recommend for anyone looking to recycle their waste.",
    name: "Priya Singh",
    city: "Nagpur",
  },
  {
    quote:
      "I was impressed with the efficiency. Booking a pickup was simple, and the payment was instant. It’s a fantastic initiative for a circular economy.",
    name: "Rohan Patel",
    city: "Mumbai",
  },
  {
    quote:
      "An excellent service that truly makes a difference. The team is friendly, and the process is seamless from start to finish. A must-use for every household.",
    name: "Sneha Rao",
    city: "Nashik",
  },
];

const TestimonialCard = ({ quote, name, city }) => (
  <div className="relative p-10 rounded-2xl shadow-xl bg-white dark:bg-[#2b2b3b]">
    {/* Quote Icon (Left Middle) - only desktop */}
    <div className="hidden md:flex absolute top-1/2 -left-8 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-[#2b2b3b] shadow-md">
      <Quote className="text-[#f39c12] w-8 h-8" />
    </div>

    {/* User Icon (Right Middle) - only desktop */}
    <div className="hidden md:flex absolute top-1/2 -right-8 -translate-y-1/2 p-3 rounded-full bg-white dark:bg-[#2b2b3b] shadow-md">
      <User className="text-[#2ecc71] w-8 h-8" />
    </div>

    {/* Content */}
    <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed mb-6">
      "{quote}"
    </p>
    <div className="text-center">
      <p className="font-bold text-xl text-[#222] dark:text-[#f0f0f0]">{name}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{city}</p>
    </div>
  </div>
);

const TestimonialSection = () => {
  return (
    <motion.section
      className="w-full px-6 md:px-16 lg:px-24 py-16 md:py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-[#2ecc71] dark:text-[#8dffb8]">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          We are proud to serve our community and help create a positive impact.
        </p>
      </div>

      {/* Mobile: Swiper Carousel */}
      <div className="block md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={40} // increased spacing
          slidesPerView={1}
          loop
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <TestimonialCard {...t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid grid-cols-2 gap-20"> {/* increased spacing */}
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialSection;
