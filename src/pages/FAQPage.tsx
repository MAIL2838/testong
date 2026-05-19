import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import Container from '../components/Container';
import SEO from '../components/SEO';
import { faqItems, getFAQCategories, searchFAQ } from '../data/faqItems';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const FAQPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getFAQCategories();

  let displayItems = faqItems;
  if (searchQuery.trim()) {
    displayItems = searchFAQ(searchQuery);
  } else if (selectedCategory) {
    displayItems = faqItems.filter((item) => item.category === selectedCategory);
  }

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.faq-answer', 'p'],
          },
        },
      })),
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
        {
          '@type': 'ListItem',
          position: 2,
          name: 'FAQ',
          item: 'https://www.autopilotai.in/faq',
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="FAQ - AutoPilotAI | Frequently Asked Questions"
        description="Get answers to common questions about AutoPilotAI. Learn about integrations, security, pricing, and how to get started with AI automation."
        canonicalUrl="https://www.autopilotai.in/faq"
        ogImageAlt="AutoPilotAI - Frequently Asked Questions"
        twitterImageAlt="AutoPilotAI FAQ - Common Questions Answered"
        keywords={[
          'FAQ',
          'help',
          'frequently asked questions',
          'integrations',
          'pricing',
          'support',
        ]}
        schema={schemaData}
        hreflangs={[
          { lang: 'en', url: 'https://www.autopilotai.in/faq' },
          { lang: 'en-IN', url: 'https://www.autopilotai.in/faq' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <Container>
            {/* Hero Section */}
            <div className="text-center py-16 md:py-20">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Find answers to common questions about AutoPilotAI, our features, pricing, and
                support.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedCategory(null);
                  }}
                  className="w-full pl-12 pr-4 py-3 glass-light rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-12 flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  !selectedCategory
                    ? 'bg-blue-600 text-white'
                    : 'glass-light text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                }`}
              >
                All Questions
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchQuery('');
                  }}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'glass-light text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="max-w-3xl mx-auto mb-20">
              {displayItems.length > 0 ? (
                <div className="space-y-4">
                  {displayItems.map((item) => (
                    <div
                      key={item.id}
                      className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === item.id ? null : item.id)
                        }
                        className="w-full p-6 text-left flex justify-between items-start gap-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.question}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {item.category}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          {expandedId === item.id ? (
                            <ChevronUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                          )}
                        </div>
                      </button>

                      {expandedId === item.id && (
                        <div className="px-6 pb-6 animate-slide-up border-t border-gray-200 dark:border-gray-700">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    No questions found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Clear filters
                  </button>
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

export default FAQPage;
