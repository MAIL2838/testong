import React from 'react';
import { useEffect } from 'react';
import { X, CheckCircle, Play, Download, Phone, Calendar, Users, Globe, Headset, Bot, Zap } from 'lucide-react';
import Button from './Button';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: string;
  onGetStarted: (serviceName: string) => void;
  onScheduleDemo: (serviceName: string) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service, onGetStarted, onScheduleDemo }) => {
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

  const serviceContent = {
    'customer-support': {
      title: 'AI Customer Support',
      serviceName: 'Customer Support AI',
      icon: <Headset size={40} />,
      summary: 'Transform your customer service with intelligent AI that provides instant, accurate responses 24/7. Our advanced natural language processing understands context and delivers personalized support experiences.',
      features: [
        'Instant response to customer inquiries across all channels',
        'Smart ticket routing and priority classification',
        'Multi-language support with real-time translation',
        'Seamless handoff to human agents when needed',
        'Learning from interactions to improve over time'
      ],
      demo: (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Live Chat Demo</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm dark:shadow-slate-900/20 animate-slide-up">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Customer</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Hi, I'm having trouble with my recent order. Can you help?</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 ml-8 animate-slide-up delay-200">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Headset className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI Assistant</p>
                  <p className="text-sm">I'd be happy to help you with your order! Let me pull up your account details. Can you provide your order number?</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm dark:shadow-slate-900/20 animate-slide-up delay-300">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Customer</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Sure! It's #ORD-12345</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 ml-8 animate-slide-up delay-400">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <Headset className="h-3 w-3" />
                </div>
                <div>
                  <p className="text-sm font-medium">AI Assistant</p>
                  <p className="text-sm">Perfect! I found your order. It looks like it's currently being processed and will ship within 24 hours. You'll receive a tracking number via email.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="glass-light rounded-lg p-3 text-center">
              <div className="text-lg font-bold gradient-text">2.3s</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
            </div>
            <div className="glass-light rounded-lg p-3 text-center">
              <div className="text-lg font-bold gradient-text">98%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
            </div>
            <div className="glass-light rounded-lg p-3 text-center">
              <div className="text-lg font-bold gradient-text">24/7</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Available</div>
            </div>
          </div>
        </div>
      )
    },
    'scheduling': {
      title: 'Smart Scheduling',
      serviceName: 'Smart Scheduling',
      icon: <Calendar size={40} />,
      summary: 'Eliminate scheduling conflicts and automate appointment booking with our intelligent calendar system. Integrates seamlessly with your existing tools and workflows.',
      features: [
        'Automatic conflict detection and resolution',
        'Multi-timezone support with smart suggestions',
        'Calendar integration with Google, Outlook, and more',
        'Automated reminder and follow-up sequences',
        'Buffer time management and travel time calculation'
      ],
      demo: (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Scheduling Workflow</h4>
          <div className="space-y-4">
            {/* Workflow Steps */}
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
              <div className="flex-1 p-3 glass-light rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">Customer Request</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI receives scheduling request via chat, email, or phone</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">2</div>
              <div className="flex-1 p-3 glass-light rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">Smart Analysis</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI checks availability, preferences, and constraints</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-px h-8 bg-gray-300 dark:bg-gray-600"></div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">3</div>
              <div className="flex-1 p-3 glass-light rounded-lg">
                <p className="font-medium text-gray-900 dark:text-white">Instant Booking</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Appointment confirmed and calendar invites sent</p>
              </div>
            </div>
            
            {/* Calendar Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/20 mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Available Slots</span>
                <Calendar className="h-4 w-4 text-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-sm">2:00 PM</button>
                <button className="p-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-sm">3:30 PM</button>
                <button className="p-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-sm font-medium">4:00 PM ✓</button>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded text-sm">5:00 PM</button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'lead-capture': {
      title: 'Lead Capture & CRM',
      serviceName: 'Lead Capture + CRM',
      icon: <Users size={40} />,
      summary: 'Automatically capture, qualify, and nurture leads with intelligent workflows. Our AI identifies high-value prospects and guides them through your sales funnel.',
      features: [
        'Real-time lead scoring and qualification',
        'Automated follow-up sequences and nurturing',
        'CRM integration with Salesforce, HubSpot, and more',
        'Behavioral tracking and engagement analytics',
        'Personalized content recommendations'
      ],
      demo: (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Lead Journey Workflow</h4>
          <div className="space-y-4">
            {/* Lead Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-3 flex items-center justify-center">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Capture</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Visitor lands on website or interacts with AI</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-3 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Qualify</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI asks smart questions to assess fit</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-3 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Nurture</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">Automated follow-up and engagement</p>
              </div>
            </div>
            
            {/* Lead Score Example */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/20">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900 dark:text-white">Lead Score</span>
                <span className="text-2xl font-bold gradient-text">85/100</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Company Size</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">High Value</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Budget Range</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">Qualified</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Timeline</span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium">3-6 Months</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'website-builder': {
      title: 'AI Website Builder',
      serviceName: 'Website Builder',
      icon: <Globe size={40} />,
      summary: 'Create stunning, conversion-optimized websites in minutes with our AI-powered design engine. No coding required - just describe your vision and watch it come to life.',
      features: [
        'AI-generated layouts based on your industry and goals',
        'Automatic content creation and optimization',
        'Mobile-responsive designs with modern aesthetics',
        'SEO optimization and performance monitoring',
        'One-click deployment and hosting included'
      ],
      demo: (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-6">
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">AI Website Builder Demo</h4>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Watch how AI transforms your business description into a complete, professional website.
          </p>

          {/* Interactive Website Builder Demo */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg">
            {/* Browser Header */}
            <div className="bg-gray-100 dark:bg-slate-700 px-4 py-2 flex items-center space-x-2">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-white dark:bg-slate-600 rounded px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
                autopilotai.com/builder
              </div>
            </div>

            {/* Demo Interface */}
            <div className="p-6 space-y-6">
              {/* Step 1: Input */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">1</div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">Describe Your Business</h5>
                </div>
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Business Description:</div>
                  <div className="bg-white dark:bg-slate-600 rounded border p-3 text-sm">
                    "Modern fitness studio offering yoga, pilates, and personal training in downtown Seattle. Focus on wellness and community."
                  </div>
                </div>
              </div>

              {/* Step 2: AI Processing */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-bold">2</div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">AI Analysis & Generation</h5>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">✓ Industry analysis complete</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">✓ Color palette generated</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">✓ Content sections created</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">⚡ Building responsive layout...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Generated Website Preview */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">3</div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">Generated Website</h5>
                </div>
                
                {/* Website Preview */}
                <div className="bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 overflow-hidden">
                  {/* Website Header */}
                  <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">ZenFlow Fitness</h3>
                      <div className="flex space-x-4 text-sm">
                        <span>Classes</span>
                        <span>About</span>
                        <span>Contact</span>
                      </div>
                    </div>
                    <p className="text-teal-100 mt-2">Transform Your Body & Mind</p>
                  </div>
                  
                  {/* Website Content */}
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-teal-50 dark:bg-teal-900/30 rounded p-3 text-center">
                        <div className="w-8 h-8 bg-teal-500 rounded-full mx-auto mb-2"></div>
                        <div className="text-xs font-medium text-gray-900 dark:text-white">Yoga</div>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-3 text-center">
                        <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
                        <div className="text-xs font-medium text-gray-900 dark:text-white">Pilates</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/30 rounded p-3 text-center">
                        <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
                        <div className="text-xs font-medium text-gray-900 dark:text-white">Personal Training</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-slate-600 rounded p-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">About ZenFlow</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">
                        Located in the heart of downtown Seattle, we're your community wellness destination...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider and Key Features Section */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-1 rounded bg-blue-100 dark:bg-blue-900/50">
                <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Live Features</h3>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Globe className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Instant Customization</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    AI analyzes your business type and generates tailored layouts, colors, and content in seconds.
                  </p>
                </div>
                
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SEO & Mobile Optimized</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Built-in optimization ensures perfect performance across all devices and search engines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Demo stats */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="glass-light rounded-lg p-3 text-center">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Zap className="h-3 w-3 text-blue-500" />
                <div className="text-lg font-bold gradient-text">Fastest way to build a website</div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Speed & Efficiency</div>
            </div>
            <div className="glass-light rounded-lg p-3 text-center">
              <div className="text-lg font-bold gradient-text">100%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Mobile Ready</div>
            </div>
            <div className="glass-light rounded-lg p-3 text-center">
              <div className="text-lg font-bold gradient-text">1-Click</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Deploy</div>
            </div>
          </div>
        </div>
      )
    },
    'voice-agents': {
      title: 'AI Voice Agents',
      serviceName: 'AI Phone Caller',
      icon: <Phone size={40} />,
      summary: 'Deploy human-like AI voice agents that handle calls, appointments, and customer inquiries with natural conversation flow. Available 24/7 in multiple languages.',
      features: [
        'Natural conversation with human-like speech patterns',
        'Multi-language support with native accents',
        'Appointment scheduling and calendar integration',
        'Call recording and transcription for quality assurance',
        'Seamless transfer to human agents when needed'
      ],
      demo: (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Voice Agent Demo</h4>
          <div className="space-y-4">
            {/* Audio Player Mockup */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/20">
              <div className="flex items-center space-x-4">
                <button className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white hover:scale-105 transition-transform">
                  <Play className="h-6 w-6 ml-1" />
                </button>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Sample Call: Restaurant Booking</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">2:34</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call Transcript Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/20">
              <h5 className="font-medium text-gray-900 dark:text-white mb-3">Live Transcript</h5>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="text-blue-600 dark:text-blue-400 font-medium mr-2">AI:</span>
                  <span className="text-gray-700 dark:text-gray-300">"Hello! I'd like to make a reservation for tonight at 7 PM for two people."</span>
                </div>
                <div className="flex">
                  <span className="text-green-600 dark:text-green-400 font-medium mr-2">Restaurant:</span>
                  <span className="text-gray-700 dark:text-gray-300">"Certainly! Let me check our availability for 7 PM..."</span>
                </div>
              </div>
            </div>
            
            {/* Voice Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-light rounded-lg p-3 text-center">
                <div className="text-lg font-bold gradient-text">95%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
              <div className="glass-light rounded-lg p-3 text-center">
                <div className="text-lg font-bold gradient-text">12</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Languages</div>
              </div>
              <div className="glass-light rounded-lg p-3 text-center">
                <div className="text-lg font-bold gradient-text">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Available</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'custom-ai-bot': {
      title: 'Custom AI Bot',
      serviceName: 'Custom AI Bot',
      icon: <Bot size={40} />,
      summary: 'Deploy AI bots tailored precisely to your business workflows, customer journey, and logic. Whether for education, real estate, healthcare, or retail — these bots adapt to your use case and grow with your operations.',
      features: [
        'Custom-built logic based on your operations and industry',
        'Multi-channel support (Web, WhatsApp, Voice, SMS)',
        'Live data integrations (Google Sheets, Airtable, CRM)',
        'Human handover fallback',
        'Voiceflow or Node-based bot logic building'
      ],
      demo: (
        <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/30 dark:to-indigo-900/30 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">See It In Action</h4>
          <div className="space-y-4">
            {/* Demo Request Form */}
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm dark:shadow-slate-900/20 border border-violet-200 dark:border-violet-800">
              <div className="text-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 mx-auto mb-3 flex items-center justify-center">
                  <Bot className="h-8 w-8 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Demo Request</h5>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Submit the form below to get a short demo tailored to your use case. We'll email it in less than 5 minutes.
                </p>
              </div>
              
              {/* Demo Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="glass-light rounded-lg p-3 text-center">
                  <div className="text-sm font-bold gradient-text">Industry-Specific</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Tailored Logic</div>
                </div>
                <div className="glass-light rounded-lg p-3 text-center">
                  <div className="text-sm font-bold gradient-text">Multi-Channel</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Web, SMS, Voice</div>
                </div>
                <div className="glass-light rounded-lg p-3 text-center">
                  <div className="text-sm font-bold gradient-text">Live Data</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Real-time Sync</div>
                </div>
                <div className="glass-light rounded-lg p-3 text-center">
                  <div className="text-sm font-bold gradient-text">Smart Handoff</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Human Backup</div>
                </div>
              </div>
              
              {/* Use Case Examples */}
              <div className="space-y-2">
                <h6 className="text-sm font-medium text-gray-900 dark:text-white">Popular Use Cases:</h6>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 rounded-full text-xs">Real Estate Lead Qualifier</span>
                  <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full text-xs">Healthcare Appointment Bot</span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs">E-learning Assistant</span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-xs">Retail Product Finder</span>
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-light rounded-lg p-3 text-center">
                <div className="text-lg font-bold gradient-text">5min</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Demo Delivery</div>
              </div>
              <div className="glass-light rounded-lg p-3 text-center">
                <div className="text-lg font-bold gradient-text">100%</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Customized</div>
              </div>
              <div className="glass-light rounded-lg p-3 text-center">
                <div className="text-lg font-bold gradient-text">24/7</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Operation</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const content = serviceContent[service as keyof typeof serviceContent];
  if (!content) return null;

  const handleGetStarted = () => {
    onGetStarted(content.serviceName);
  };

  const handleScheduleDemo = () => {
    onScheduleDemo(content.serviceName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="glass-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="p-3 glass-light rounded-xl text-blue-600 dark:text-blue-400">
              {content.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{content.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 glass-light rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Summary */}
          <div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{content.summary}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
            <div className="space-y-3">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo/Interactive Content */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">See It In Action</h3>
            {content.demo}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button variant="gradient" className="flex-1" onClick={handleGetStarted}>
              Get Started with {content.title}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleScheduleDemo}>
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;