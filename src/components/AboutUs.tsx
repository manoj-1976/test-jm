import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import FlipNumbers from 'react-flip-numbers';

const AboutUs = () => {
  const { ref, inView } = useInView({ triggerOnce: false });
  return (
    <section id="about" className="py-20 bg-white overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-full bg-secondary-100 rounded-2xl transform -translate-x-6 -translate-y-6 -z-10"></div>
              <img 
                src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Interior design team" 
                className="rounded-2xl w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
          </motion.div>
          
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6 text-gray-900">
              About Us
            </h2>
            <div className="w-24 h-1 bg-primary-500 mb-8"></div>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
            At Jay Modular Furn, we are a passionate and dynamic team with over 10 years of experience in interior design and construction. We specialize in interior designing, turnkey fit-outs, and contract solutions for offices, retail spaces, restaurants, and residential projects.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">
            What sets us apart is our client-first approach—we take the time to truly understand your needs, lifestyle, and aspirations. Every project we undertake is a journey we walk together, crafting spaces that enhance daily life and reflect your unique identity.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
            We are committed to using eco-friendly, sustainable, and economical materials, ensuring our designs are both responsible and resilient. With a strong focus on innovation and quality, Jay Modular Furn is redefining modern interior solutions without compromising on aesthetics or function.
            </p>

            <p className="text-gray-700 mb-8 leading-relaxed">
            Our vision is to become a globally reputed firm known for transforming everyday environments into inspiring spaces. We believe that surroundings deeply influence well-being, productivity, and happiness—whether it's where you work or where you live.
            </p>
            
            <p className="text-gray-700 mb-8 leading-relaxed">
            At Jay Modular Furn, transparency, trust, and long-term relationships are the pillars of everything we do. We're not just designing interiors; we're creating better lifestyles.  
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-semibold text-primary-700 mb-1 flex justify-center">
                  <FlipNumbers
                    height={36}
                    width={28}
                    color="#7a2c00"
                    background="white"
                    play={inView}
                    numbers={inView ? '10' : '00'}
                    duration={1.5}
                  />
                  +
                </span>
                <span className="text-gray-600 text-sm">Years Experience</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <span className="block text-3xl font-semibold text-primary-700 mb-1 flex justify-center">
                  <FlipNumbers
                    height={36}
                    width={28}
                    color="#7a2c00"
                    background="white"
                    play={inView}
                    numbers={inView ? '150' : '000'}
                    duration={1.5}
                  />
                  +
                </span>
                <span className="text-gray-600 text-sm">Projects Completed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;