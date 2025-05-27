import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Home, ArrowRight, Loader2 } from 'lucide-react';
import { PersonalDetails } from '../../pages/EstimatePage';

interface PersonalDetailsFormProps {
  onSubmit: (details: PersonalDetails) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onSubmit }) => {
  const [details, setDetails] = useState<PersonalDetails>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const updateDetail = (field: keyof PersonalDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!details.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!details.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(details.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!details.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-() ]{10,15}$/.test(details.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!details.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!details.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        onSubmit(details);
        setIsSubmitting(false);
      }, 1000);
    }
  };
  
  const inputClasses = (field: keyof PersonalDetails) => `
    w-full p-3 pl-10 border rounded-md focus:outline-none focus:ring-2 transition-all
    ${errors[field] 
      ? 'border-red-300 focus:ring-red-200' 
      : 'border-gray-300 focus:ring-primary-200 focus:border-primary-500'}
  `;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-medium text-gray-800 mb-6">
        Your Personal Details
      </h2>
      
      <p className="text-gray-600 mb-6">
        Please provide your contact information so we can send you your custom estimate.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                value={details.fullName}
                onChange={(e) => updateDetail('fullName', e.target.value)}
                className={inputClasses('fullName')}
                placeholder="Your full name"
              />
            </div>
            {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                value={details.email}
                onChange={(e) => updateDetail('email', e.target.value)}
                className={inputClasses('email')}
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                value={details.phone}
                onChange={(e) => updateDetail('phone', e.target.value)}
                className={inputClasses('phone')}
                placeholder="Your phone number"
              />
            </div>
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
          
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="city"
                value={details.city}
                onChange={(e) => updateDetail('city', e.target.value)}
                className={inputClasses('city')}
                placeholder="Your city"
              />
            </div>
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Full Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Home size={18} className="text-gray-400" />
              </div>
              <textarea
                id="address"
                value={details.address}
                onChange={(e) => updateDetail('address', e.target.value)}
                className={inputClasses('address')}
                placeholder="Your full address"
                rows={3}
              />
            </div>
            {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
          </div>
          
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md font-medium flex items-center justify-center transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={20} className="mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Questions <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PersonalDetailsForm;