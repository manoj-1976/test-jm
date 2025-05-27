import React, { useState } from 'react';
import { motion } from 'framer-motion';
import EstimateHeader from '../components/estimate/EstimateHeader';
import PersonalDetailsForm from '../components/estimate/PersonalDetailsForm';
import QuestionFlow from '../components/estimate/QuestionFlow';
import EstimateResult from '../components/estimate/EstimateResult';
import Footer from '../components/Footer';

export type PersonalDetails = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
};

export type AnswerData = {
  questionId: string;
  answer: string;
  value: number;
};

const EstimatePage = () => {
  const [step, setStep] = useState<'personal' | 'questions' | 'result'>('personal');
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  });
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [estimateTotal, setEstimateTotal] = useState(0);

  const handlePersonalDetailsSubmit = (details: PersonalDetails) => {
    setPersonalDetails(details);
    setStep('questions');
    window.scrollTo(0, 0);
  };

  const handleQuestionsComplete = (answers: AnswerData[], total: number) => {
    setAnswers(answers);
    setEstimateTotal(total);
    setStep('result');
    window.scrollTo(0, 0);
  };

  const handleRestart = () => {
    setStep('personal');
    setAnswers([]);
    setEstimateTotal(0);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <EstimateHeader step={step} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {step === 'personal' && (
          <PersonalDetailsForm onSubmit={handlePersonalDetailsSubmit} />
        )}
        
        {step === 'questions' && (
          <QuestionFlow onComplete={handleQuestionsComplete} />
        )}
        
        {step === 'result' && (
          <EstimateResult 
            personalDetails={personalDetails} 
            answers={answers} 
            estimateTotal={estimateTotal} 
            onRestart={handleRestart}
          />
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default EstimatePage;