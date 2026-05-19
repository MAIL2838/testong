import React, { useState } from 'react';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Mail, Phone, AlertTriangle, Send, CheckCircle, ChevronDown } from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
  service: string;
}

// Unified webhook URL
const WEBHOOK_URL = "https://n8n-may.autopilotaihq.com/webhook/a8f1371d-a3c7-4834-b3ab-e10cee0dd4e4";

interface StaticContactFormProps {
  onCallbackClick?: () => void;
  onEmailClick?: () => void;
}

const StaticContactForm: React.FC<StaticContactFormProps> = ({ 
  onCallbackClick, 
  onEmailClick 
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    service: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
          formType: 'contact',
          source: 'AutoPilotAI Static Contact Form',
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

      console.log('Static contact form submitted successfully');
      setIsSubmitted(true);
      
      // Reset form after 10 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          message: '',
          service: '',
        });
      }, 10000);

    } catch (error) {
      console.error('Static contact form submission error:', error);
      setSubmitError('There was an error submitting your form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pastel-pink/20 dark:bg-pink-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pastel-green/20 dark:bg-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Ready to{' '}
            <span className="gradient-text">
              Get Started?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up delay-200">
            Transform your business today with AI automation that works
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="animate-slide-in-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Let's Connect</h3>
            
            <div className="space-y-8">
              <div className="flex items-start group">
                <div className="p-4 glass-card rounded-xl text-red-500 dark:text-red-400 mr-6 group-hover:animate-pulse group-hover:pastel-glow">
                  <AlertTriangle size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Don't Get Left Behind
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    AI automation isn't optional — it's inevitable.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Brands that delay will spend 5× more later just to catch up.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Act now while it's still a competitive advantage.
                  </p>
                </div>
              </div>
              
              {/* Clickable Request a Callback Card - Fixed alignment */}
              <div className="flex items-start group">
                <div className="p-4 glass-card rounded-xl text-blue-600 dark:text-blue-400 mr-6 group-hover:animate-pulse group-hover:pastel-glow">
                  <Phone size={24} />
                </div>
                <div className="flex-1">
                  <button 
                    onClick={onCallbackClick}
                    className="w-full text-left transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-3 rounded-xl -m-3"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:gradient-text transition-all duration-300">
                      Request a Callback
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">Want to talk with an AI expert?</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">We'll reach out within 24 hours.</p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Click to request callback →
                    </p>
                  </button>
                </div>
              </div>
              
              {/* Clickable Email Us Card - Fixed alignment */}
              <div className="flex items-start group">
                <div className="p-4 glass-card rounded-xl text-blue-600 dark:text-blue-400 mr-6 group-hover:animate-pulse group-hover:pastel-glow">
                  <Mail size={24} />
                </div>
                <div className="flex-1">
                  <button 
                    onClick={onEmailClick}
                    className="w-full text-left transition-all duration-300 hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-3 rounded-xl -m-3"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:gradient-text transition-all duration-300">
                      Email Us
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">solution@autopilotAIhq.com</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">We respond within 24 hours</p>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      Click to send email →
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Send Us a Message</h3>
              
              {isSubmitted ? (
                <div className="glass-light rounded-xl p-6 text-center animate-slide-up">
                  <div className="p-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold gradient-text mb-3">🎉 Thank You!</h4>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    We've received your request for <span className="font-semibold text-blue-600 dark:text-blue-400">{formData.service}</span>.
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    You're one step away from transforming your business with cutting-edge AI automation.
                    Our team will connect with you shortly to help you get started with smarter, faster operations.
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-green-600 dark:text-green-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                    <span className="text-sm font-medium">Message sent successfully</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="fullName-static" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName-static"
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
                    <label htmlFor="email-static" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email-static"
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
                    <label htmlFor="phone-static" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone-static"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-static" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Service of Interest *
                    </label>
                    <div className="relative">
                      <select
                        id="service-static"
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
                  
                  <div>
                    <label htmlFor="message-static" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message-static"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
                      placeholder="Tell us about your project and how we can help..."
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
                        Send Message
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
      </Container>
    </section>
  );
};

export default StaticContactForm;