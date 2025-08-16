import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// A component to handle map movement
function MapUpdater({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom, {
    animate: true,
    duration: 1.0,
  });
  return null;
}

const cities = [
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567 },
  { name: 'Nagpur', lat: 21.1458, lng: 79.0882 },
  { name: 'Nashik', lat: 19.9975, lng: 73.7898 },
  { name: 'Aurangabad', lat: 19.8762, lng: 75.3433 },
  { name: 'Solapur', lat: 17.6599, lng: 75.9064 },
  { name: 'Kolhapur', lat: 16.7050, lng: 74.2433 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

// Custom icon for map markers
const createCustomIcon = (isDarkMode) => {
  const color = isDarkMode ? '#f1c40f' : '#f39c12';
  return L.divIcon({
    html: `<div style="color: ${color}">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-map-pin">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>`,
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });
};

const PresenceSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mapCenter, setMapCenter] = useState([19.6633, 75.3003]);
  const [mapZoom, setMapZoom] = useState(6);
  const [activeCity, setActiveCity] = useState(null);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const handleCityClick = (city) => {
    setMapCenter([city.lat, city.lng]);
    setMapZoom(11);
    setActiveCity(city.name);
  };

  const handleResetMap = () => {
    setMapCenter([19.6633, 75.3003]);
    setMapZoom(6);
    setActiveCity(null);
  };

  const customIcon = createCustomIcon(isDarkMode);

  return (
    <motion.section
      className="container mx-auto px-4 md:px-6 py-16 md:py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
        
        {/* Map (responsive) */}
        <motion.div
          className="w-full md:w-[65%] rounded-3xl overflow-hidden shadow-xl z-20 h-[400px] md:h-[500px]" // Increased fixed height
          variants={itemVariants}
        >
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater center={mapCenter} zoom={mapZoom} />
            {cities.map((city, index) => (
              <Marker key={index} position={[city.lat, city.lng]} icon={customIcon} />
            ))}
          </MapContainer>
        </motion.div>

        {/* Content */}
        <motion.div
          className="w-full md:w-[35%] space-y-6 text-center md:text-left"
          variants={itemVariants}
        >
          <motion.h2
            className="font-bold leading-tight text-4xl md:text-6xl text-[#2ecc71]"
            variants={itemVariants}
          >
            Our Presence in Maharashtra
          </motion.h2>

          <motion.p
            className="leading-relaxed text-lg md:text-2xl text-gray-700 dark:text-gray-300"
            variants={itemVariants}
          >
            Aapla Kabaadiwala has established its services in major cities across Maharashtra
            and is continuously expanding its reach to help more people contribute to a greener state.
          </motion.p>

          {/* Uniform Buttons */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6"
            variants={containerVariants}
          >
            {cities.map((city, index) => (
              <motion.button
                key={index}
                onClick={() => handleCityClick(city)}
                className={`w-full min-w-[120px] px-6 py-3 rounded-full border border-[#2ecc71] font-semibold transition-colors text-center
                  ${activeCity === city.name
                    ? 'bg-[#2ecc71] text-white'
                    : 'text-[#2ecc71] hover:bg-[#2ecc71] hover:text-white'
                  }`}
                variants={itemVariants}
              >
                {city.name}
              </motion.button>
            ))}
          </motion.div>

          <motion.button
            onClick={handleResetMap}
            className="mt-6 w-full px-6 py-3 rounded-full border border-gray-400 dark:border-gray-600
                         text-gray-600 dark:text-gray-400 font-semibold
                         hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            variants={itemVariants}
          >
            Reset Map
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PresenceSection;
