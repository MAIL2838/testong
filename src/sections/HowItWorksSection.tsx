import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/Container';
import { CheckCircle, Settings, Zap, ArrowRight } from 'lucide-react';

interface StepCardProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const StepCard: React.FC<StepCardProps> = ({ number, icon, title, description, delay }) => {
  return (
    <div 
      className={`relative animate-slide-up delay-${delay}`}
    >
      <div className="glass-card rounded-2xl p-8 h-full transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:hover:shadow-slate-900/50 group">
        <div className="flex flex-col items-center text-center">
          {/* Step number */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm pastel-glow">
            {number}
          </div>
          
          {/* Icon */}
          <div className="p-6 glass-light rounded-2xl text-blue-600 dark:text-blue-400 mb-6 group-hover:animate-pulse group-hover:pastel-glow">
            {icon}
          </div>
          
          {/* Content */}
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
        </div>
      </div>
      
      {/* Arrow connector (hidden on last item) */}
      {number < 3 && (
        <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 text-blue-400 dark:text-blue-500">
          <ArrowRight size={32} className="animate-pulse-soft" />
        </div>
      )}
    </div>
  );
};

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <CheckCircle size={40} />,
      title: 'Choose Your AI Tools',
      description: 'Select from our comprehensive suite of AI automation services tailored to your specific business needs and goals.',
    },
    {
      icon: <Settings size={40} />,
      title: 'Smart Configuration',
      description: 'Our AI learns your workflows, brand voice, and business requirements to create a perfectly customized solution.',
    },
    {
      icon: <Zap size={40} />,
      title: 'Launch & Scale',
      description: 'Deploy instantly and watch your business transform. Scale effortlessly as you grow with continuous AI optimization.',
    },
  ];

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Set Up AI Automation with AutoPilotAI',
    description: 'Get started with AI automation in three simple steps using AutoPilotAI',
    image: {
      '@type': 'ImageObject',
      url: 'https://www.autopilotai.in/howto-placeholder.png',
      width: 1200,
      height: 600,
    },
    totalTime: 'PT30M',
    estimatedCost: {
      '@type': 'PriceSpecification',
      priceCurrency: 'INR',
      price: '0',
      description: 'Get started free',
    },
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
      image: {
        '@type': 'ImageObject',
        url: `https://www.autopilotai.in/step-${index + 1}-placeholder.png`,
        width: 800,
        height: 600,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
      </Helmet>
      <section id="how-it-works" className="py-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-pastel-purple/20 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pastel-green/20 dark:bg-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            How It{' '}
            <span className="gradient-text">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up delay-200">
            Get started with AI automation in three simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={index * 200}
            />
          ))}
        </div>
      </Container>
    </section>
    </>
  );
};

export default HowItWorksSection;