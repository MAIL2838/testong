import React, { useState } from 'react';
import { useEffect } from 'react';
import { isValidPhoneNumber, parsePhoneNumber, AsYouType } from 'libphonenumber-js';
import Container from '../components/Container';
import Button from '../components/Button';
import EnterpriseTeamModal from '../components/EnterpriseTeamModal';
import { Check, Zap, Crown, Rocket, ChevronDown, ChevronUp, Info, X, AlertCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface PlanAddOns {
  [key: string]: boolean;
}

interface PricingPlanProps {
  title: string;
  basePrice: number;
  description: string;
  includedServices: Service[];
  additionalFeatures: string[];
  excludedAddOnIds?: string[]; // New prop to exclude specific add-ons
  isPopular?: boolean;
  icon: React.ReactNode;
  delay: number;
  isAnnual: boolean;
  planId: string;
  addOns: AddOn[];
  selectedAddOns: PlanAddOns;
  onAddOnToggle: (planId: string, addOnId: string) => void;
  onGetStarted: (planId: string, planTitle: string, includedServices: Service[], selectedAddOns: AddOn[]) => void;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  title,
  basePrice,
  description,
  includedServices,
  additionalFeatures,
  excludedAddOnIds = [],
  isPopular = false,
  icon,
  delay,
  isAnnual,
  planId,
  addOns,
  selectedAddOns,
  onAddOnToggle,
  onGetStarted,
}) => {
  const [showAddOns, setShowAddOns] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const calculateTotalPrice = () => {
    const addOnTotal = addOns.reduce((total, addOn) => {
      return total + (selectedAddOns[`${planId}-${addOn.id}`] ? addOn.price : 0);
    }, 0);
    
    const totalMonthly = basePrice + addOnTotal;
    return isAnnual ? Math.round(totalMonthly * 0.8) : totalMonthly;
  };

  const getAddOnPrice = (price: number) => {
    return isAnnual ? Math.round(price * 0.8) : price;
  };

  const getSelectedAddOns = () => {
    return addOns.filter(addOn => selectedAddOns[`${planId}-${addOn.id}`]);
  };

  const getAvailableAddOns = () => {
    const includedServiceIds = includedServices.map(service => service.id);
    return addOns.filter(addOn => 
      !includedServiceIds.includes(addOn.id) && 
      !excludedAddOnIds.includes(addOn.id)
    );
  };

  const handleGetStarted = () => {
    const selectedAddOnsList = getSelectedAddOns();
    onGetStarted(planId, title, includedServices, selectedAddOnsList);
  };

  const removeAddOn = (addOnId: string) => {
    onAddOnToggle(planId, addOnId);
  };

  return (
    <div 
      className={`glass-card rounded-2xl p-8 h-full flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:hover:shadow-slate-900/50 group animate-slide-up delay-${delay} ${
        isPopular ? 'ring-2 ring-blue-500 pastel-glow' : ''
      }`}
    >
      {isPopular && (
        <div className="mb-6 py-2 px-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold w-fit mx-auto pastel-glow">
          Most Popular
        </div>
      )}
      
      <div className="text-center mb-6">
        <div className="p-4 glass-light rounded-xl text-blue-600 dark:text-blue-400 mb-4 w-fit mx-auto group-hover:animate-pulse group-hover:pastel-glow">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <div className="mb-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-white">${calculateTotalPrice()}</span>
          <span className="text-gray-600 dark:text-gray-400 ml-1">/month</span>
          {isAnnual && (
            <div className="text-sm text-green-600 dark:text-green-400 font-medium mt-1">
              Save 20% annually
            </div>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      {/* All buttons now use gradient variant */}
      <Button 
        variant="gradient" 
        className="w-full mb-6"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
      
      {/* Included Services */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Included AI Services</h4>
        <div className="space-y-3">
          {includedServices.map((service) => (
            <div key={service.id} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-gray-900 dark:text-white font-medium">{service.name}</span>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Features */}
      {additionalFeatures.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Features</h4>
          <div className="space-y-3">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Add-ons Display */}
      {getSelectedAddOns().length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Added Services</h4>
          <div className="flex flex-wrap gap-2">
            {getSelectedAddOns().map((addOn) => (
              <div key={addOn.id} className="flex items-center bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                <span className="mr-2">{addOn.name}</span>
                <button
                  onClick={() => removeAddOn(addOn.id)}
                  className="text-blue-600 dark:text-blue-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add More Features Section */}
      {getAvailableAddOns().length > 0 && (
        <div className="mt-auto">
          <button
            onClick={() => setShowAddOns(!showAddOns)}
            className="w-full flex items-center justify-between p-3 glass-light rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 mb-4"
          >
            <span className="font-medium">Add More Services</span>
            {showAddOns ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>

          {showAddOns && (
            <div className="space-y-3 animate-slide-up">
              {getAvailableAddOns().map((addOn) => (
                <div key={addOn.id} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center flex-1">
                    <input
                      type="checkbox"
                      id={`${planId}-${addOn.id}`}
                      checked={selectedAddOns[`${planId}-${addOn.id}`] || false}
                      onChange={() => onAddOnToggle(planId, addOn.id)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label 
                      htmlFor={`${planId}-${addOn.id}`}
                      className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
                    >
                      {addOn.name}
                    </label>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setTooltipVisible(addOn.id)}
                        onMouseLeave={() => setTooltipVisible(null)}
                        className="p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Info size={14} />
                      </button>
                      {tooltipVisible === addOn.id && (
                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded-lg shadow-lg z-10 animate-scale-in">
                          {addOn.description}
                          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white ml-3">
                    +${getAddOnPrice(addOn.price)}/mo
                  </span>
                </div>
              ))}
              
              {/* Total Cost Summary */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border-2 border-blue-200 dark:border-blue-700">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Monthly Cost:</span>
                  <span className="text-2xl font-bold gradient-text">
                    ${calculateTotalPrice()}
                  </span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-green-600 dark:text-green-400 mt-1 text-right">
                    Annual savings: ${Math.round((basePrice + addOns.reduce((total, addOn) => {
                      return total + (selectedAddOns[`${planId}-${addOn.id}`] ? addOn.price : 0);
                    }, 0)) * 12 * 0.2)}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Pricing Form Modal Component
interface PricingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  planTitle: string;
  includedServices: Service[];
  selectedAddOns: AddOn[];
  billingCycle: 'Monthly' | 'Annually';
  selectedPrice: number;
}

const PricingFormModal: React.FC<PricingFormModalProps> = ({
  isOpen,
  onClose,
  planTitle,
  includedServices,
  selectedAddOns,
  billingCycle,
  selectedPrice,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Global scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Unified webhook URL
  const WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

  const allServices = [...includedServices, ...selectedAddOns];
  const servicesString = allServices.map(service => service.name).join(', ');

  // Determine planType from planTitle
  const getPlanType = (title: string): 'Basic' | 'Pro' | 'Enterprise' => {
    if (title.includes('Basic')) return 'Basic';
    if (title.includes('Pro')) return 'Pro';
    if (title.includes('Enterprise')) return 'Enterprise';
    return 'Basic'; // fallback
  };

  // Phone number validation and formatting
  const validatePhoneNumber = (phoneNumber: string): boolean => {
    if (!phoneNumber || phoneNumber.length < 8) return false;
    
    try {
      // Try to parse with default country (IN first, then US as fallback)
      let isValid = isValidPhoneNumber(phoneNumber, 'IN');
      if (!isValid) {
        isValid = isValidPhoneNumber(phoneNumber, 'US');
      }
      if (!isValid) {
        // Try without country code as fallback
        isValid = isValidPhoneNumber(phoneNumber);
      }
      return isValid;
    } catch (error) {
      return false;
    }
  };

  const formatPhoneNumber = (phoneNumber: string): string => {
    try {
      // Try to format with default country (IN first, then US as fallback)
      let formatter = new AsYouType('IN');
      let formatted = formatter.input(phoneNumber);
      
      // If it doesn't look like an Indian number, try US formatting
      if (!phoneNumber.startsWith('+91') && !phoneNumber.startsWith('91') && phoneNumber.length === 10) {
        formatter = new AsYouType('US');
        formatted = formatter.input(phoneNumber);
      }
      
      return formatted;
    } catch (error) {
      return phoneNumber;
    }
  };

  const handlePhoneChange = (value: string) => {
    // Auto-format as user types
    const formatted = formatPhoneNumber(value);
    setPhone(formatted);
    
    // Clear previous errors
    setPhoneError(null);
    
    // Validate if there's enough input
    if (value.length > 3) {
      const isValid = validatePhoneNumber(value);
      setIsPhoneValid(isValid);
      
      if (!isValid && value.length > 8) {
        setPhoneError('Please enter a valid phone number');
      }
    } else {
      setIsPhoneValid(false);
    }
  };

  const handlePhoneBlur = () => {
    if (phone) {
      const isValid = validatePhoneNumber(phone);
      setIsPhoneValid(isValid);
      
      if (!isValid) {
        setPhoneError('Please enter a valid phone number');
      } else {
        setPhoneError(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate phone number before submission
    if (!phone.trim()) {
      setPhoneError('Phone number is required');
      return;
    }
    
    const isValid = validatePhoneNumber(phone);
    if (!isValid) {
      setPhoneError('Please enter a valid phone number');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    setPhoneError(null);

    try {
      // Format phone number to E.164 for submission
      let formattedPhone = phone;
      try {
        const parsed = parsePhoneNumber(phone, 'IN');
        if (parsed && parsed.isValid()) {
          formattedPhone = parsed.format('E.164');
        } else {
          // Try US as fallback
          const parsedUS = parsePhoneNumber(phone, 'US');
          if (parsedUS && parsedUS.isValid()) {
            formattedPhone = parsedUS.format('E.164');
          }
        }
      } catch (error) {
        // Keep original format if parsing fails
        formattedPhone = phone;
      }

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'pricing',
          source: 'AutoPilotAI Pricing Form',
          plan: planTitle,
          planType: getPlanType(planTitle),
          billingCycle: billingCycle,
          selectedPrice: selectedPrice,
          includedServices: includedServices.map(service => service.name),
          selectedAddOns: selectedAddOns.map(addOn => addOn.name),
          allServices: allServices.map(service => service.name),
          email: email,
          phone: formattedPhone,
          rawPhone: phone, // Keep original input for reference
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Pricing form submitted successfully');
      setIsSubmitted(true);
      
      // Reset form after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
        setPhone('');
        setPhoneError(null);
        setIsPhoneValid(false);
        onClose();
      }, 10000);

    } catch (error) {
      console.error('Pricing form submission error:', error);
      setSubmitError('There was an error submitting your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setEmail('');
    setPhone('');
    setPhoneError(null);
    setIsPhoneValid(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get Started with {planTitle}</h2>
          <button
            onClick={handleClose}
            className="p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="glass-light rounded-xl p-6 text-center animate-slide-up">
              <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Check size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold gradient-text mb-3">🎉 Request Submitted!</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Thank you for choosing the <span className="font-semibold text-blue-600 dark:text-blue-400">{planTitle}</span> plan.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Our team will contact you shortly to get you started with your AI automation journey.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Plan Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Selected Plan
                </label>
                <div className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700">
                  <span className="font-semibold text-blue-700 dark:text-blue-300">{planTitle}</span>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({billingCycle})</span>
                </div>
              </div>

              {/* Billing Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Billing Details
                </label>
                <div className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-700">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-700 dark:text-green-300">
                      {billingCycle} Billing - ${selectedPrice}/month
                    </span>
                    {billingCycle === 'Annually' && (
                      <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/50 px-2 py-1 rounded-full">
                        Save 20%
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Services Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Included Services
                </label>
                <div className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white bg-green-50 dark:bg-green-900/30 border-2 border-green-200 dark:border-green-700">
                  <span className="font-medium text-green-700 dark:text-green-300">{servicesString}</span>
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="pricing-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="pricing-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label htmlFor="pricing-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                  {isPhoneValid && (
                    <span className="ml-2 text-green-600 dark:text-green-400 text-xs">
                      ✓ Valid
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="pricing-phone"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={handlePhoneBlur}
                    required
                    autoComplete="tel"
                    className={`w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      phoneError 
                        ? 'focus:ring-red-500 border-red-300 dark:border-red-600' 
                        : isPhoneValid
                        ? 'focus:ring-green-500 border-green-300 dark:border-green-600'
                        : 'focus:ring-blue-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  
                  {/* Validation indicator */}
                  {phone && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {isPhoneValid ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : phoneError ? (
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      ) : null}
                    </div>
                  )}
                </div>
                
                {/* Error Message */}
                {phoneError && (
                  <div className="mt-2 flex items-center space-x-2 text-red-600 dark:text-red-400 animate-slide-up">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <p className="text-sm">{phoneError}</p>
                  </div>
                )}
              </div>

              {submitError && (
                <div className="glass-light rounded-xl p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30">
                  <p className="text-red-700 dark:text-red-300 text-sm">{submitError}</p>
                </div>
              )}

              <Button 
                type="submit" 
                variant="gradient" 
                className="w-full" 
                disabled={isSubmitting || !!phoneError || (phone && !isPhoneValid)}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Get Started with ${planTitle}`
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                * Required field. We'll contact you within 24 hours to set up your account.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

interface PricingSectionProps {
  onCTAClick: (serviceName?: string) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onCTAClick }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedAddOns, setSelectedAddOns] = useState<{ [key: string]: boolean }>({});
  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    planTitle: string;
    includedServices: Service[];
    selectedAddOns: AddOn[];
    billingCycle: 'Monthly' | 'Annually';
    selectedPrice: number;
  }>({
    isOpen: false,
    planTitle: '',
    includedServices: [],
    selectedAddOns: [],
    billingCycle: 'Monthly',
    selectedPrice: 0,
  });

  // Enterprise Team Modal State
  const [isEnterpriseModalOpen, setIsEnterpriseModalOpen] = useState(false);

  // Define all services
  const allServices: Service[] = [
    {
      id: 'website-builder',
      name: 'AI Website Builder',
      description: 'Create stunning websites in minutes with AI-powered design'
    },
    {
      id: 'scheduling',
      name: 'Smart Scheduling',
      description: 'Automated appointment booking with calendar sync'
    },
    {
      id: 'lead-capture',
      name: 'Lead Capture & CRM',
      description: 'Capture and nurture leads with intelligent workflows'
    },
    {
      id: 'customer-support',
      name: 'AI Customer Support',
      description: '24/7 intelligent customer service automation'
    },
    {
      id: 'voice-agents',
      name: 'AI Voice Agents',
      description: 'Human-like AI callers for appointments and follow-ups'
    },
    {
      id: 'custom-ai-bot',
      name: 'Custom AI Bot',
      description: 'Tailored AI solutions for your specific business needs'
    }
  ];

  // Define add-ons (services that can be added to plans)
  const addOns: AddOn[] = [
    {
      id: 'website-builder',
      name: 'AI Website Builder',
      price: 29,
      description: 'Create stunning, conversion-optimized websites in minutes with our AI-powered design engine.'
    },
    {
      id: 'customer-support',
      name: 'AI Customer Support',
      price: 49,
      description: '24/7 intelligent customer service automation with smart ticket routing and multi-language support.'
    },
    {
      id: 'voice-agents',
      name: 'AI Voice Agents',
      price: 99,
      description: 'Deploy human-like AI voice agents that handle calls, appointments, and customer inquiries with natural conversation flow.'
    },
    {
      id: 'custom-ai-bot',
      name: 'Custom AI Bot',
      price: 149,
      description: 'Get custom-built AI bots tailored to your business needs, workflows, and platforms.'
    },
    {
      id: 'advanced-analytics',
      name: 'Advanced Analytics & Insights',
      price: 49,
      description: 'Comprehensive analytics dashboard with detailed performance metrics and predictive analytics.'
    },
    {
      id: 'multi-language',
      name: 'Multi-language Support',
      price: 29,
      description: 'Support for 50+ languages with native-level AI responses and cultural context awareness.'
    }
  ];
  
  const plans = [
    {
      id: 'basic',
      title: 'Basic',
      basePrice: 49,
      description: 'Perfect for small businesses starting their AI journey',
      icon: <Zap size={32} />,
      includedServices: [
        allServices.find(s => s.id === 'customer-support')!, // Replaced website-builder with customer-support
        allServices.find(s => s.id === 'scheduling')!,
        allServices.find(s => s.id === 'lead-capture')!,
      ],
      additionalFeatures: [
        'Up to 1,000 interactions/month',
        'Basic analytics dashboard',
        'Email support',
        '99.5% uptime SLA',
        'Standard integrations',
      ],
      excludedAddOnIds: [], // Basic plan can add any available add-ons
    },
    {
      id: 'pro',
      title: 'Pro',
      basePrice: 149,
      description: 'Ideal for growing businesses ready to scale',
      icon: <Rocket size={32} />,
      includedServices: [
        allServices.find(s => s.id === 'website-builder')!,
        allServices.find(s => s.id === 'scheduling')!,
        allServices.find(s => s.id === 'lead-capture')!,
        allServices.find(s => s.id === 'customer-support')!,
        allServices.find(s => s.id === 'voice-agents')!,
      ],
      additionalFeatures: [
        'Up to 10,000 interactions/month',
        'Advanced analytics & insights',
        'Priority support',
        'Custom integrations',
        'A/B testing capabilities',
        'Multi-language support',
      ],
      // Exclude add-ons that are already included as features
      excludedAddOnIds: ['advanced-analytics', 'multi-language'],
      isPopular: true,
    },
    {
      id: 'enterprise',
      title: 'Enterprise',
      basePrice: 399,
      description: 'For large organizations with complex needs',
      icon: <Crown size={32} />,
      includedServices: [
        allServices.find(s => s.id === 'website-builder')!,
        allServices.find(s => s.id === 'scheduling')!,
        allServices.find(s => s.id === 'lead-capture')!,
        allServices.find(s => s.id === 'customer-support')!,
        allServices.find(s => s.id === 'voice-agents')!,
        allServices.find(s => s.id === 'custom-ai-bot')!,
      ],
      additionalFeatures: [
        'Unlimited interactions',
        'Dedicated account manager',
        'Custom AI model training',
        '24/7 phone support',
        'Custom SLA agreements',
        'White-label options',
        'Advanced security features',
        'Multi-language',
      ],
      // Enterprise includes everything, so exclude all add-ons
      excludedAddOnIds: ['advanced-analytics', 'multi-language'],
    },
  ];

  const handleAddOnToggle = (planId: string, addOnId: string) => {
    const key = `${planId}-${addOnId}`;
    setSelectedAddOns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleGetStarted = (planId: string, planTitle: string, includedServices: Service[], selectedAddOnsList: AddOn[]) => {
    // Calculate the selected price based on current billing cycle and add-ons
    const plan = plans.find(p => p.id === planId);
    if (!plan) return;
    
    const addOnTotal = selectedAddOnsList.reduce((total, addOn) => total + addOn.price, 0);
    const totalMonthly = plan.basePrice + addOnTotal;
    const selectedPrice = isAnnual ? Math.round(totalMonthly * 0.8) : totalMonthly;
    
    setFormModal({
      isOpen: true,
      planTitle,
      includedServices,
      selectedAddOns: selectedAddOnsList,
      billingCycle: isAnnual ? 'Annually' : 'Monthly',
      selectedPrice,
    });
  };

  const closeFormModal = () => {
    setFormModal({
      isOpen: false,
      planTitle: '',
      includedServices: [],
      selectedAddOns: [],
      billingCycle: 'Monthly',
      selectedPrice: 0,
    });
  };

  const handleEnterpriseTeamClick = () => {
    setIsEnterpriseModalOpen(true);
  };

  const closeEnterpriseModal = () => {
    setIsEnterpriseModalOpen(false);
  };

  return (
    <>
      <section id="pricing" className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pastel-purple/20 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pastel-blue/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
              Simple, Transparent{' '}
              <span className="gradient-text">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed animate-slide-up delay-200">
              Choose the perfect plan to accelerate your business growth
            </p>
            
            <div className="flex items-center justify-center mb-8 animate-slide-up delay-300">
              <div className="glass-card p-1 rounded-full flex items-center">
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    isAnnual 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white pastel-glow' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Annual
                  {isAnnual && <span className="ml-2 text-xs text-green-300">Save 20%</span>}
                </button>
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isAnnual 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white pastel-glow' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <PricingPlan
                key={plan.id}
                title={plan.title}
                basePrice={plan.basePrice}
                description={plan.description}
                includedServices={plan.includedServices}
                additionalFeatures={plan.additionalFeatures}
                excludedAddOnIds={plan.excludedAddOnIds}
                isPopular={plan.isPopular}
                icon={plan.icon}
                delay={index * 200}
                isAnnual={isAnnual}
                planId={plan.id}
                addOns={addOns}
                selectedAddOns={selectedAddOns}
                onAddOnToggle={handleAddOnToggle}
                onGetStarted={handleGetStarted}
              />
            ))}
          </div>
          
          <div className="mt-16 text-center animate-slide-up delay-500">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Have complex requirements?{' '}
              <button 
                onClick={handleEnterpriseTeamClick}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 underline"
              >
                Our team
              </button>{' '}
              can build a custom AI stack for you.
            </p>
            <p className="text-sm text-gray-500 text-center mt-4">
              ⚠️ Final pricing depends on your specific project needs. Contact us for a tailored quote.
            </p>
          </div>
        </Container>
      </section>

      {/* Pricing Form Modal */}
      <PricingFormModal
        isOpen={formModal.isOpen}
        onClose={closeFormModal}
        planTitle={formModal.planTitle}
        includedServices={formModal.includedServices}
        selectedAddOns={formModal.selectedAddOns}
        billingCycle={formModal.billingCycle}
        selectedPrice={formModal.selectedPrice}
      />

      {/* Enterprise Team Modal */}
      <EnterpriseTeamModal
        isOpen={isEnterpriseModalOpen}
        onClose={closeEnterpriseModal}
      />
    </>
  );
};

export default PricingSection;