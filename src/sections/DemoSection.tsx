import React, { useState, useEffect, useRef } from 'react';
import Container from '../components/Container';
import Button from '../components/Button';
import { Play, Pause, RotateCcw, MessageSquare, Calendar, Users, TrendingUp, User, Bot } from 'lucide-react';

interface DemoSectionProps {
  onCTAClick: (serviceName?: string) => void;
}

interface ChatMessage {
  id: number;
  type: 'customer' | 'ai';
  message: string;
  delay: number;
}

const DemoSection: React.FC<DemoSectionProps> = ({ onCTAClick }) => {
  const [activeDemo, setActiveDemo] = useState('chat');
  const [isPlaying, setIsPlaying] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const chatMessages: ChatMessage[] = [
    {
      id: 1,
      type: 'customer',
      message: "Hi, I'm having trouble with my recent order. Can you help?",
      delay: 500
    },
    {
      id: 2,
      type: 'ai',
      message: "I'd be happy to help you with your order! Let me pull up your account details. Can you provide your order number?",
      delay: 2000
    },
    {
      id: 3,
      type: 'customer',
      message: "Sure! It's #ORD-12345",
      delay: 1500
    },
    {
      id: 4,
      type: 'ai',
      message: "Perfect! I found your order. It looks like it's currently being processed and will ship within 24 hours. You'll receive a tracking number via email once it's dispatched.",
      delay: 2500
    },
    {
      id: 5,
      type: 'customer',
      message: "That's great! Thank you for the quick help.",
      delay: 1000
    },
    {
      id: 6,
      type: 'ai',
      message: "You're welcome! Is there anything else I can help you with today? I'm here 24/7 to assist you.",
      delay: 1800
    }
  ];
  

  const demos = {
    chat: {
      title: 'AI Customer Support',
      icon: <MessageSquare size={24} />,
      description: 'Watch our AI handle customer inquiries with human-like responses',
    },
    scheduling: {
      title: 'Smart Scheduling',
      icon: <Calendar size={24} />,
      description: 'See how appointments are booked automatically without conflicts',
    },
    analytics: {
      title: 'Real-time Analytics',
      icon: <TrendingUp size={24} />,
      description: 'Monitor your AI performance with detailed insights and metrics',
    },
  };

  // Load all messages by default when component mounts or when switching to chat demo
  useEffect(() => {
    if (activeDemo === 'chat') {
      // Show all messages immediately
      const allMessageIds = chatMessages.map(msg => msg.id);
      setVisibleMessages(allMessageIds);
      setCurrentMessageIndex(chatMessages.length);
      setIsTyping(false);
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [activeDemo]);

  const resetAndPlayChat = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }

    // Clear all messages first
    setVisibleMessages([]);
    setIsTyping(false);
    setCurrentMessageIndex(0);
    
    // Start fresh sequence
    setTimeout(() => {
      setIsPlaying(true);
      playNextMessage(0);
    }, 100);
  };

  const playNextMessage = (messageIndex: number) => {
    if (messageIndex >= chatMessages.length) {
      setIsPlaying(false);
      return;
    }

    const message = chatMessages[messageIndex];
    
    // Show typing indicator for AI messages
    if (message.type === 'ai') {
      setIsTyping(true);
    }

    setTimeout(() => {
      setIsTyping(false);
      setVisibleMessages(prev => [...prev, message.id]);
      setCurrentMessageIndex(messageIndex + 1);
      
      // Auto-scroll to bottom with smooth transition
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
      
      // Play next message
      if (messageIndex + 1 < chatMessages.length) {
        setTimeout(() => {
          playNextMessage(messageIndex + 1);
        }, 800);
      } else {
        setIsPlaying(false);
      }
    }, message.delay);
  };

  const togglePlayback = () => {
    if (activeDemo === 'chat') {
      resetAndPlayChat();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    if (activeDemo === 'chat') {
      // Reset to show all messages again
      const allMessageIds = chatMessages.map(msg => msg.id);
      setVisibleMessages(allMessageIds);
      setCurrentMessageIndex(chatMessages.length);
      setIsTyping(false);
      setIsPlaying(false);
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      setIsPlaying(false);
    }
  };

  const CustomerAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm">
      <User className="h-4 w-4 text-white" />
    </div>
  );

  const AIAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-sm">
      <Bot className="h-4 w-4 text-white" />
    </div>
  );

  const TypingIndicator = () => (
    <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-3 ml-10 animate-slide-up">
      <div className="flex items-start space-x-3">
        <AIAvatar />
        <div>
          <p className="text-sm font-medium">AI Assistant</p>
          <div className="flex space-x-1 mt-1">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pastel-blue/20 dark:bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pastel-pink/20 dark:bg-pink-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            See AutoPilotAI{' '}
            <span className="gradient-text">
              In Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up delay-200">
            Experience the power of AI automation with our interactive demos
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Demo Controls */}
          <div className="space-y-6 animate-slide-in-left">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Interactive Demos</h3>
              
              <div className="space-y-4">
                {Object.entries(demos).map(([key, demo]) => (
                  <button
                    key={key}
                    onClick={() => setActiveDemo(key)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      activeDemo === key
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white pastel-glow'
                        : 'glass-light hover:bg-blue-50 dark:hover:bg-blue-900/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeDemo === key ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/50'
                      }`}>
                        <div className={activeDemo === key ? 'text-white' : 'text-blue-600 dark:text-blue-400'}>
                          {demo.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className={`font-semibold ${
                          activeDemo === key ? 'text-white' : 'text-gray-900 dark:text-white'
                        }`}>
                          {demo.title}
                        </h4>
                        <p className={`text-sm ${
                          activeDemo === key ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'
                        }`}>
                          {demo.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Conditionally render play/reset buttons only for chat demo */}
              {activeDemo === 'chat' ? (
                <div className="flex space-x-4 mt-6">
                  <Button
                    variant="gradient"
                    onClick={togglePlayback}
                    className="flex-1"
                    disabled={isPlaying}
                  >
                    {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    Play Demo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="px-4"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                // Placeholder div to maintain layout consistency
                <div className="mt-6 h-11"></div>
              )}

              <div className="mt-6">
                <Button
                  variant="outline"
                  onClick={() => onCTAClick()}
                  className="w-full"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </div>
              
          {/* Demo Display */}
          <div className="animate-slide-in-right">
            <div className="glass-card rounded-2xl p-8 shadow-2xl dark:shadow-slate-900/50">
              {activeDemo === 'chat' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Live Customer Support Chat</h4>
                    <div 
                      ref={chatContainerRef}
                      className="space-y-3 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                      style={{ scrollBehavior: 'smooth' }}
                    >
                      {chatMessages.map((message) => {
                        const isVisible = visibleMessages.includes(message.id);
                        if (!isVisible) return null;

                        if (message.type === 'customer') {
                          return (
                            <div key={message.id} className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm dark:shadow-slate-900/20 animate-slide-up">
                              <div className="flex items-start space-x-3">
                                <CustomerAvatar />
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">Customer</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{message.message}</p>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          return (
                            <div key={message.id} className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-3 ml-10 animate-slide-up">
                              <div className="flex items-start space-x-3">
                                <AIAvatar />
                                <div>
                                  <p className="text-sm font-medium">AI Assistant</p>
                                  <p className="text-sm mt-1">{message.message}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                      
                      {/* Typing Indicator */}
                      {isTyping && <TypingIndicator />}
                    </div>

                    {/* Branding inside Live Customer Support Chat */}  
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Powered by <span className="font-semibold text-purple-600 dark:text-purple-400">AutoPilotAI</span> — AI Automation for Business Workflows
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-light rounded-lg p-3 text-center">
                      <div className="text-lg font-bold gradient-text">2.3s</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Response Time</div>
                    </div>
                    <div className="glass-light rounded-lg p-3 text-center">
                      <div className="text-lg font-bold gradient-text">98%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Accuracy</div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'scheduling' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Smart Scheduling Interface</h4>
                    <div className="space-y-3">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between mb-2">
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
                      
                      <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-soft"></div>
                          <span className="text-sm font-medium text-green-800 dark:text-green-300">Meeting scheduled for 4:00 PM</span>
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">Confirmation sent to both parties</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-light rounded-lg p-3 text-center">
                      <div className="text-lg font-bold gradient-text">0</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Conflicts</div>
                    </div>
                    <div className="glass-light rounded-lg p-3 text-center">
                      <div className="text-lg font-bold gradient-text">24/7</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Availability</div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemo === 'analytics' && (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Performance Dashboard</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-sm dark:shadow-slate-900/20">
                          <div className="text-xl font-bold gradient-text">1,247</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Interactions</div>
                          <div className="text-xs text-green-600 dark:text-green-400">↑ 23%</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-sm dark:shadow-slate-900/20">
                          <div className="text-xl font-bold gradient-text">94%</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Satisfaction</div>
                          <div className="text-xs text-green-600 dark:text-green-400">↑ 8%</div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-3 text-center shadow-sm dark:shadow-slate-900/20">
                          <div className="text-xl font-bold gradient-text">1.2s</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Avg Response</div>
                          <div className="text-xs text-green-600 dark:text-green-400">↓ 45%</div>
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-3 shadow-sm dark:shadow-slate-900/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Response Time Trend</span>
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="h-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded flex items-end space-x-1 p-2">
                          {[40, 60, 35, 80, 45, 70, 30].map((height, i) => (
                            <div
                              key={i}
                              className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-sm flex-1 animate-scale-in"
                              style={{ 
                                height: `${height}%`,
                                animationDelay: `${i * 100}ms`
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DemoSection;