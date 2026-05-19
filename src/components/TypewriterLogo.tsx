import React, { useState, useEffect } from 'react';
import { Bot } from 'lucide-react';

const TypewriterLogo: React.FC = () => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [botAnimation, setBotAnimation] = useState('');
  
  const text = 'AutoPilotAI';
  const typingSpeed = 2000; // Much slower typing (300ms per character)
  const erasingSpeed = 2000; // Slower erasing (120ms per character)
  const pauseDuration = 50000; // Longer pause (4 seconds before erasing)

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const typeText = () => {
      if (displayText.length < text.length) {
        setDisplayText(text.slice(0, displayText.length + 1));
        timeout = setTimeout(typeText, typingSpeed);
      } else {
        // Finished typing, pause then start erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
          eraseText();
        }, pauseDuration);
      }
    };

    const eraseText = () => {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
        timeout = setTimeout(eraseText, erasingSpeed);
      } else {
        // Finished erasing, trigger bot animation and start typing again
        setBotAnimation('animate-bounce');
        setTimeout(() => setBotAnimation(''), 600);
        
        setIsTyping(true);
        timeout = setTimeout(typeText, 800);
      }
    };

    if (isTyping) {
      typeText();
    } else {
      eraseText();
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text]);

  // Cursor blinking effect at 1000ms intervals for slower blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 1000);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center">
        <span className="font-mono text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent logo-fade">
          {displayText}
          <span 
            className={`inline-block w-0.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500 ml-0.5 transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </span>
      </div>
      <div className={`text-blue-500 dark:text-blue-400 transition-all duration-300 ${botAnimation}`}>
        <Bot size={20} className="animate-pulse-soft" />
      </div>
      
      {/* Logo Effects Styles */}
      <style jsx>{`
        .logo-fade {
  /* Apply gradient background */
  background: linear-gradient(90deg, #5c6df8, #7a2ff7); /* your existing blue & purple */

  /* Clip gradient to text */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Optional: add subtle shadow for extra contrast */
  text-shadow: 0 0 50px rgba(0,0,0,0.4);

  /* Keep fade animation */
  animation: fadeLogo 3s infinite alternate;
}

/* Existing fade animation */
@keyframes fadeLogo {
  from { opacity: 0.4; }
  to { opacity: 1; }
}

      `}</style>
    </div>
  );
};

export default TypewriterLogo;