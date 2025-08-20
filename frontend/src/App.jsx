import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
// import About from './pages/About'; 
import Rates from './pages/Rates'; 
// import Contact from './pages/Contact'; 
import AnimatedBackground from './components/AnimatedBackground';
import Footer from './components/Footer';
import BookPickup from './pages/Pickup';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel'; // Import the AdminPanel
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider
import PrivateRoute from './components/PrivateRoute';
export default function App() {
  return (
    // <Router>
      <AuthProvider>
        <div className="min-h-screen font-sans flex flex-col">
          <Header />
          <main className="relative flex-grow pt-24 min-h-screen bg-[#f4f4f4] dark:bg-[#1a1a2e] text-[#222222] dark:text-[#e0e0e0] transition-colors duration-300">
            <AnimatedBackground />
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} /> */}
                <Route path="/book-pickup" element={<BookPickup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Protected Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/rates" element={<Rates />} />
                  <Route path="/bookpickup" element={<BookPickup />} />
                  <Route path="/admin" element={<AdminPanel />} />
                </Route>
              </Routes>
            </div>
          </main>
          <Footer/>
        </div>
      </AuthProvider>
    // </Router>
  );
}
