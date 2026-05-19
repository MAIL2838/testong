import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, BellOff, AlertCircle, Loader } from 'lucide-react';
import Container from '../components/Container';
import SEO from '../components/SEO';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

type UnsubscribeState = 'idle' | 'loading' | 'success' | 'error';

const UnsubscribePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email') || '';

  const [state, setState] = useState<UnsubscribeState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUnsubscribe = async () => {
    if (!email) {
      setErrorMessage('Email address is missing. Please check the link.');
      setState('error');
      return;
    }

    setState('loading');
    setErrorMessage('');

    try {
      const response = await fetch(
        'https://n8n-may.autopilotaihq.com/webhook-test/4464058c-4706-4be9-847b-6e7700252b7c',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'newsletter-unsubscribe',
            email,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to process unsubscribe request');
      }

      setState('success');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An error occurred while processing your request. Please try again.'
      );
      setState('error');
    }
  };

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.autopilotaihq.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Unsubscribe',
          item: 'https://www.autopilotaihq.com/unsubscribe',
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Unsubscribe - AutoPilotAI"
        description="Manage your subscription preferences for AutoPilotAI communications."
        canonicalUrl="https://www.autopilotaihq.com/unsubscribe"
        ogImageAlt="AutoPilotAI - Unsubscribe"
        twitterImageAlt="AutoPilotAI - Unsubscribe"
        keywords={['unsubscribe', 'subscription', 'preferences']}
        schema={schemaData}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <Container>
            <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
              {state === 'success' ? (
                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-lg w-full text-center animate-slide-up">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Successfully Unsubscribed
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    We've removed
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-6">
                    {email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    from our mailing list. You won't receive updates from us anymore, but we'd love to have you back anytime.
                  </p>
                  <button
                    onClick={() => navigate('/')}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Return to Homepage
                  </button>
                </div>
              ) : (
                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-lg w-full animate-slide-up">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                      <BellOff className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">
                    Unsubscribe from AutoPilotAI
                  </h1>

                  <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
                    We understand. We'll remove the following email from our mailing list:
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email Address</p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white break-all">
                      {email || 'No email provided'}
                    </p>
                  </div>

                  {state === 'error' && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 flex gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        {errorMessage}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleUnsubscribe}
                      disabled={state === 'loading'}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      {state === 'loading' && <Loader className="w-5 h-5 animate-spin" />}
                      {state === 'loading' ? 'Processing...' : 'Confirm Unsubscribe'}
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      disabled={state === 'loading'}
                      className="w-full px-6 py-3 glass-light text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-300 disabled:opacity-50"
                    >
                      Cancel
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
                    This action cannot be undone from this page. If you change your mind, you can resubscribe through our website.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default UnsubscribePage;
