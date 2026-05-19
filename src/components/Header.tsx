import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom';
import Container from './Container';
import Button from './Button';
import TypewriterLogo from './TypewriterLogo';
import { ThemeToggle } from './ui/theme-toggle';

interface HeaderProps {
  onCTAClick?: (serviceName?: string) => void;
}

const SmartNavLink: React.FC<{ name: string; href: string }> = ({ name, href }) => {
  const location = useLocation();
  const isHashLink = href.startsWith('#');

  if (isHashLink) {
    const handleClick = (e: React.MouseEvent) => {
      if (location.pathname !== '/') {
        e.preventDefault();
        window.location.href = `/${href}`;
      } else {
        const element = document.querySelector(href);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105 relative group"
      >
        {name}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
      </a>
    );
  }

  return (
    <RouterLink
      to={href}
      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-all duration-300 hover:scale-105 relative group"
    >
      {name}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
    </RouterLink>
  );
};

const Header: React.FC<HeaderProps> = ({ onCTAClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Demo', href: '#demo' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-light backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <RouterLink to="/" className="block">
              <TypewriterLogo />
            </RouterLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <SmartNavLink key={link.name} name={link.name} href={link.href} />
            ))}

            {/* Theme Toggle */}
            <ThemeToggle className="mx-2" />

            <Button variant="gradient" size="sm" onClick={() => onCTAClick?.()}>
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-light backdrop-blur-md py-4 px-4 z-40 animate-slide-up">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <SmartNavLink
                key={link.name}
                name={link.name}
                href={link.href}
              />
            ))}
            <Button variant="gradient" className="w-full" onClick={() => { onCTAClick?.(); toggleMenu(); }}>
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;