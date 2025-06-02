import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Workflow, PackagePlus, PaintBucket, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    icon: <Workflow size={32} className="text-primary-600" />,
    title: "Planning & Design",
    description: "Consultation, measurements, and creating 3D drawings to visualize your space."
  },
  {
    icon: <PackagePlus size={32} className="text-primary-600" />,
    title: "Manufacturing",
    description: "Factory production with precision cutting and assembly for quality assurance."
  },
  {
    icon: <PaintBucket size={32} className="text-primary-600" />,
    title: "Installation",
    description: "Professional on-site fitting by our experienced installation team."
  },
  {
    icon: <CheckCircle size={32} className="text-primary-600" />,
    title: "Final Inspection",
    description: "Thorough quality check and client walkthrough to ensure complete satisfaction."
  }
];

const Process = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { margin: '-100px' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-gray-900">
            Our Process
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto">
            From initial concept to final installation, we follow a streamlined process 
            to deliver exceptional results within 45 days.
          </p>
        </div>
        
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate={controls}
          variants={{
            visible: { transition: { staggerChildren: 0.25 } },
            hidden: {},
          }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, x: -60 },
                visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 60, damping: 18 } },
              }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 bg-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-primary-500 text-primary-700 font-bold z-10">
                {index + 1}
              </div>
              {/* Content */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 h-full">
                <div className="mb-4">{step.icon}</div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {/* Connector Line (except for last item) */}
              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-300 overflow-hidden">
                  {/* Flow animation overlay */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-white/0 via-primary-200/80 to-white/0 opacity-80 pointer-events-none"
                    initial={{ x: '-60%' }}
                    animate={{ x: '120%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'linear',
                    }}
                  />
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Timeline for mobile (visible only on smaller screens) */}
        <div className="mt-8 md:hidden">
          <div className="w-1 bg-primary-200 mx-auto h-full">
            <div className="w-3 h-3 bg-primary-500 rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;