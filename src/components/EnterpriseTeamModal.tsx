import React, { useState, useEffect } from 'react';
import Button from './Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { Send, CheckCircle, ChevronDown, X, Users, Phone, Globe, AlertCircle, Info } from 'lucide-react';

interface EnterpriseFormData {
  fullName: string;
  email: string;
  companyName: string;
  automationGoals: string;
  teamSize: string;
  budgetRange: string;
  priorityLevel: string;
  contactMethod: string;
  phoneNumber: string;
  phoneCountryCode: string;
}

interface EnterpriseTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Updated webhook URL to match other functional forms
const WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

// IP-based country detection (fallback to US)
const detectUserCountry = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/country_code/', {
      timeout: 3000,
    });
    const countryCode = await response.text();
    return countryCode.toLowerCase() || 'us';
  } catch (error) {
    console.log('Country detection failed, defaulting to US');
    return 'us';
  }
};

const EnterpriseTeamModal: React.FC<EnterpriseTeamModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<EnterpriseFormData>({
    fullName: '',
    email: '',
    companyName: '',
    automationGoals: '',
    teamSize: '',
    budgetRange: '',
    priorityLevel: '',
    contactMethod: '',
    phoneNumber: '',
    phoneCountryCode: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [phoneValidationError, setPhoneValidationError] = useState<string | null>(null);
  const [defaultCountry, setDefaultCountry] = useState<string>('us');
  const [isPhoneValid, setIsPhoneValid] = useState<boolean>(false);
  const [showPhoneTooltip, setShowPhoneTooltip] = useState<boolean>(false);

  // Global scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      // Detect user's country when modal opens
      detectUserCountry().then(country => {
        setDefaultCountry(country);
      });
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const teamSizeOptions = [
    { value: '', label: 'Select team size...' },
    { value: '1-5', label: '1-5 people' },
    { value: '6-25', label: '6-25 people' },
    { value: '26-100', label: '26-100 people' },
    { value: '100+', label: '100+ people' },
  ];

  const budgetRangeOptions = [
    { value: '', label: 'Select budget range...' },
    { value: '< $500', label: '< $500' },
    { value: '$500–$5k', label: '$500–$5k' },
    { value: '$5k–$50k', label: '$5k–$50k' },
    { value: '> $50k', label: '> $50k' },
  ];

  const priorityLevelOptions = [
    { value: '', label: 'Select priority level...' },
    { value: 'High', label: 'High - Need solution ASAP' },
    { value: 'Medium', label: 'Medium - Within next 3 months' },
    { value: 'Low', label: 'Low - Exploring options' },
  ];

  const contactMethodOptions = [
    { value: '', label: 'Select preferred contact method...' },
    { value: 'Email', label: 'Email' },
    { value: 'Phone', label: 'Phone' },
  ];

  // Enhanced phone number validation
  const validatePhoneNumber = (phoneNumber: string, countryCode?: string): boolean => {
    if (!phoneNumber || phoneNumber.length < 8) return false;
    
    try {
      // Remove country code prefix for validation if present
      const cleanNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      
      // Parse and validate using libphonenumber-js
      const parsed = parsePhoneNumber(cleanNumber);
      if (parsed) {
        return parsed.isValid() && parsed.number.length >= 10; // Minimum 8 digits after country code
      }
      
      // Fallback validation
      return isValidPhoneNumber(cleanNumber);
    } catch (error) {
      // Additional fallback for edge cases
      const digitsOnly = phoneNumber.replace(/\D/g, '');
      return digitsOnly.length >= 8 && digitsOnly.length <= 15;
    }
  };

  // Handle phone number change with real-time validation
  const handlePhoneChange = (value: string, countryData: any) => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: value,
      phoneCountryCode: countryData.countryCode,
    }));

    // Real-time validation
    if (value && value.length > 3) {
      const isValid = validatePhoneNumber(value, countryData.countryCode);
      setIsPhoneValid(isValid);
      
      if (!isValid && value.length > 8) {
        setPhoneValidationError('Please enter a valid phone number');
      } else {
        setPhoneValidationError(null);
      }
    } else {
      setIsPhoneValid(false);
      setPhoneValidationError(null);
    }
  };

  // Handle phone number blur for final validation
  const handlePhoneBlur = () => {
    if (formData.contactMethod === 'Phone' && formData.phoneNumber) {
      const isValid = validatePhoneNumber(formData.phoneNumber);
      setIsPhoneValid(isValid);
      
      if (!isValid) {
        const digitsCount = formData.phoneNumber.replace(/\D/g, '').length;
        if (digitsCount < 8) {
          setPhoneValidationError('Phone number must have at least 8 digits');
        } else {
          setPhoneValidationError('Please enter a valid phone number');
        }
      } else {
        setPhoneValidationError(null);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear phone number when contact method changes away from Phone
    if (name === 'contactMethod' && value !== 'Phone') {
      setFormData(prevData => ({
        ...prevData,
        phoneNumber: '',
        phoneCountryCode: '',
      }));
      setPhoneValidationError(null);
      setIsPhoneValid(false);
    }
    
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setPhoneValidationError(null);
    
    // Validate phone number if Phone is selected as contact method
    if (formData.contactMethod === 'Phone') {
      if (!formData.phoneNumber.trim()) {
        setPhoneValidationError('Phone number is required when Phone is selected as contact method');
        setIsSubmitting(false);
        return;
      }
      
      const isValid = validatePhoneNumber(formData.phoneNumber);
      if (!isValid) {
        setPhoneValidationError('Please enter a valid phone number with at least 8 digits');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      // Format phone number to E.164 for submission
      let formattedPhone = '';
      if (formData.contactMethod === 'Phone' && formData.phoneNumber) {
        try {
          const parsed = parsePhoneNumber(`+${formData.phoneNumber}`);
          formattedPhone = parsed ? parsed.format('E.164') : formData.phoneNumber;
        } catch {
          formattedPhone = formData.phoneNumber;
        }
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_origin: 'enterprise_custom_solution',
          formType: 'enterprise-team',
          source: 'AutoPilotAI Enterprise Team Form',
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          automationGoals: formData.automationGoals,
          teamSize: formData.teamSize,
          budgetRange: formData.budgetRange,
          priorityLevel: formData.priorityLevel,
          contactMethod: formData.contactMethod,
          phoneNumber: formattedPhone,
          phoneCountryCode: formData.phoneCountryCode,
          rawPhoneNumber: formData.phoneNumber,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Enterprise team form submitted successfully');
      setIsSubmitted(true);
      
      // Reset form after 10 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          companyName: '',
          automationGoals: '',
          teamSize: '',
          budgetRange: '',
          priorityLevel: '',
          contactMethod: '',
          phoneNumber: '',
          phoneCountryCode: '',
        });
        setPhoneValidationError(null);
        setIsPhoneValid(false);
        onClose();
      }, 10000);

    } catch (error) {
      console.error('Enterprise team form submission error:', error);
      setSubmitError('There was an error submitting your request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    setIsSubmitted(false);
    setSubmitError(null);
    setPhoneValidationError(null);
    setFormData({
      fullName: '',
      email: '',
      companyName: '',
      automationGoals: '',
      teamSize: '',
      budgetRange: '',
      priorityLevel: '',
      contactMethod: '',
      phoneNumber: '',
      phoneCountryCode: '',
    });
    setIsPhoneValid(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="glass-card rounded-2xl p-8 relative">
          {/* Hidden input for form origin */}
          <input type="hidden" name="form_origin" value="enterprise_custom_solution" />
          
          {/* Fixed close button position */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 z-10"
          >
            <X size={24} />
          </button>
          
          <div className="flex items-center space-x-3 mb-8 pr-12">
            <div className="p-3 glass-light rounded-xl text-blue-600 dark:text-blue-400">
              <Users size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Connect with Our Team</h3>
              <p className="text-gray-600 dark:text-gray-300">Let's discuss your custom AI automation needs</p>
            </div>
          </div>
          
          {isSubmitted ? (
            <div className="glass-light rounded-xl p-6 text-center animate-slide-up">
              <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold gradient-text mb-3">🎉 Request Received!</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Thank you for reaching out to our team, <span className="font-semibold text-blue-600 dark:text-blue-400">{formData.fullName}</span>.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Our enterprise solutions team will review your requirements and contact you within 24 hours via your preferred method ({formData.contactMethod.toLowerCase()}) to discuss your custom AI automation solution.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium">Enterprise request submitted successfully</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName-enterprise"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email-enterprise"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="companyName-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName-enterprise"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  autoComplete="organization"
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your company name"
                />
              </div>
              
              <div>
                <label htmlFor="automationGoals-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  What are you trying to automate? *
                </label>
                <textarea
                  id="automationGoals-enterprise"
                  name="automationGoals"
                  value={formData.automationGoals}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder="Describe your automation goals, current challenges, and what processes you'd like to streamline..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="teamSize-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Estimated Team Size *
                  </label>
                  <div className="relative">
                    <select
                      id="teamSize-enterprise"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {teamSizeOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="budgetRange-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range *
                  </label>
                  <div className="relative">
                    <select
                      id="budgetRange-enterprise"
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {budgetRangeOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="priorityLevel-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Priority Level *
                  </label>
                  <div className="relative">
                    <select
                      id="priorityLevel-enterprise"
                      name="priorityLevel"
                      value={formData.priorityLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {priorityLevelOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="contactMethod-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Preferred Contact Method *
                  </label>
                  <div className="relative">
                    <select
                      id="contactMethod-enterprise"
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {contactMethodOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Enhanced Embedded Phone Number Field with Fixed Boundary Management */}
              {formData.contactMethod === 'Phone' && (
                <div className="animate-slide-up">
                  <div className="flex items-center space-x-2 mb-2">
                    <label htmlFor="phoneNumber-enterprise" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number *
                      {isPhoneValid && (
                        <span className="ml-2 text-green-600 dark:text-green-400 text-xs">
                          ✓ Valid
                        </span>
                      )}
                    </label>
                    
                    {/* Concise Tooltip */}
                    <div className="relative">
                      <button
                        type="button"
                        onMouseEnter={() => setShowPhoneTooltip(true)}
                        onMouseLeave={() => setShowPhoneTooltip(false)}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info size={14} />
                      </button>
                      
                      {/* Refined Tooltip */}
                      {showPhoneTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 p-2 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg z-[10000] animate-scale-in">
                          <p className="text-center">Supports global formats. Min. 8 digits after code.</p>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Embedded Phone Input Container with Fixed Boundary Management */}
                  <div className="relative phone-input-container">
                    <PhoneInput
                      country={defaultCountry}
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      enableSearch={true}
                      searchPlaceholder="Search countries..."
                      preferredCountries={['us', 'ca', 'gb', 'au', 'de', 'fr', 'in', 'jp']}
                      autoFormat={true}
                      countryCodeEditable={false}
                      inputProps={{
                        name: 'phoneNumber',
                        required: true,
                        autoComplete: 'tel',
                        className: `w-full pl-16 pr-12 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          phoneValidationError 
                            ? 'focus:ring-red-500 border-red-300 dark:border-red-600' 
                            : isPhoneValid
                            ? 'focus:ring-green-500 border-green-300 dark:border-green-600'
                            : 'focus:ring-blue-500'
                        }`,
                        style: {
                          width: '100%',
                          height: '48px',
                          fontSize: '16px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          outline: 'none',
                        }
                      }}
                      buttonStyle={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderRadius: '0.5rem 0 0 0.5rem',
                        padding: '0 8px',
                        height: '48px',
                        width: '58px',
                        position: 'absolute',
                        left: '0',
                        top: '0',
                        zIndex: 2,
                      }}
                      dropdownStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '0.75rem',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        maxHeight: '160px',
                        overflowY: 'auto',
                        zIndex: 9999,
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        marginTop: '4px',
                        width: '100%',
                      }}
                      searchStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '0.5rem',
                        padding: '8px 12px',
                        margin: '8px',
                        fontSize: '14px',
                      }}
                    />
                    
                    {/* Validation indicator */}
                    {formData.phoneNumber && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10">
                        {isPhoneValid ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : phoneValidationError ? (
                          <AlertCircle className="h-5 w-5 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                  
                  {/* Error Message */}
                  {phoneValidationError && (
                    <div className="mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 animate-slide-up">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <p className="text-sm">{phoneValidationError}</p>
                    </div>
                  )}
                  
                  {/* Fixed spacing below phone input to prevent layout shifts */}
                  <div className="h-6"></div>
                </div>
              )}

              {submitError && (
                <div className="glass-light rounded-xl p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-red-700 dark:text-red-300 text-sm">{submitError}</p>
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                variant="gradient" 
                className="w-full" 
                disabled={isSubmitting || (formData.contactMethod === 'Phone' && (!isPhoneValid || !!phoneValidationError))}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    Connect with Our Team
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                * Required fields. Our enterprise team will contact you within 24 hours to discuss your custom AI solution.
              </p>
            </form>
          )}
        </div>
      </div>
      
      {/* Enhanced Custom CSS for react-phone-input-2 with Fixed Boundary Management */}
      <style jsx global>{`
        /* Base phone input container */
        .phone-input-container {
          position: relative;
          z-index: 1;
        }
        
        .react-tel-input {
          font-family: inherit;
          position: relative;
          width: 100%;
          z-index: 1;
        }
        
        /* Input field styling */
        .react-tel-input .form-control {
          background: transparent !important;
          border: none !important;
          color: inherit !important;
          font-size: 16px !important;
          height: 48px !important;
          padding-left: 58px !important;
          padding-right: 48px !important;
          width: 100% !important;
        }
        
        .react-tel-input .form-control:focus {
          box-shadow: none !important;
          border: none !important;
        }
        
        /* Embedded country dropdown - left-aligned inline element */
        .react-tel-input .flag-dropdown {
          background: transparent !important;
          border: none !important;
          border-radius: 0.5rem 0 0 0.5rem !important;
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          height: 48px !important;
          width: 58px !important;
          z-index: 2 !important;
        }
        
        .react-tel-input .flag-dropdown:hover {
          background: rgba(59, 130, 246, 0.1) !important;
        }
        
        .react-tel-input .flag-dropdown.open {
          background: rgba(59, 130, 246, 0.1) !important;
          z-index: 9999 !important;
        }
        
        .react-tel-input .selected-flag {
          padding: 0 8px !important;
          height: 48px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .react-tel-input .selected-flag:hover {
          background: transparent !important;
        }
        
        /* Fixed boundary management - force upward expansion */
        .react-tel-input .country-list {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 0.75rem !important;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
          max-height: 160px !important;
          overflow-y: auto !important;
          z-index: 9999 !important;
          position: absolute !important;
          bottom: 100% !important;
          top: auto !important;
          left: 0 !important;
          right: 0 !important;
          margin-bottom: 4px !important;
          margin-top: 0 !important;
          width: 100% !important;
          min-width: 250px !important;
        }
        
        .react-tel-input .country-list .country {
          padding: 8px 12px !important;
          font-size: 14px !important;
        }
        
        .react-tel-input .country-list .country:hover {
          background: rgba(59, 130, 246, 0.1) !important;
        }
        
        .react-tel-input .country-list .country.highlight {
          background: rgba(59, 130, 246, 0.2) !important;
        }
        
        /* Dark mode styles */
        .dark .react-tel-input .country-list {
          background: rgba(30, 41, 59, 0.95) !important;
          border: 1px solid rgba(71, 85, 105, 0.3) !important;
          color: white !important;
        }
        
        .dark .react-tel-input .country-list .country {
          color: white !important;
        }
        
        .dark .react-tel-input .country-list .country:hover {
          background: rgba(59, 130, 246, 0.2) !important;
        }
        
        .dark .react-tel-input .country-list .search {
          background: rgba(71, 85, 105, 0.8) !important;
          border: 1px solid rgba(71, 85, 105, 0.3) !important;
          color: white !important;
        }
        
        .dark .react-tel-input .country-list .search::placeholder {
          color: rgba(156, 163, 175, 0.8) !important;
        }
        
        /* Smooth dropdown animation */
        .react-tel-input .flag-dropdown.open .country-list {
          transform-origin: bottom center;
          animation: dropdownSlideUp 0.2s ease-out;
        }
        
        @keyframes dropdownSlideUp {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        /* Ensure dropdown never overlaps CTA button */
        .react-tel-input .country-list {
          max-height: 160px !important;
          overflow-y: auto !important;
        }
        
        /* Mobile compatibility */
        @media (max-width: 768px) {
          .react-tel-input .country-list {
            max-height: 140px !important;
          }
        }
        
        /* Ensure consistent spacing below input field */
        .phone-input-container + .h-6 {
          height: 1.5rem !important;
          flex-shrink: 0 !important;
        }
        
        /* Prevent dropdown from affecting layout */
        .react-tel-input .flag-dropdown.open {
          position: relative !important;
        }
        
        .react-tel-input .flag-dropdown.open .country-list {
          position: absolute !important;
          bottom: 100% !important;
          top: auto !important;
          margin-bottom: 4px !important;
          margin-top: 0 !important;
        }
        
        /* Scrollbar styling for dropdown */
        .react-tel-input .country-list::-webkit-scrollbar {
          width: 6px;
        }
        
        .react-tel-input .country-list::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        
        .react-tel-input .country-list::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        
        .react-tel-input .country-list::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default EnterpriseTeamModal;