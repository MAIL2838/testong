import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import ServiceModal from '../components/ServiceModal';
import { Headset, Calendar, Users, Globe, Phone, Zap, Bot } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  onLearnMore: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, delay, onLearnMore }) => {
  return (
    <div 
      className={`glass-card rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:hover:shadow-slate-900/50 group animate-slide-up h-full delay-${delay}`}
    >
      <div className="flex flex-col items-start h-full">
        <div className="p-4 glass-light rounded-xl text-blue-600 dark:text-blue-400 mb-6 group-hover:animate-pulse group-hover:pastel-glow">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">{description}</p>
        <button
          onClick={onLearnMore}
          className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-2 transition-transform duration-300 hover:text-purple-600 dark:hover:text-purple-400"
        >
          <span>Learn More</span>
          <Zap className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

interface ServicesSectionProps {
  onCTAClick: (serviceName?: string) => void;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ onCTAClick }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const industries = ['E-commerce', 'Healthcare', 'Real Estate', 'Business'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndustryIndex((prevIndex) => (prevIndex + 1) % industries.length);
        setIsVisible(true);
      }, 300); // Half of the transition duration
    }, 5000); // 5 seconds
    
    return () => clearInterval(interval);
  }, [industries.length]);

  const services = [
    {
      id: 'customer-support',
      icon: <Headset size={32} />,
      title: 'AI Customer Support',
      description: 'Intelligent ticket management with instant responses, smart routing, and 24/7 availability that never sleeps.',
    },
    {
      id: 'scheduling',
      icon: <Calendar size={32} />,
      title: 'Smart Scheduling',
      description: 'Automated appointment booking with calendar sync, reminder systems, and zero-conflict scheduling.',
    },
    {
      id: 'lead-capture',
      icon: <Users size={32} />,
      title: 'Lead Capture & CRM',
      description: 'Capture, qualify, and nurture leads automatically with intelligent workflows and seamless integrations.',
    },
    {
      id: 'website-builder',
      icon: <Globe size={32} />,
      title: 'AI Website Builder',
      description: 'Create stunning, conversion-optimized websites in minutes with our AI-powered design engine.',
    },
    {
      id: 'voice-agents',
      icon: <Phone size={32} />,
      title: 'AI Voice Agents',
      description: 'Human-like AI callers that handle appointments, follow-ups, and customer inquiries naturally.',
    },
    {
      id: 'custom-ai-bot',
      icon: <Bot size={32} />,
      title: 'Custom AI Bot',
      description: 'Get custom-built AI bots tailored to your business needs, workflows, and platforms.',
    },
  ];

  const handleLearnMore = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  const handleGetStarted = (serviceName: string) => {
    setSelectedService(null);
    onCTAClick(serviceName);
  };

  const handleScheduleDemo = (serviceName: string) => {
    setSelectedService(null);
    onCTAClick(serviceName);
  };

  return (
    <>
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-pastel-blue/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pastel-purple/20 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up leading-tight">
              Your Entire{' '}
              <span 
                className={`gradient-text inline-block transition-all duration-600 ${
                  isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                }`}
                style={{ minWidth: '200px', textAlign: 'center' }}
              >
                {industries[currentIndustryIndex]}
              </span>
              ,{' '}
              <br className="hidden sm:block" />
              Supercharged by AI
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up delay-200">
              From customer support to CRM and scheduling, explore how AI handles your operations with precision, speed, and scalability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                delay={index * 100}
                onLearnMore={() => handleLearnMore(service.id)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Service Modal */}
      <ServiceModal
        isOpen={selectedService !== null}
        onClose={closeModal}
        service={selectedService || ''}
        onGetStarted={handleGetStarted}
        onScheduleDemo={handleScheduleDemo}
      />
    </>
  );
};

export default ServicesSection;