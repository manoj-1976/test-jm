import React from 'react';
import { motion } from 'framer-motion';

const serviceItems = [
  {
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Modular Kitchen",
    description: "Custom, functional kitchen designs with premium materials and smart storage solutions."
  },
  {
    image: "https://images.pexels.com/photos/1648768/pexels-photo-1648768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Bedroom Design",
    description: "Elegant bedroom interiors with comfortable layouts and personalized aesthetics."
  },
  {
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Living Room",
    description: "Stylish living spaces that balance comfort, functionality, and visual appeal."
  },
  {
    image: "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Ergonomic Wardrobe",
    description: "Optimized storage solutions with intelligent organization and elegant designs."
  },
  {
    image: "https://images.pexels.com/photos/3935321/pexels-photo-3935321.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Office Design",
    description: "Professional workspaces that enhance productivity and represent your brand identity."
  },
  {
    image: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Bathroom Remodeling",
    description: "Modern bathroom designs with quality fixtures and elegant finishing touches."
  }
];

const Services = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    },
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Our Services
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            We provide comprehensive interior design solutions from planning to execution, 
            all delivered within our 45-day promise.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;