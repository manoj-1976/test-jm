import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Palette, BadgeDollarSign, ThumbsUp } from 'lucide-react';

const featureItems = [
  {
    icon: <BadgeDollarSign className="text-primary-600" size={36} />,
    title: 'Transparent Pricing',
    description: 'No hidden costs or surprises. Quality always comes at the right price.',
  },
  {
    icon: <Clock className="text-primary-600" size={36} />,
    title: 'Quick Turnaround',
    description: 'Complete installations within 30-45 days, requiring less time than traditional methods.',
  },
  {
    icon: <Palette className="text-primary-600" size={36} />,
    title: 'Design Variety',
    description: 'Wide range of designs, finishes, colors, and materials to suit your style and preferences.',
  },
  {
    icon: <ThumbsUp className="text-primary-600" size={36} />,
    title: 'Quality Assurance',
    description: 'Premium materials and craftsmanship ensuring durability and satisfaction.',
  },
];

const Features = () => {
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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Why Choose Jay Modular
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            We deliver exceptional design experiences with attention to detail, 
            quality craftsmanship, and customer satisfaction.
          </p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;