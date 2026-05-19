import React from 'react';
import Container from '../components/Container';

const IntegrationsSection: React.FC = () => {
  const integrations = [
    { name: 'Salesforce', category: 'CRM' },
    { name: 'HubSpot', category: 'Marketing' },
    { name: 'Slack', category: 'Communication' },
    { name: 'Microsoft Teams', category: 'Collaboration' },
    { name: 'Google Workspace', category: 'Productivity' },
    { name: 'Zapier', category: 'Automation' },
    { name: 'Zoom', category: 'Video' },
    { name: 'Shopify', category: 'E-commerce' },
    { name: 'Zendesk', category: 'Support' },
    { name: 'Mailchimp', category: 'Email' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'Notion', category: 'Workspace' },
  ];

  return (
    <section id="integrations" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pastel-blue/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pastel-pink/20 dark:bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            Seamless{' '}
            <span className="gradient-text">
              Integrations
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up delay-200">
            Connect with your favorite tools and platforms instantly
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {integrations.map((integration, index) => (
            <div 
              key={index}
              className={`glass-card rounded-xl p-6 h-24 flex flex-col items-center justify-center transition-all duration-500 hover:scale-110 hover:pastel-glow group animate-slide-up delay-${index * 50}`}
            >
              <span className="text-gray-900 dark:text-white font-semibold text-center group-hover:gradient-text transition-all duration-300">
                {integration.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{integration.category}</span>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16 animate-slide-up delay-500">
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            And 500+ more integrations available through our{' '}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Universal API</span>
          </p>
        </div>
      </Container>
    </section>
  );
};

export default IntegrationsSection;