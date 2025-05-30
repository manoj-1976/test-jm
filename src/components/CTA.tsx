import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';

interface CTAProps {
  onGetEstimate: () => void;
}

const CTA: React.FC<CTAProps> = ({ onGetEstimate }) => {
  return (
    <section className="py-20 bg-primary-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#e4d7ce_0%,_transparent_60%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_#d4beb0_0%,_transparent_60%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Ready to Transform Your Space?
            </h2>
            
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get started with a personalized estimate for your interior design project. 
              Our expert team is ready to bring your vision to life.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={onGetEstimate}
                className="bg-white text-primary-800 px-8 py-3 rounded-md font-medium flex items-center justify-center transition-all group"
              >
                Get Your Free Estimate
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </motion.button>
              
              <a 
                href="#contact" 
                className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium flex items-center justify-center transition-all"
              >
                Contact Us
              </a>
            </div>
            
            <div className="flex items-center justify-center text-white/80">
              <Clock size={20} className="mr-2" />
              <span>Projects delivered within 45 days</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;