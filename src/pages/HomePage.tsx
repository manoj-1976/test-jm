import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import Process from '../components/Process';
import Gallery from '../components/Gallery';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  
  const handleGetEstimate = () => {
    navigate('/estimate');
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero onGetEstimate={handleGetEstimate} />
        <Features />
        <AboutUs />
        <Services />
        <Gallery />
        <Process />
        <CTA onGetEstimate={handleGetEstimate} />
        <Footer />
      </motion.div>
    </div>
  );
};

export default HomePage;