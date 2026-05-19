import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import Container from '../components/Container';
import SEO from '../components/SEO';
import { blogPosts } from '../data/blogPosts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Button from '../components/Button';

const BlogIndexPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );

  let displayPosts = blogPosts;
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    displayPosts = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  } else if (selectedCategory) {
    displayPosts = blogPosts.filter((post) => post.category === selectedCategory);
  }

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'AutoPilotAI Blog',
      description: 'Latest insights on AI automation, industry trends, and best practices',
      url: 'https://www.autopilotai.in/blog',
      blogPosts: blogPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        image: 'https://i.postimg.cc/DzwJ1cyC/Autopilot-AI-logo.png',
        datePublished: post.publishedDate,
        dateModified: post.updatedDate || post.publishedDate,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        url: `https://www.autopilotai.in/blog/${post.slug}`,
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
          name: 'Blog',
          item: 'https://www.autopilotai.in/blog',
        },
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Blog - AutoPilotAI | AI Automation Insights & Trends"
        description="Read the latest articles on AI automation, business automation trends, customer support strategies, and AI implementation best practices."
        canonicalUrl="https://www.autopilotai.in/blog"
        ogImageAlt="AutoPilotAI Blog - AI Automation Insights & Trends"
        twitterImageAlt="AutoPilotAI Blog - AI Automation Insights"
        keywords={[
          'AI automation blog',
          'automation trends',
          'business automation',
          'customer support',
          'AI insights',
        ]}
        schema={schemaData}
        hreflangs={[
          { lang: 'en', url: 'https://www.autopilotai.in/blog' },
          { lang: 'en-IN', url: 'https://www.autopilotai.in/blog' },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <Container>
            {/* Hero Section */}
            <div className="text-center py-16 md:py-20">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                AutoPilotAI Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Discover the latest insights on AI automation, industry trends, and best
                practices for scaling your business.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search articles..."
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
                All Articles
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

            {/* Blog Posts Grid */}
            <div className="mb-20">
              {displayPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/blog/${post.slug}`}
                      className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                    >
                      <div className="p-6 flex flex-col h-full">
                        {/* Category Badge */}
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Metadata */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span>
                            {new Date(post.publishedDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span>{post.readTime} min read</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Read More Link */}
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-2 transition-all duration-300">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    No articles found matching your search.
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

export default BlogIndexPage;
