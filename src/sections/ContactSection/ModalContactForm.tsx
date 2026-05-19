import React, { useState, useEffect, useRef } from 'react';
import Button from '../../components/Button';
import { Send, CheckCircle, ChevronDown, X } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

interface ModalContactFormProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  preSelectedService?: string;
  hideServiceField?: boolean;
  formType?: 'callback' | 'email' | 'general';
}

// Unified webhook URL
const WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

const ModalContactForm: React.FC<ModalContactFormProps> = ({
  isModalOpen,
  onCloseModal,
  preSelectedService = '',
  hideServiceField = false,
  formType = 'general',
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    service: preSelectedService,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Refs for autofocus
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  // Update service when preSelectedService changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      service: preSelectedService,
    }));
  }, [preSelectedService]);

  // Global scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scroll is restored when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Auto-select service and autofocus based on formType
  useEffect(() => {
    if (isModalOpen && formType !== 'general') {
      // Auto-select service based on formType
      if (formType === 'callback') {
        setFormData(prev => ({
          ...prev,
          service: 'Customer Support AI', // Default service for callback
        }));
        // Autofocus phone field for callback
        setTimeout(() => {
          phoneInputRef.current?.focus();
        }, 100);
      } else if (formType === 'email') {
        setFormData(prev => ({
          ...prev,
          service: 'Customer Support AI', // Default service for email
        }));
        // Autofocus email field for email
        setTimeout(() => {
          emailInputRef.current?.focus();
        }, 100);
      }
    }
  }, [isModalOpen, formType]);

  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'Customer Support AI', label: 'Customer Support AI' },
    { value: 'Smart Scheduling', label: 'Smart Scheduling' },
    { value: 'Lead Capture + CRM', label: 'Lead Capture + CRM' },
    { value: 'Website Builder', label: 'Website Builder' },
    { value: 'AI Phone Caller', label: 'AI Phone Caller' },
    { value: 'Custom AI Bot', label: 'Custom AI Bot' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear any previous errors when user starts typing
    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: formType === 'general' ? 'modal-contact' : formType,
          source: `AutoPilotAI Modal Contact Form - ${formType}`,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: formData.service,
          preSelectedService: preSelectedService,
          hideServiceField: hideServiceField,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Modal contact form submitted successfully');
      setIsSubmitted(true);
      
      // Reset form after 10 seconds and close modal
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
          service: '',
        });
        onCloseModal();
      }, 10000);

    } catch (error) {
      console.error('Modal contact form submission error:', error);
      setSubmitError('There was an error submitting your form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onCloseModal();
    // Reset form state when closing modal
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
      service: '',
    });
  };

  // Get modal title based on formType
  const getModalTitle = () => {
    switch (formType) {
      case 'callback':
        return 'Request a Callback';
      case 'email':
        return 'Send Us an Email';
      default:
        return 'Send Us a Message';
    }
  };

  // Get default message based on formType
  const getDefaultMessage = () => {
    switch (formType) {
      case 'callback':
        return 'I would like to schedule a callback to discuss AI automation solutions for my business.';
      case 'email':
        return 'I have questions about your AI automation services and would like more information.';
      default:
        return '';
    }
  };

  // Set default message when formType changes
  useEffect(() => {
    if (isModalOpen && formType !== 'general' && !formData.message) {
      setFormData(prev => ({
        ...prev,
        message: getDefaultMessage(),
      }));
    }
  }, [isModalOpen, formType]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="glass-card rounded-2xl p-8 relative">
          {/* Hidden input for formType */}
          <input type="hidden" name="formType" value={formType} />
          
          {/* Fixed close button position - inside modal container */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 z-10"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pr-12">{getModalTitle()}</h3>
          
          {isSubmitted ? (
            <div className="glass-light rounded-xl p-6 text-center animate-slide-up">
              <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold gradient-text mb-3">🎉 Thank You!</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {formType === 'callback' && "We've received your callback request."}
                {formType === 'email' && "We've received your email inquiry."}
                {formType === 'general' && `We've received your request for ${formData.service}.`}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {formType === 'callback' && "Our team will call you within 24 hours to discuss your AI automation needs."}
                {formType === 'email' && "We'll respond to your email within 24 hours with detailed information."}
                {formType === 'general' && "You're one step away from transforming your business with cutting-edge AI automation. Our team will connect with you shortly to help you get started with smarter, faster operations."}
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium">Message sent successfully</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName-modal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName-modal"
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
                <label htmlFor="email-modal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  ref={emailInputRef}
                  type="email"
                  id="email-modal"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="phone-modal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number {formType === 'callback' ? '*' : ''}
                </label>
                <input
                  ref={phoneInputRef}
                  type="tel"
                  id="phone-modal"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required={formType === 'callback'}
                  autoComplete="tel"
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder={formType === 'callback' ? 'Enter your phone number (required for callback)' : 'Enter your phone number'}
                />
              </div>

              {!hideServiceField && (
                <div>
                  <label htmlFor="service-modal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service of Interest *
                  </label>
                  <div className="relative">
                    <select
                      id="service-modal"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.value} value={option.value} disabled={option.value === ''}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>
              )}

              {hideServiceField && preSelectedService && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Service of Interest
                  </label>
                  <div className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">{preSelectedService}</span>
                  </div>
                </div>
              )}
              
              <div>
                <label htmlFor="message-modal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message-modal"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder={
                    formType === 'callback' 
                      ? 'Tell us about your business and the best time to call you...'
                      : formType === 'email'
                      ? 'What questions do you have about our AI automation services?'
                      : 'Tell us about your project and how we can help...'
                  }
                />
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
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    {formType === 'callback' ? 'Request Callback' : formType === 'email' ? 'Send Email' : 'Send Message'}
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                * Required fields. We'll never share your information with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContactForm;