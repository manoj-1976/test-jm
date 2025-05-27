import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onGetEstimate: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetEstimate }) => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
          filter: 'brightness(0.7)'
        }}
      />
      
      {/* Content */}
      <div className="container relative mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-white"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight">
            Transform Your Space with Premium Interior Design
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-xl">
            We create beautiful, functional spaces that reflect your personality and enhance your life. 
            From concept to completion in under 45 days.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              animate={{ y: [0, -16, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08, y: -24 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGetEstimate}
              className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-5 rounded-lg font-bold text-2xl flex items-center justify-center transition-all shadow-lg"
            >
              Get Your Estimate <ArrowRight size={28} className="ml-3" />
            </motion.button>
            
            <a 
              href="#gallery" 
              className="border border-white/40 hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center transition-all"
            >
              View Our Work
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Element */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: '50%' }}
        transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-16 left-0 h-px bg-gradient-to-r from-white/0 via-white/60 to-white/0"
      />
    </section>
  );
};

export default Hero;