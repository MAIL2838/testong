import React, { useEffect } from 'react';
import { X, Headset, Calendar, Users, Globe, Phone, Bot } from 'lucide-react';
import Button from './Button';

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelect: (serviceName: string) => void;
}

const ServiceSelectionModal: React.FC<ServiceSelectionModalProps> = ({ 
  isOpen, 
  onClose, 
  onServiceSelect 
}) => {
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

  if (!isOpen) return null;

  const services = [
    { name: 'Customer Support AI', icon: <Headset size={24} /> },
    { name: 'Smart Scheduling', icon: <Calendar size={24} /> },
    { name: 'Lead Capture + CRM', icon: <Users size={24} /> },
    { name: 'Website Builder', icon: <Globe size={24} /> },
    { name: 'AI Phone Caller', icon: <Phone size={24} /> },
    { name: 'Custom AI Bot', icon: <Bot size={24} /> },
  ];

  const handleServiceSelect = (serviceName: string) => {
    onServiceSelect(serviceName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in relative">
        {/* Fixed close button position - inside modal container */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select a Service</h2>
          <button
            onClick={onClose}
            className="p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Please select a service to proceed with your request.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <button
                key={service.name}
                onClick={() => handleServiceSelect(service.name)}
                className="p-4 glass-light rounded-xl text-left transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    {service.icon}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {service.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionModal;