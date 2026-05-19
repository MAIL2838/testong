import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from './Container';
import Button from './Button';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';
import { Send, CheckCircle, ChevronDown, X, Users, Phone, Globe, AlertCircle, Info, Mail, Twitter, Instagram, ArrowRight, Download, ExternalLink, ChevronUp, Upload, Link as LinkIcon } from 'lucide-react';

const mockAPI = {
  careers: async () => [
    { "title": "Frontend Developer", "location": "Remote", "type": "Full-time" },
    { "title": "AI Workflow Engineer", "location": "Remote", "type": "Full-time" },
    { "title": "Voice Automation Specialist", "location": "Remote", "type": "Part-time" }
  ],
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Job Application Modal Component
interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobLocation: string;
  jobType: string;
}

interface ApplicationFormData {
  fullName: string;
  email: string;
  linkedinPortfolio: string;
  resumeType: 'file' | 'url';
  resumeFile: File | null;
  resumeUrl: string;
  message: string;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  isOpen,
  onClose,
  jobTitle,
  jobLocation,
  jobType,
}) => {
  const [formData, setFormData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    linkedinPortfolio: '',
    resumeType: 'url',
    resumeFile: null,
    resumeUrl: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Unified webhook URL
  const WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prevData => ({
      ...prevData,
      resumeFile: file,
    }));
  };

  const handleResumeTypeChange = (type: 'file' | 'url') => {
    setFormData(prevData => ({
      ...prevData,
      resumeType: type,
      resumeFile: null,
      resumeUrl: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare form data for submission
      const submissionData = {
        formType: 'job-application',
        source: 'AutoPilotAI Job Application Form',
        jobTitle: jobTitle,
        jobLocation: jobLocation,
        jobType: jobType,
        fullName: formData.fullName,
        email: formData.email,
        linkedinPortfolio: formData.linkedinPortfolio,
        resumeType: formData.resumeType,
        resumeUrl: formData.resumeType === 'url' ? formData.resumeUrl : '',
        resumeFileName: formData.resumeType === 'file' && formData.resumeFile ? formData.resumeFile.name : '',
        message: formData.message,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Job application submitted successfully');
      setIsSubmitted(true);
      
      // Auto-close modal after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          linkedinPortfolio: '',
          resumeType: 'url',
          resumeFile: null,
          resumeUrl: '',
          message: '',
        });
        onClose();
      }, 10000);

    } catch (error) {
      console.error('Job application submission error:', error);
      setSubmitError('There was an error submitting your application. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    // Reset form state when closing modal
    setIsSubmitted(false);
    setSubmitError(null);
    setFormData({
      fullName: '',
      email: '',
      linkedinPortfolio: '',
      resumeType: 'url',
      resumeFile: null,
      resumeUrl: '',
      message: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="glass-card rounded-2xl p-8 relative">
          {/* Fixed close button position - inside modal container */}
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 z-10"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 pr-12">Apply for Position</h3>
          <div className="mb-6 p-4 glass-light rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white">{jobTitle}</h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{jobLocation} • {jobType}</p>
          </div>
          
          {isSubmitted ? (
            <div className="glass-light rounded-xl p-6 text-center animate-slide-up">
              <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold gradient-text mb-3">🎉 Application Submitted!</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                Thank you for applying for the <span className="font-semibold text-blue-600 dark:text-blue-400">{jobTitle}</span> position.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Our HR team will review your application and get back to you within 5 business days.
                We're excited to learn more about you!
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium">Application received successfully</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName-job" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName-job"
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
                <label htmlFor="email-job" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email-job"
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
                <label htmlFor="linkedinPortfolio-job" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn Profile / Portfolio URL
                </label>
                <input
                  type="url"
                  id="linkedinPortfolio-job"
                  name="linkedinPortfolio"
                  value={formData.linkedinPortfolio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="https://linkedin.com/in/yourprofile or portfolio URL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Resume *
                </label>
                
                {/* Resume Type Toggle */}
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() => handleResumeTypeChange('url')}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      formData.resumeType === 'url'
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-2 border-blue-300 dark:border-blue-600'
                        : 'glass-light text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    URL Link
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResumeTypeChange('file')}
                    className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                      formData.resumeType === 'file'
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-2 border-blue-300 dark:border-blue-600'
                        : 'glass-light text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload File
                  </button>
                </div>

                {formData.resumeType === 'url' ? (
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    placeholder="https://drive.google.com/... or resume URL"
                  />
                ) : (
                  <div className="relative">
                    <input
                      type="file"
                      id="resumeFile-job"
                      onChange={handleFileChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 text-center">
                      <Upload className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-500 mb-2" />
                      {formData.resumeFile ? (
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{formData.resumeFile.name}</span>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-400">Click to upload resume (PDF, DOC, DOCX)</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="message-job" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter / Message *
                </label>
                <textarea
                  id="message-job"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
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
                    Submitting Application...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    Submit Application
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                * Required fields. We'll review your application and respond within 5 business days.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Newsletter Subscription Component
interface NewsletterSubscriptionProps {
  className?: string;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    type: 'success' | 'error';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });

  // Newsletter webhook URL - Updated to unified webhook
  const NEWSLETTER_WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim()) && email.trim().length > 0;
  };

  // Show toast notification
  const showToastNotification = (type: 'success' | 'error', message: string) => {
    setShowToast({ show: true, type, message });
    
    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      setShowToast({ show: false, type: 'success', message: '' });
    }, 5000);
  };

  const handleSubscribe = async () => {
    // Validate email
    if (!validateEmail(email)) {
      showToastNotification('error', 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(NEWSLETTER_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'newsletter-subscription',
          source: 'AutoPilotAI Newsletter Subscription',
          email: email.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Newsletter subscription successful');
      showToastNotification('success', "You're now subscribed to our AI updates!");
      setEmail(''); // Clear the input field

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      showToastNotification('error', 'There was an issue subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          disabled={isSubmitting}
        />
        <Button 
          variant="gradient" 
          onClick={handleSubscribe}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Subscribing...
            </span>
          ) : (
            <>
              Subscribe
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {/* Toast Notification */}
      {showToast.show && (
        <div className={`fixed top-4 right-4 z-50 animate-slide-up ${
          showToast.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        } px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`}>
          {showToast.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <X size={20} />
          )}
          <span className="font-medium">{showToast.message}</span>
          <button
            onClick={() => setShowToast({ show: false, type: 'success', message: '' })}
            className="ml-2 text-white hover:text-gray-200 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

// Contact Form Modal Component
interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal: React.FC<ContactFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Unified webhook URL
  const WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

  const serviceOptions = [
    { value: '', label: 'Select a service...' },
    { value: 'Customer Support AI', label: 'Customer Support AI' },
    { value: 'Smart Scheduling', label: 'Smart Scheduling' },
    { value: 'Lead Capture + CRM', label: 'Lead Capture + CRM' },
    { value: 'Website Builder', label: 'Website Builder' },
    { value: 'AI Phone Caller', label: 'AI Phone Caller' },
    { value: 'Custom AI Bot', label: 'Custom AI Bot' },
  ];

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    
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
          formType: 'blog-cta-contact',
          source: 'AutoPilotAI Blog CTA Contact Form',
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: formData.service,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Blog CTA contact form submitted successfully');
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
        onClose();
      }, 10000);

    } catch (error) {
      console.error('Blog CTA contact form submission error:', error);
      setSubmitError('There was an error submitting your form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="glass-card rounded-2xl p-8 relative">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300 z-10"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pr-12">Get Started with AI Automation</h3>
          
          {isSubmitted ? (
            <div className="glass-light rounded-xl p-6 text-center animate-slide-up">
              <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-bold gradient-text mb-3">🎉 Thank You!</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                We've received your request for <span className="font-semibold text-blue-600 dark:text-blue-400">{formData.service || 'AI automation'}</span>.
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Our team will connect with you within 24 hours to discuss how AutoPilotAI can transform your business operations.
              </p>
              <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                <span className="text-sm font-medium">Request submitted successfully</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName-blog-cta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName-blog-cta"
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
                <label htmlFor="email-blog-cta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email-blog-cta"
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
                <label htmlFor="phone-blog-cta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone-blog-cta"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="service-blog-cta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service of Interest
                </label>
                <div className="relative">
                  <select
                    id="service-blog-cta"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
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
              
              <div>
                <label htmlFor="message-blog-cta" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message-blog-cta"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                  placeholder="Tell us about your business and how we can help with AI automation..."
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
                    Get Started Now
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

const serviceDescriptions = {
  'Customer Support AI': { description: 'Intelligent AI agents for 24/7 support', lastUpdated: '2025-07-01' },
  'Smart Scheduling': { description: 'Automated appointment scheduling and management', lastUpdated: '2025-06-28' },
  'Lead Capture': { description: 'Convert more visitors into qualified leads', lastUpdated: '2025-07-05' },
  'Website Builder': { description: 'Create AI-powered websites in minutes', lastUpdated: '2025-06-25' },
  'AI Voice Agents': { description: 'Intelligent phone agents for outbound/inbound calls', lastUpdated: '2025-07-10' },
  'Custom AI Bot': { description: 'Tailored AI solutions for your unique needs', lastUpdated: '2025-07-08' },
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [contactFormOpen, setContactFormOpen] = useState(false);

  // Job Application Modal State
  const [jobApplicationModal, setJobApplicationModal] = useState<{
    isOpen: boolean;
    jobTitle: string;
    jobLocation: string;
    jobType: string;
  }>({
    isOpen: false,
    jobTitle: '',
    jobLocation: '',
    jobType: '',
  });

  const openModal = (modalType: string) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setExpandedHelp(null);
  };

  const handleCareers = async () => {
    setLoading(true);
    try {
      const data = await mockAPI.careers();
      setCareers(data);
      openModal('careers');
    } catch (error) {
      console.error('Failed to fetch careers:', error);
    } finally {
      setLoading(false);
    }
  };



  // Handle job application
  const handleApplyNow = (job: any) => {
    setJobApplicationModal({
      isOpen: true,
      jobTitle: job.title,
      jobLocation: job.location,
      jobType: job.type,
    });
    // Close the careers modal
    setActiveModal(null);
  };

  const closeJobApplicationModal = () => {
    setJobApplicationModal({
      isOpen: false,
      jobTitle: '',
      jobLocation: '',
      jobType: '',
    });
  };

  const handleOpenContactFromBlog = () => {
    setContactFormOpen(true);
  };

  return (
    <>
      <footer className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-pastel-blue/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pastel-purple/20 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          {/* Newsletter Section */}
          <div className="glass-card rounded-2xl p-8 mb-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Updated with{' '}
              <span className="gradient-text">
                AI Innovations
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest insights on AI automation, industry trends, and exclusive updates delivered to your inbox.
            </p>
            <NewsletterSubscription />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                AutoPilotAI
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Revolutionizing business operations with cutting-edge AI automation solutions that scale with your growth.
              </p>
              <div className="flex space-x-4">
                <a href="https://x.com/AutopilotAiHQ" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110" aria-label="Follow us on Twitter">
                  <Twitter size={20} />
                </a>
                <a href="https://instagram.com/AutopilotAiHQ" target="_blank" rel="noopener noreferrer" className="p-3 glass-card rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110" aria-label="Follow us on Instagram">
                  <Instagram size={20} />
                </a>
                <a href="mailto:Solution@AutopilotAihq.com" className="p-3 glass-card rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110" aria-label="Email us">
                  <Mail size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">AI Solutions</h4>
              <ul className="space-y-4">
                {Object.entries(serviceDescriptions).slice(0, 5).map(([service, { description, lastUpdated }]) => (
                  <li key={service}>
                    <a href="#services" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 font-medium">
                      {service}
                    </a>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{description}</p>
                    <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 inline-block">
                      Last Updated: {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Company</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => openModal('about')}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={handleCareers}
                    disabled={loading}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-left disabled:opacity-50"
                  >
                    {loading ? 'Loading...' : 'Careers'}
                  </button>
                </li>
                <li>
                  <RouterLink
                    to="/blog"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Blog
                  </RouterLink>
                </li>
                <li>
                  <button 
                    onClick={() => openModal('press')}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <RouterLink
                    to="/faq"
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                  >
                    Help Center
                  </RouterLink>
                </li>
                <li>
                  <button 
                    onClick={() => openModal('privacy')}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openModal('terms')}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-left"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-16 pt-8">
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400">
                &copy; {currentYear} AutoPilotAI. All rights reserved.
              </p>
            </div>
          </div>
        </Container>
      </footer>

      {/* About Us Modal */}
      <Modal isOpen={activeModal === 'about'} onClose={closeModal} title="About AutoPilotAI">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            AutoPilotAI was founded to help businesses embrace automation without friction. With a small, dedicated team of engineers and designers, we build solutions that solve real-world business problems using AI.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Our mission is to make intelligent automation accessible to startups and enterprises alike. We believe that every business, regardless of size, should have access to the transformative power of AI automation.
          </p>
        </div>
      </Modal>

      {/* Careers Modal */}
      <Modal isOpen={activeModal === 'careers'} onClose={closeModal} title="Join Our Team">
        <div className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We're always looking for talented individuals to join our mission of democratizing AI automation.
          </p>
          <div className="grid gap-4">
            {careers.map((job, index) => (
              <div key={index} className="glass-light rounded-xl p-6 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-300">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleApplyNow(job)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>


      {/* Privacy Policy Modal */}
      <Modal isOpen={activeModal === 'privacy'} onClose={closeModal} title="Privacy Policy">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Your privacy is important to us. We do not share data with third parties without your explicit consent.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Information We Collect</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">How We Use Your Information</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Data Security</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </div>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal isOpen={activeModal === 'terms'} onClose={closeModal} title="Terms of Service">
        <div className="p-6 space-y-6">
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
            <p>
              By using AutoPilotAI, you agree to the following terms and conditions.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Acceptance of Terms</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Use License</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Permission is granted to temporarily use AutoPilotAI for personal, non-commercial transitory viewing only.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Service Availability</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be communicated in advance.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Plan Engagement Disclaimer</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Clicking "Get Started" or interacting with a pricing plan does not finalize any purchase. It initiates a conversation with our team to assess your project and provide a tailored solution based on your needs.
            </p>
          </div>
        </div>
      </Modal>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={jobApplicationModal.isOpen}
        onClose={closeJobApplicationModal}
        jobTitle={jobApplicationModal.jobTitle}
        jobLocation={jobApplicationModal.jobLocation}
        jobType={jobApplicationModal.jobType}
      />

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={contactFormOpen}
        onClose={() => setContactFormOpen(false)}
      />
    </>
  );
};

export default Footer;