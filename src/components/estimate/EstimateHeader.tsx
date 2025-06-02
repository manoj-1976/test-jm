import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FormInput, ListChecks, FileText } from 'lucide-react';
import Logo from '../Logo';
import { motion } from 'framer-motion';

interface EstimateHeaderProps {
  step: 'personal' | 'questions' | 'result';
}

const EstimateHeader: React.FC<EstimateHeaderProps> = ({ step }) => {
  const steps = [
    { id: 'personal', label: 'Personal Details', icon: <FormInput size={20} /> },
    { id: 'questions', label: 'Project Questions', icon: <ListChecks size={20} /> },
    { id: 'result', label: 'Your Estimate', icon: <FileText size={20} /> },
  ];
  
  const currentStepIndex = steps.findIndex((s) => s.id === step);
  
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center">
            <Logo className="text-primary-800" />
          </Link>
          
          <Link 
            to="/" 
            className="flex items-center text-gray-700 hover:text-primary-700 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Home</span>
          </Link>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold text-gray-900 text-center mb-6 md:mb-10">
            Get Your Personalized Estimate
          </h1>
        </div>
        
        {/* Progress Steps */}
        <div className="relative flex justify-center items-center max-w-3xl mx-auto mt-10">
          {/* Progress Bar */}
          <div className="absolute top-7 left-0 w-[92%] mx-[4%] h-0.5 bg-gray-300 overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-primary-500 relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.8, type: 'tween', ease: 'easeInOut' }}
            >
              {/* Flow animation overlay */}
              <motion.div
                className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-white/0 via-white/40 to-white/0 opacity-60 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'linear',
                }}
            />
            </motion.div>
          </div>
          
          {/* Steps */}
          <div className="flex justify-between w-full relative z-10">
            {steps.map((s, index) => {
              const isActive = index <= currentStepIndex;
              const isCurrentStep = index === currentStepIndex;
              return (
                <div key={s.id} className="flex flex-col items-center">
                  <motion.div
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 border-2 ${
                      isActive 
                        ? 'bg-primary-600 text-white border-primary-600 shadow' 
                        : 'bg-gray-100 text-gray-500 border-gray-300'
                    }`}
                    animate={isCurrentStep ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                    transition={isCurrentStep ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
                    style={{ 
                      boxShadow: isCurrentStep ? '0 4px 12px rgba(0,0,0,0.1)' : 'none' 
                    }}
                  >
                    {s.icon}
                  </motion.div>
                  <span className={`text-sm mt-3 font-medium text-center transition-colors duration-300 ${
                    isActive ? 'text-primary-700' : 'text-gray-600'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default EstimateHeader;