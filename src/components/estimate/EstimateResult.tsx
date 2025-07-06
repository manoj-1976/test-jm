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
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
};

// Helper to parse dimensions string like (16" (W) x 1" (H) = 16 sq ft)
function parseDimensions(dimStr?: string) {
  if (!dimStr) return { L: '', H: '', A: '' };
  const match = dimStr.match(/([\d.]+)[^\d]+([\d.]+)[^\d]+([\d.]+)/);
  if (match) {
    return { L: match[1], H: match[2], A: match[3] };
  }
  return { L: '', H: '', A: '' };
}

// Group answers by section (room)
function groupAnswers(answers: AnswerData[]) {
  const groups: Record<string, AnswerData[]> = {};
  answers.forEach(ans => {
    const [section] = ans.questionId.split(' - ');
    if (!groups[section]) groups[section] = [];
    groups[section].push(ans);
  });
  return groups;
}

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
  
  // Project details (mocked for now)
  const projectDetails = {
    date: formatDate(new Date()),
    name: personalDetails.fullName,
    location: personalDetails.city,
    measurements: 'Site Measurements',
    revision: '1',
    totalSqft: 0, // Not available in data, so 0
    rate: 0,      // Not available in data, so 0
  };

  // Group answers by section
  const grouped = groupAnswers(answers);

  // Calculate grand total
  const grandTotal = answers.reduce((sum, a) => sum + a.value, 0);
  
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
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgWidth = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Jay_Modular_Estimate.pdf`);
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
      estimateNumber,
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
    <div className="container mx-auto px-2 py-4 max-w-6xl">
      <div className="flex justify-end mb-4 gap-2">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="flex items-center space-x-1 text-primary-700 hover:text-primary-800 transition-colors border px-3 py-1 rounded"
        >
          {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
          <span>PDF</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center space-x-1 text-primary-700 hover:text-primary-800 transition-colors border px-3 py-1 rounded"
        >
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
      <div ref={estimateRef} className="bg-white p-6 border border-gray-300 rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-400 pb-4 mb-4">
          <div className="mb-2 md:mb-0">
            <Logo className="text-primary-800 mb-2" />
            <div className="text-lg font-bold text-primary-800">PROJECT DETAILS :</div>
            <div className="text-sm text-gray-700 mt-1">
              <div><span className="font-semibold">DATE :</span> {projectDetails.date}</div>
              <div><span className="font-semibold">NAME :</span> {projectDetails.name}</div>
              <div><span className="font-semibold">LOCATION :</span> {projectDetails.location}</div>
              <div><span className="font-semibold">MEASUREMENTS :</span> {projectDetails.measurements}</div>
              <div><span className="font-semibold">REVISION NO :</span> {projectDetails.revision}</div>
            </div>
          </div>
          <div className="text-right w-full md:w-auto mt-4 md:mt-0">
            <div className="italic font-semibold text-lg text-primary-700">Wooden Work, Kitchen accessories<br/>Tall Unit and Wall Unit work<br/>Glass Work and Mirror Work</div>
            <div className="mt-2 text-base font-bold text-primary-900 bg-primary-100 rounded px-2 py-1 inline-block">
              TOTAL: <span className="text-primary-700">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs md:text-sm border border-gray-400">
            <thead>
              <tr className="bg-primary-900 text-white">
                <th className="border border-gray-400 px-2 py-2">SN</th>
                <th className="border border-gray-400 px-2 py-2">Description</th>
                <th className="border border-gray-400 px-2 py-2">Material Specification</th>
                <th className="border border-gray-400 px-2 py-2">Dimensions</th>
                <th className="border border-gray-400 px-2 py-2">Sq.Ft</th>
                <th className="border border-gray-400 px-2 py-2">Amt</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([section, items], secIdx) => {
                let sectionSqft = 0;
                return (
                  <React.Fragment key={section}>
                    {/* Section Header Row */}
                    <tr className="bg-primary-100">
                      <td colSpan={6} className="font-bold italic text-primary-900 px-2 py-2 text-left border border-gray-400">
                        {secIdx + 1}. {section}
                      </td>
                    </tr>
                    {items.map((ans, idx) => {
                      // Extract sq ft from dimensions property if available
                      let sqft = '';
                      if (ans.dimensions) {
                        const sqMatch = ans.dimensions.match(/([\d.]+)\s*sq\s*ft/i);
                        if (sqMatch) {
                          sqft = sqMatch[1];
                          sectionSqft += parseFloat(sqft);
                        }
                      } else {
                        // Fallback: Try to extract from answer string
                        const dimMatch = ans.answer.match(/\(([^)]+)\)/);
                        if (dimMatch) {
                          const sqMatch = dimMatch[1].match(/([\d.]+)\s*sq\s*ft/i);
                          if (sqMatch) {
                            sqft = sqMatch[1];
                            sectionSqft += parseFloat(sqft);
                          }
                        }
                      }
                      // Remove dimensions from answer for Material Specification
                      const materialSpec = ans.answer.replace(/\s*\([^)]*\)/, '');
                      return (
                        <tr key={ans.questionId + idx}>
                          <td className="border border-gray-400 px-2 py-1 text-center">{idx + 1}</td>
                          <td className="border border-gray-400 px-2 py-1">{ans.questionId.split(' - ')[1]}</td>
                          <td className="border border-gray-400 px-2 py-1">{materialSpec}</td>
                          <td className="border border-gray-400 px-2 py-1">{ans.dimensions || ''}</td>
                          <td className="border border-gray-400 px-2 py-1 text-center">{sqft}</td>
                          <td className="border border-gray-400 px-2 py-1 text-right">₹{ans.value.toLocaleString()}</td>
                        </tr>
                      );
                    })}
                    {/* Section Total Row */}
                    <tr className="bg-primary-50 font-semibold">
                      <td colSpan={4} className="border border-gray-400 px-2 py-1 text-right">Section Total Sq.Ft</td>
                      <td className="border border-gray-400 px-2 py-1 text-center">{sectionSqft}</td>
                      <td className="border border-gray-400 px-2 py-1 text-right text-primary-900">
                        ₹{items.reduce((sum, a) => sum + a.value, 0).toLocaleString()}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
              {/* Grand Total Row */}
              <tr className="bg-primary-200 font-bold text-lg">
                <td colSpan={4} className="border border-gray-400 px-2 py-2 text-right">GRAND TOTAL Sq.Ft</td>
                <td className="border border-gray-400 px-2 py-2 text-center">
                  {(() => {
                    // Sum all sq.ft from all items
                    let totalSqft = 0;
                    answers.forEach(ans => {
                      let sqft = '';
                      if (ans.dimensions) {
                        const sqMatch = ans.dimensions.match(/([\d.]+)\s*sq\s*ft/i);
                        if (sqMatch) {
                          totalSqft += parseFloat(sqMatch[1]);
                        }
                      } else {
                        const dimMatch = ans.answer.match(/\(([^)]+)\)/);
                        if (dimMatch) {
                          const sqMatch = dimMatch[1].match(/([\d.]+)\s*sq\s*ft/i);
                          if (sqMatch) {
                            totalSqft += parseFloat(sqMatch[1]);
                          }
                        }
                      }
                    });
                    return totalSqft;
                  })()}
                </td>
                <td className="border border-gray-400 px-2 py-2 text-right text-primary-900">
                  ₹{grandTotal.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Notes Section */}
        <div className="mt-6 bg-primary-50 p-4 rounded text-xs md:text-sm text-gray-700">
          <div className="font-bold mb-1">Notes:</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>This is an estimate based on the information provided. Final costs may vary based on detailed assessment.</li>
            <li>The estimate is valid for 30 days from the issue date.</li>
            <li>A 50% deposit is required to begin work, with the balance due upon completion.</li>
            <li>Project timeline is approximately 30-45 days from deposit payment.</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <button
          onClick={onRestart}
          className="flex items-center text-gray-700 hover:text-primary-700 transition-colors border px-4 py-2 rounded"
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
    </div>
  );
};

export default EstimateResult;