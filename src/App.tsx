import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeProvider';
import RouteScrollToTop from './components/RouteScrollToTop';
import SplashCursor from './components/SplashCursor';
import ServiceSelectionModal from './components/ServiceSelectionModal';
import ModalContactForm from './sections/ContactSection/ModalContactForm';
import { useCTAHandler } from './hooks/useCTAHandler';

// Pages
import HomePage from './pages/HomePage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import FAQPage from './pages/FAQPage';
import UnsubscribePage from './pages/UnsubscribePage';

function App() {
  const {
    isServiceSelectionOpen,
    isContactModalOpen,
    preSelectedService,
    hideServiceField,
    handleCTAClick,
    handleServiceSelect,
    closeServiceSelection,
    closeContactModal,
  } = useCTAHandler();

  const [contactFormType, setContactFormType] = React.useState<'callback' | 'email' | 'general'>('general');

  const handleCallbackClick = () => {
    setContactFormType('callback');
    handleCTAClick();
  };

  const handleEmailClick = () => {
    setContactFormType('email');
    handleCTAClick();
  };

  const handleCloseContactModal = () => {
    setContactFormType('general');
    closeContactModal();
  };

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="system">
        <Router>
          <RouteScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage onCTAClick={handleCTAClick} onCallbackClick={handleCallbackClick} onEmailClick={handleEmailClick} />} />
            <Route path="/blog" element={<BlogIndexPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/unsubscribe" element={<UnsubscribePage />} />
          </Routes>

          {/* Global Modals */}
          <ServiceSelectionModal
            isOpen={isServiceSelectionOpen}
            onClose={closeServiceSelection}
            onServiceSelect={handleServiceSelect}
          />
          <ModalContactForm
            isModalOpen={isContactModalOpen}
            onCloseModal={handleCloseContactModal}
            preSelectedService={preSelectedService}
            hideServiceField={hideServiceField}
            formType={contactFormType}
          />
          <SplashCursor />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;