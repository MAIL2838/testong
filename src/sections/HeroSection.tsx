import React, { useState, useEffect } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { ArrowRight, Play, Users, Clock, Shield } from 'lucide-react';

interface HeroSectionProps {
  onCTAClick: (serviceName?: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCTAClick }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  const phrases = ['Modern Business', 'Customer-Centric Teams', 'Growing Startups'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsVisible(true);
      }, 300); // Half of the transition duration
    }, 3000);
    
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pastel-blue/30 dark:bg-blue-500/20 rounded-full filter blur-3xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pastel-purple/30 dark:bg-purple-500/20 rounded-full filter blur-3xl animate-pulse-soft delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pastel-pink/20 dark:bg-pink-500/10 rounded-full filter blur-3xl animate-pulse-soft delay-400"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left max-w-2xl animate-slide-in-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Automate{' '}
              <span className="gradient-text">
                Customer Support, Scheduling, Lead Capture
              </span>{' '}
              & More with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Transform your business operations with intelligent AI that works 24/7. Boost efficiency, reduce costs, and scale effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="gradient" size="lg" className="group" onClick={() => onCTAClick()}>
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="group" onClick={() => onCTAClick()}>
                <Play className="mr-2 h-5 w-5" />
                Live Demo
              </Button>
            </div>
            
            {/* Trust Signals */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gradient-to-br from-blue-400 to-purple-500 animate-float"
                      style={{ animationDelay: `${i * 0.5}s` }}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">500+ Companies</p>
                  <p className="text-sm">Trust AutoPilotAI</p>
                </div>
              </div>
              
              <div className="hidden sm:block h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">99.9% Uptime</p>
                  <p className="text-sm">Guaranteed</p>
                </div>
              </div>
              
              <div className="hidden sm:block h-8 w-px bg-gray-300 dark:bg-gray-600"></div>
              
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">24/7 Support</p>
                  <p className="text-sm">Always Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Demo Preview */}
          <div className="relative animate-slide-in-right">
            <div className="glass-card rounded-3xl p-8 shadow-2xl dark:shadow-slate-900/50">
              <div className="space-y-6">
                {/* Animated Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Powerful AI Solutions for{' '}
                    <span 
                      className={`gradient-text inline-block transition-all duration-600 ${
                        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
                      }`}
                    >
                      {phrases[currentPhraseIndex]}
                    </span>
                  </h2>
                </div>

         {/* Mock Chat Interface - Realistic Conversation */}
<div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl p-6">
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">AI Customer Support in Action</h3>
  <div className="space-y-3">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm dark:shadow-slate-900/20">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Customer: Hey, I received the wrong item. What should I do?
      </p>
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 ml-8">
      <p className="text-sm">
        AI: I’m really sorry to hear that! Let me quickly check your order and arrange a replacement.
      </p>
    </div>
    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm dark:shadow-slate-900/20">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        Customer: Thanks. That’d be great!
      </p>
    </div>
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 ml-8">
      <p className="text-sm">
        AI: Done. Replacement will arrive in 2 days. I’ve also sent tracking details to your email.
     </p>
    </div>
  </div>

  {/* Branding */}
  <div className="mt-6 text-center border-t pt-4 border-gray-200 dark:border-gray-700">
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Powered by <span className="font-semibold text-purple-600 dark:text-purple-400">AutoPilotAI</span> — Smart Automation for Modern Teams
    </p>
  </div>
</div>
                

                {/* Mock Analytics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-light rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">85%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Faster Response</div>
                  </div>
                  <div className="glass-light rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold gradient-text">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Availability</div>
                  </div>
                </div>

                {/* Mock Scheduling */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Meeting Scheduled</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Tomorrow at 2:00 PM</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 glass-light rounded-full p-4 animate-float">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse-soft"></div>
            </div>
            <div className="absolute -bottom-4 -left-4 glass-light rounded-full p-4 animate-float delay-300">
              <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse-soft"></div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;