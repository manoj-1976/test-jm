import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Download, Share2, ArrowLeft, Printer, CheckCircle, Send, Loader2 
} from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PersonalDetails, AnswerData } from '../../pages/EstimatePage';
import Logo from '../Logo';

interface EstimateResultProps {
  personalDetails: PersonalDetails;
  answers: AnswerData[];
  estimateTotal: number;
  onRestart: () => void;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const EstimateResult: React.FC<EstimateResultProps> = ({ 
  personalDetails, 
  answers, 
  estimateTotal,
  onRestart
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const estimateRef = useRef<HTMLDivElement>(null);
  
  // Generate a unique estimate number
  const estimateNumber = `EST-${Date.now().toString().substring(6)}`;
  const currentDate = new Date();
  const validUntilDate = new Date();
  validUntilDate.setDate(validUntilDate.getDate() + 30);
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const handleDownloadPDF = async () => {
    if (!estimateRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const estimateElement = estimateRef.current;
      const canvas = await html2canvas(estimateElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Jay_Modular_Estimate_${estimateNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleShareEstimate = () => {
    setIsSharing(true);
    
    // Simulate sharing functionality
    setTimeout(() => {
      setIsSharing(false);
      alert('Share functionality would be implemented here. The estimate would be shared via email or messaging.');
    }, 1500);
  };
  
  const handleSubmitRequest = () => {
    setIsSubmitted(true);
    
    // Store the estimate data in localStorage
    const estimateData = {
      id: estimateNumber,
      date: currentDate.toISOString(),
      personalDetails,
      answers,
      estimateTotal,
    };
    
    // Get existing estimates or initialize empty array
    const existingEstimates = JSON.parse(localStorage.getItem('estimateRequests') || '[]');
    existingEstimates.push(estimateData);
    localStorage.setItem('estimateRequests', JSON.stringify(existingEstimates));
    
    // Simulate API call with timeout
    setTimeout(() => {
      setShowSuccess(true);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AnimatePresence>
        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-md text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Your Estimate Request Submitted!
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Thank you for your interest! Our team will review your estimate and contact you shortly to discuss the next steps.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={onRestart}
                className="border border-gray-300 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Create Another Estimate
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-medium text-gray-800">
                  Your Estimate Result
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="flex items-center space-x-1 text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-1 text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    <Printer size={16} />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={handleShareEstimate}
                    disabled={isSharing}
                    className="flex items-center space-x-1 text-primary-700 hover:text-primary-800 transition-colors"
                  >
                    {isSharing ? <Loader2 size={16} className="animate-spin" /> : <Share2 size={16} />}
                    <span>Share</span>
                  </button>
                </div>
              </div>
              
              <div ref={estimateRef} className="bg-white p-6 border border-gray-200 rounded-lg">
                {/* Estimate Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-6 mb-6">
                  <div className="mb-4 sm:mb-0">
                    <Logo className="text-primary-800 mb-2" />
                    <p className="text-gray-600 text-sm">Premium Interior Design Services</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-xl font-semibold text-primary-700">ESTIMATE</h3>
                    <p className="text-gray-600 text-sm"># {estimateNumber}</p>
                    <p className="text-gray-600 text-sm">Date: {formatDate(currentDate)}</p>
                    <p className="text-gray-600 text-sm">Valid until: {formatDate(validUntilDate)}</p>
                  </div>
                </div>
                
                {/* Client Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Client Information:</h4>
                    <p className="text-gray-700">{personalDetails.fullName}</p>
                    <p className="text-gray-700">{personalDetails.email}</p>
                    <p className="text-gray-700">{personalDetails.phone}</p>
                    <p className="text-gray-700">{personalDetails.city}</p>
                    <p className="text-gray-700">{personalDetails.address}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Prepared By:</h4>
                    <p className="text-gray-700">Jay Modular Furn</p>
                    <p className="text-gray-700">123 Design Street</p>
                    <p className="text-gray-700">Creative City, State 12345</p>
                    <p className="text-gray-700">info@jaymodularfurn.com</p>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                {/* Estimate Details */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-800 mb-3">Project Details:</h4>
                  <div className="border-b border-gray-200 pb-2 mb-2 font-medium grid grid-cols-3">
                    <span>Item</span>
                    <span>Description</span>
                    <span className="text-right">Amount</span>
                  </div>
                  {answers.map((answer, index) => {
                    const question = answers.find(a => a.questionId === answer.questionId)?.questionId
                      .split('_')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
                    
                    return (
                      <div key={index} className="border-b border-gray-100 py-3 grid grid-cols-3 text-gray-700">
                        <span>{question}</span>
                        <span>{answer.answer}</span>
                        <span className="text-right">{formatCurrency(answer.value)}</span>
                      </div>
                    );
                  })}
                  
                  {/* Base Cost */}
                  <div className="border-b border-gray-100 py-3 grid grid-cols-3 text-gray-700">
                    <span>Base Design Fee</span>
                    <span>Standard design and planning fee</span>
                    <span className="text-right">{formatCurrency(2500)}</span>
                  </div>
                  
                  {/* Total */}
                  <div className="pt-4 grid grid-cols-3 font-medium">
                    <span className="col-span-2 text-right">Total Estimate:</span>
                    <span className="text-right text-xl text-primary-700">{formatCurrency(estimateTotal + 2500)}</span>
                  </div>
                </div>
                
                {/* Notes */}
                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 mb-6">
                  <h4 className="font-medium text-gray-800 mb-2">Notes:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>This is an estimate based on the information provided. Final costs may vary based on detailed assessment.</li>
                    <li>The estimate is valid for 30 days from the issue date.</li>
                    <li>A 50% deposit is required to begin work, with the balance due upon completion.</li>
                    <li>Project timeline is approximately 30-45 days from deposit payment.</li>
                  </ul>
                </div>
                
                {/* Thank You */}
                <div className="text-center text-gray-700 italic">
                  Thank you for choosing Jay Modular Furn for your interior design needs!
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <button
                onClick={onRestart}
                className="flex items-center text-gray-700 hover:text-primary-700 transition-colors"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Create a new estimate</span>
              </button>
              
              <button
                onClick={handleSubmitRequest}
                disabled={isSubmitted}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors"
              >
                {isSubmitted ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Submit Request <Send size={18} className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EstimateResult;