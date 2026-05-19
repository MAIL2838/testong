import React from 'react';
import SEO from '../components/SEO';
import Header from '../components/Header';
import HeroSection from '../sections/HeroSection';
import ServicesSection from '../sections/ServicesSection';
import StaticContactForm from '../sections/ContactSection/StaticContactForm';
import HowItWorksSection from '../sections/HowItWorksSection';
import DemoSection from '../sections/DemoSection';
import IntegrationsSection from '../sections/IntegrationsSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

interface HomePageProps {
  onCTAClick: () => void;
  onCallbackClick: () => void;
  onEmailClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCTAClick, onCallbackClick, onEmailClick }) => {
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://www.autopilotai.in',
      name: 'AutoPilotAI',
      description:
        'AI automation platform for customer support, scheduling, lead capture, and more. Transform your business with intelligent automation.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.autopilotai.in/search?q={search_term_string}',
        },
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '[role="main"]'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.autopilotai.in',
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="AutoPilotAI - AI Automation for Customer Support, Scheduling & Lead Capture"
        description="AutoPilotAI automates customer support, scheduling, lead capture, and more with intelligent AI. Start automating your business today with our no-code platform."
        canonicalUrl="https://www.autopilotai.in"
        ogImage="https://i.postimg.cc/DzwJ1cyC/Autopilot-AI-logo.png"
        ogImageAlt="AutoPilotAI - AI Automation Platform for Customer Support, Scheduling & Lead Capture"
        twitterImage="https://i.postimg.cc/DzwJ1cyC/Autopilot-AI-logo.png"
        twitterImageAlt="AutoPilotAI - AI Automation Platform"
        keywords={[
          'AI automation',
          'customer support automation',
          'lead capture automation',
          'scheduling automation',
          'AI chatbot',
          'business automation',
          'no-code automation',
        ]}
        schema={schemaData}
        hreflangs={[
          { lang: 'en', url: 'https://www.autopilotai.in' },
          { lang: 'en-IN', url: 'https://www.autopilotai.in' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header onCTAClick={onCTAClick} />
        <main>
          <HeroSection onCTAClick={onCTAClick} />
          <ServicesSection onCTAClick={onCTAClick} />
          <StaticContactForm onCallbackClick={onCallbackClick} onEmailClick={onEmailClick} />
          <HowItWorksSection />
          <DemoSection onCTAClick={onCTAClick} />
          <IntegrationsSection />
          <TestimonialsSection />
          <PricingSection onCTAClick={onCTAClick} />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default HomePage;
