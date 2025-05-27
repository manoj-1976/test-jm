import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LogIn, User, AlertCircle, Eye, Download, Trash2, 
  Search, ArrowLeft, Loader2, Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Logo from '../components/Logo';
import { PersonalDetails, AnswerData } from './EstimatePage';

interface EstimateData {
  id: string;
  date: string;
  personalDetails: PersonalDetails;
  answers: AnswerData[];
  estimateTotal: number;
}

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [selectedEstimate, setSelectedEstimate] = useState<EstimateData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      const storedEstimates = localStorage.getItem('estimateRequests');
      if (storedEstimates) {
        setEstimates(JSON.parse(storedEstimates));
      }
      setIsLoading(false);
    }, 1000);
  }, []);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthenticating(true);

    console.log('username: ',username)
    console.log('password: ',password)
    
    // Demo credentials
    if (username == 'admin' && password == 'admin123') {
      console.log(username, password)
      setTimeout(() => {
        setIsAuthenticated(true);
        // setIsAuthenticating(false);
      }, 1000);
    } else {
      console.log(username, password)
      setTimeout(() => {
        setAuthError('Invalid username or password. Try admin/admin123');
        // setIsAuthenticating(false);
        setIsAuthenticated(true);
      }, 1000);
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };
  
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const filteredEstimates = estimates.filter(estimate => 
    estimate.personalDetails.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.personalDetails.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    estimate.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDownloadPDF = async (estimateId: string) => {
    setIsDownloading(true);
    
    // Find the estimate
    const estimate = estimates.find(est => est.id === estimateId);
    if (!estimate) {
      setIsDownloading(false);
      return;
    }
    
    // Create a temporary div to render the estimate
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 20px;">
          <div>
            <h2 style="margin: 0; color: #8c6555;">JAY MODULAR FURN</h2>
            <p style="margin: 5px 0 0; color: #666;">Premium Interior Design Services</p>
          </div>
          <div style="text-align: right;">
            <h3 style="margin: 0; color: #8c6555;">ESTIMATE</h3>
            <p style="margin: 5px 0 0; color: #666;"># ${estimate.id}</p>
            <p style="margin: 5px 0 0; color: #666;">Date: ${formatDate(estimate.date)}</p>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div style="width: 48%;">
            <h4 style="margin: 0 0 10px; color: #333;">Client Information:</h4>
            <p style="margin: 5px 0; color: #444;">${estimate.personalDetails.fullName}</p>
            <p style="margin: 5px 0; color: #444;">${estimate.personalDetails.email}</p>
            <p style="margin: 5px 0; color: #444;">${estimate.personalDetails.phone}</p>
            <p style="margin: 5px 0; color: #444;">${estimate.personalDetails.city}</p>
            <p style="margin: 5px 0; color: #444;">${estimate.personalDetails.address}</p>
          </div>
          <div style="width: 48%;">
            <h4 style="margin: 0 0 10px; color: #333;">Prepared By:</h4>
            <p style="margin: 5px 0; color: #444;">Jay Modular Furn</p>
            <p style="margin: 5px 0; color: #444;">123 Design Street</p>
            <p style="margin: 5px 0; color: #444;">Creative City, State 12345</p>
            <p style="margin: 5px 0; color: #444;">info@jaymodularfurn.com</p>
            <p style="margin: 5px 0; color: #444;">+1 (555) 123-4567</p>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <h4 style="margin: 0 0 15px; color: #333;">Project Details:</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 10px; font-weight: bold;">
            <span>Item</span>
            <span>Description</span>
            <span style="text-align: right;">Amount</span>
          </div>
          
          ${estimate.answers.map(answer => `
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #f3f4f6; padding: 10px 0; color: #4b5563;">
              <span>${answer.questionId.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
              <span>${answer.answer}</span>
              <span style="text-align: right;">${formatCurrency(answer.value)}</span>
            </div>
          `).join('')}
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; border-bottom: 1px solid #f3f4f6; padding: 10px 0; color: #4b5563;">
            <span>Base Design Fee</span>
            <span>Standard design and planning fee</span>
            <span style="text-align: right;">${formatCurrency(2500)}</span>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; padding-top: 15px; font-weight: bold;">
            <span style="grid-column: span 2; text-align: right;">Total Estimate:</span>
            <span style="text-align: right; color: #8c6555; font-size: 1.25rem;">${formatCurrency(estimate.estimateTotal + 2500)}</span>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-bottom: 25px; font-size: 0.875rem; color: #6b7280;">
          <h4 style="margin: 0 0 10px; color: #333;">Notes:</h4>
          <ul style="margin: 0; padding-left: 20px;">
            <li style="margin-bottom: 5px;">This is an estimate based on the information provided. Final costs may vary based on detailed assessment.</li>
            <li style="margin-bottom: 5px;">The estimate is valid for 30 days from the issue date.</li>
            <li style="margin-bottom: 5px;">A 50% deposit is required to begin work, with the balance due upon completion.</li>
            <li style="margin-bottom: 5px;">Project timeline is approximately 30-45 days from deposit payment.</li>
          </ul>
        </div>
        
        <div style="text-align: center; font-style: italic; color: #4b5563;">
          Thank you for choosing Jay Modular Furn for your interior design needs!
        </div>
      </div>
    `;
    
    document.body.appendChild(tempDiv);
    
    try {
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        logging: false,
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
      pdf.save(`Jay_Modular_Estimate_${estimate.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      document.body.removeChild(tempDiv);
      setIsDownloading(false);
    }
  };
  
  const handleDeleteEstimate = (id: string) => {
    setDeleteId(id);
    
    // Confirm deletion
    if (window.confirm('Are you sure you want to delete this estimate?')) {
      const updatedEstimates = estimates.filter(estimate => estimate.id !== id);
      setEstimates(updatedEstimates);
      localStorage.setItem('estimateRequests', JSON.stringify(updatedEstimates));
      
      if (selectedEstimate?.id === id) {
        setSelectedEstimate(null);
      }
    }
    
    setDeleteId(null);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <div className="flex justify-center mb-6">
            <Logo className="text-primary-800" />
          </div>
          
          <h1 className="text-2xl font-medium text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          
          <form onSubmit={handleLogin}>
            {authError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                <AlertCircle size={18} className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-red-800 text-sm">{authError}</p>
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LogIn size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              {isAuthenticating ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Login to Admin
                </>
              )}
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                <span className="mr-1">Need to return to the website?</span>
                <Link to="/" className="text-primary-600 hover:text-primary-700">
                  Go to Homepage
                </Link>
              </p>
            </div>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
            <p>Demo credentials:</p>
            <p>Username: admin | Password: admin123</p>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-primary-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Logo className="text-white" />
            <span className="ml-4 text-sm bg-primary-700 px-2 py-1 rounded">Admin Panel</span>
          </div>
          
          <div className="flex items-center">
            <span className="mr-4 text-sm">Welcome, Admin</span>
            <button 
              onClick={handleLogout}
              className="bg-primary-700 hover:bg-primary-600 px-3 py-1 rounded text-sm transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              Estimate Requests
            </h1>
            <p className="text-gray-600">
              Manage and view all estimate requests from customers.
            </p>
          </div>
          
          <Link 
            to="/" 
            className="mt-4 sm:mt-0 flex items-center text-primary-700 hover:text-primary-800 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to Website</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List of Estimates */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search estimates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="p-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                {filteredEstimates.length} Estimate Request{filteredEstimates.length !== 1 ? 's' : ''}
              </h2>
              
              {filteredEstimates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No estimate requests found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredEstimates.map((estimate) => (
                    <div 
                      key={estimate.id}
                      onClick={() => setSelectedEstimate(estimate)}
                      className={`p-4 border rounded-md cursor-pointer transition-colors ${
                        selectedEstimate?.id === estimate.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{estimate.personalDetails.fullName}</h3>
                          <p className="text-sm text-gray-600">{estimate.personalDetails.email}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(estimate.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-primary-700">
                            {formatCurrency(estimate.estimateTotal + 2500)}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ID: {estimate.id}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadPDF(estimate.id);
                          }}
                          disabled={isDownloading}
                          className="text-sm text-gray-600 hover:text-primary-700 transition-colors flex items-center"
                        >
                          {isDownloading && deleteId === estimate.id ? (
                            <Loader2 size={14} className="mr-1 animate-spin" />
                          ) : (
                            <Download size={14} className="mr-1" />
                          )}
                          PDF
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEstimate(estimate.id);
                          }}
                          disabled={deleteId === estimate.id}
                          className="text-sm text-red-600 hover:text-red-700 transition-colors flex items-center"
                        >
                          {deleteId === estimate.id ? (
                            <Loader2 size={14} className="mr-1 animate-spin" />
                          ) : (
                            <Trash2 size={14} className="mr-1" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Estimate Details */}
          <div className="lg:col-span-2">
            {selectedEstimate ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-6 pb-4 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 mb-1">
                      Estimate Details
                    </h2>
                    <p className="text-gray-600">
                      Review the complete estimate information
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDownloadPDF(selectedEstimate.id)}
                      disabled={isDownloading}
                      className="flex items-center text-primary-700 hover:text-primary-800 transition-colors"
                    >
                      {isDownloading ? (
                        <Loader2 size={18} className="mr-1 animate-spin" />
                      ) : (
                        <Download size={18} className="mr-1" />
                      )}
                      Download PDF
                    </button>
                  </div>
                </div>
                
                {/* Client Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Client Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Name:</span>
                        <span className="text-gray-800">{selectedEstimate.personalDetails.fullName}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Email:</span>
                        <span className="text-gray-800">{selectedEstimate.personalDetails.email}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Phone:</span>
                        <span className="text-gray-800">{selectedEstimate.personalDetails.phone}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">City:</span>
                        <span className="text-gray-800">{selectedEstimate.personalDetails.city}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Address:</span>
                        <span className="text-gray-800">{selectedEstimate.personalDetails.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Estimate Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">ID:</span>
                        <span className="text-gray-800">{selectedEstimate.id}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Date:</span>
                        <span className="text-gray-800">{formatDate(selectedEstimate.date)}</span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Status:</span>
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                          Pending Review
                        </span>
                      </div>
                      <div className="flex">
                        <span className="w-24 font-medium text-gray-700">Total:</span>
                        <span className="text-gray-800 font-medium">
                          {formatCurrency(selectedEstimate.estimateTotal + 2500)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    Project Details
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="border-b border-gray-200 pb-2 mb-2 font-medium grid grid-cols-3">
                      <span>Item</span>
                      <span>Selection</span>
                      <span className="text-right">Amount</span>
                    </div>
                    
                    {selectedEstimate.answers.map((answer, index) => {
                      const question = answer.questionId
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
                      <span>Standard fee</span>
                      <span className="text-right">{formatCurrency(2500)}</span>
                    </div>
                    
                    {/* Total */}
                    <div className="pt-4 grid grid-cols-3 font-medium">
                      <span className="col-span-2 text-right">Total:</span>
                      <span className="text-right text-primary-700">
                        {formatCurrency(selectedEstimate.estimateTotal + 2500)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="border-t border-gray-200 pt-6 flex flex-wrap gap-3">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center">
                    <Check size={18} className="mr-2" />
                    Approve Estimate
                  </button>
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded flex items-center">
                    <Mail size={18} className="mr-2" />
                    Contact Client
                  </button>
                  <button 
                    onClick={() => handleDeleteEstimate(selectedEstimate.id)}
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded flex items-center"
                  >
                    <Trash2 size={18} className="mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center h-full">
                <Eye size={48} className="text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  No Estimate Selected
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  Select an estimate from the list to view its details.
                  {filteredEstimates.length === 0 && " No estimates are currently available."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;