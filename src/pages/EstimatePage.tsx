import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import EstimateHeader from '../components/estimate/EstimateHeader';
import PersonalDetailsForm from '../components/estimate/PersonalDetailsForm';
import QuestionFlow from '../components/estimate/QuestionFlow';
import EstimateResult from '../components/estimate/EstimateResult';
import Footer from '../components/Footer';
import { BASE_URL } from '../components/api/api.tsx';


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
  dimensions?: string;
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

  const handlePersonalDetailsSubmit = async (details: PersonalDetails) => {
    try {
      const response = await axios.post(`${BASE_URL}/details`, {
        fullName: details.fullName,
        email: details.email,
        phone: details.phone,
        city: details.city,
        address: details.address,
      });
      // save the id to the local storage
      if (response.status == 200 ) {
          localStorage.setItem('id', response.data.Id);
      } else {
        throw new Error('Failed to save details');
      }
      setPersonalDetails(details);
      setStep('questions');
      window.scrollTo(0, 0);
    } catch (error) {
      setPersonalDetails(details);
      setStep('questions');
      window.scrollTo(0, 0);
      // alert('Failed to save your details. Please try again.');
    }
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