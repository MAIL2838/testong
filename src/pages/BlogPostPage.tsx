import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import Container from '../components/Container';
import SEO from '../components/SEO';
import { getBlogPost, blogPosts } from '../data/blogPosts';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import Button from '../components/Button';

// Stat Citation component for E-E-A-T signals
const StatCitation: React.FC<{ stat: string; context: string; source?: string }> = ({
  stat,
  context,
  source,
}) => (
  <span className="inline-block bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 px-3 py-1 rounded-r">
    <span className="font-bold text-blue-700 dark:text-blue-300">{stat}</span>
    {source && <span className="text-xs text-blue-600 dark:text-blue-400 ml-2">(Source: {source})</span>}
  </span>
);

// Blog content components
const AITrendsBlogContent: React.FC = () => (
  <div className="prose prose-gray dark:prose-invert max-w-none">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      The AI Revolution is Here
    </h3>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      2025 marks a pivotal year for artificial intelligence adoption across industries. From small
      startups to enterprise giants, businesses are leveraging AI to transform operations, enhance
      customer experiences, and drive unprecedented growth.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      1. Conversational AI Becomes Mainstream
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Advanced chatbots and voice assistants are no longer luxury features—they're essential
      business tools. Companies report <StatCitation stat="60% faster response times" context="through AI chatbots" source="Industry surveys 2025" /> and <StatCitation stat="40% higher customer satisfaction rates" context="with automated support" source="Gartner" />.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      2. Automated Workflow Integration
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Seamless integration between AI systems and existing business workflows is eliminating manual
      processes. Organizations are seeing <StatCitation stat="50% reduction in operational overhead" context="through workflow automation" source="McKinsey Digital Report 2025" />.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      3. Predictive Analytics for Everyone
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      AI-powered analytics are democratizing data insights, making predictive capabilities
      accessible to businesses of all sizes. Real-time decision making is becoming the new
      standard.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      4. Hyper-Personalization at Scale
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      AI enables personalized experiences for millions of customers simultaneously. E-commerce
      platforms report <StatCitation stat="35% increase in conversion rates" context="through AI-driven personalization" source="Deloitte Consumer Insights" /> through AI-driven personalization.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      5. AI-First Business Models
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Companies are building AI into their core business strategy from day one. This approach is
      creating new revenue streams and competitive advantages that traditional businesses struggle
      to match.
    </p>

    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700 my-8">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        Ready to Join the AI Revolution?
      </h4>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Don't let your competitors get ahead. Start your AI transformation today with
        AutoPilotAI's comprehensive automation solutions.
      </p>
    </div>
  </div>
);

const AIAutomation2026BlogContent: React.FC = () => (
  <div className="prose prose-gray dark:prose-invert max-w-none">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      The AI Tipping Point Is Closer Than You Think
    </h3>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Businesses aren't just experimenting with AI anymore—they're restructuring entire operations
      around it. According to multiple market forecasts, <StatCitation stat="over 90% of companies will depend on AI automation" context="in some form by 2026" source="Forrester & Gartner 2025" />. That's not a buzzword prediction—it's a hard shift already
      happening in plain sight.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      The Shift From Efficiency to Necessity
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      In 2023, AI was viewed as a productivity enhancer. By 2025, it's become mission-critical.
      Startups automate onboarding. Retailers use AI to manage customer tickets. Even healthcare
      providers are letting virtual assistants handle appointment flows.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Companies not using AI aren't just slow—they're falling irreversibly behind.
    </p>

    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl p-6 border-l-4 border-purple-500 my-6">
      <p className="text-gray-800 dark:text-gray-200 italic text-lg leading-relaxed">
        "We didn't have a choice. Our competitors were closing support tickets before we could even
        open them."
      </p>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">— Logistics startup founder</p>
    </div>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      It's Not Just About Cost-Cutting, It's About Growth
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      AI isn't just replacing tasks; it's unlocking scale.
    </p>

    <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl p-6 border border-green-200 dark:border-green-700 my-6">
      <h5 className="font-bold text-gray-900 dark:text-white mb-2">Real Success Story</h5>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        An e-commerce brand using AutoPilotAI saw <StatCitation stat="62% drop in ticket response time" context="verified by enterprise audit" source="AutoPilotAI Client Case Study" /> while simultaneously expanding into 3 new regions without hiring additional agents.
      </p>
    </div>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Why Businesses That Delay Will Struggle
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Here's what late adopters will face by 2026:
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div className="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 border border-red-200 dark:border-red-700">
        <h6 className="font-semibold text-red-800 dark:text-red-300 mb-2">24/7 Demand Gap</h6>
        <p className="text-red-700 dark:text-red-400 text-sm">
          Inability to meet round-the-clock customer expectations
        </p>
      </div>
      <div className="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
        <h6 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
          Manual Workflow Costs
        </h6>
        <p className="text-orange-700 dark:text-orange-400 text-sm">
          Wasted resources on repetitive, automatable tasks
        </p>
      </div>
      <div className="bg-yellow-50 dark:bg-yellow-900/30 rounded-lg p-4 border border-yellow-200 dark:border-yellow-700">
        <h6 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
          Slow Decision-Making
        </h6>
        <p className="text-yellow-700 dark:text-yellow-400 text-sm">
          Fragmented data leading to delayed business decisions
        </p>
      </div>
      <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
        <h6 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Revenue Loss</h6>
        <p className="text-purple-700 dark:text-purple-400 text-sm">
          Poor customer retention due to subpar experiences
        </p>
      </div>
    </div>

    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      And by the time they consider AI, competitors will already have fully autonomous systems in
      place.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Final Thought: Adapt or Fade
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      The future isn't AI-assisted—it's AI-powered. And 2026 isn't far away.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Your business can either adapt now or risk becoming irrelevant.
    </p>

    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Don't Wait Until 2026</h4>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Start your AI transformation today. Join the businesses that are already ahead of the curve
        with AutoPilotAI's proven automation solutions.
      </p>
    </div>
  </div>
);

const CustomerSupportBlogContent: React.FC = () => (
  <div className="prose prose-gray dark:prose-invert max-w-none">
    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
      From Reactive to Proactive Support: The Shift No One Saw Coming
    </h3>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      In late 2024, one of our early enterprise partners—a fast-growing fintech startup—faced an
      all-too-familiar problem: support tickets were growing faster than their team could hire.
      Their average resolution time was 18+ hours, and nearly 22% of tickets were left unresolved
      by week's end.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      That's when they asked AutoPilotAI to step in.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Workflow Automation That Understands Support Context
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      We didn't build a chatbot. We built a decision-making agent.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Using intelligent routing, AI-classified tags, and a memory-based priority engine, the
      system:
    </p>
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6 ml-4">
      <li>Instantly understood the intent and tone of each ticket.</li>
      <li>Auto-classified requests into categories like "Billing", "Technical", "Urgent Refund".</li>
      <li>
        Triggered customized workflows—some escalated to human agents, others were fully resolved
        by the AI within seconds.
      </li>
    </ul>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      In less than 2 weeks, they were seeing <StatCitation stat="43% drop in average resolution time" context="verified by client metrics" source="AutoPilotAI Client Case Study" />.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Human Agents + AI Agents: The Co-Pilot Model
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Unlike traditional automation that replaces support teams, we built co-pilot logic.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Human agents were looped in only when:
    </p>
    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6 ml-4">
      <li>A workflow required approval (e.g., refund above $1,000).</li>
      <li>Sentiment dropped below a certain threshold.</li>
      <li>Or if users responded with questions the AI wasn't trained for.</li>
    </ul>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This meant support agents could focus on high-emotion, high-impact cases, rather than
      password resets and shipping confirmations.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Real Results, Zero Guesswork
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">By February 2025:</p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-700">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          <StatCitation stat="67%" context="" source="Q1 2025 Metrics" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          of all Tier 1 support queries handled end-to-end by AutoPilotAI
        </p>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/30 rounded-lg p-4 text-center border border-green-200 dark:border-green-700">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
          <StatCitation stat="78% → 91%" context="" source="CSAT Tracking" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">
          Customer Satisfaction Score improvement
        </p>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-700">
        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
          <StatCitation stat="$11,200" context="" source="Monthly Verified" />
        </div>
        <p className="text-gray-700 dark:text-gray-300 text-sm">monthly savings in support costs</p>
      </div>
    </div>

    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      They saved $11,200/month in support costs—without laying off a single employee.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>Most importantly?</strong>
      <br />
      Support stopped being a cost center—and became a growth engine.
    </p>

    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
      Want This for Your Support Team?
    </h4>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      We're now onboarding new clients on a rolling basis.
    </p>
    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Spots for Q3 2025 are nearly full.
    </p>

    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
        Transform Your Support Team Today
      </h4>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        See if your support team qualifies for our proven automation solutions. Join the companies
        already seeing 67% automation rates and 91% customer satisfaction.
      </p>
    </div>
  </div>
);

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPost(slug || '');

  if (!post) {
    return (
      <>
        <SEO title="Article Not Found - AutoPilotAI Blog" />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <Header />
          <main className="pt-40">
            <Container>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Article Not Found
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  The article you're looking for doesn't exist.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </div>
            </Container>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const relatedPosts = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );

  const schemaData = [
    {
      '@context': 'https://schema.org',
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
      publisher: {
        '@type': 'Organization',
        name: 'AutoPilotAI',
        logo: 'https://i.postimg.cc/DzwJ1cyC/Autopilot-AI-logo.png',
      },
      wordCount: 1200,
      articleSection: post.category,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://autopilotaihq.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://autopilotaihq.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.category,
          item: `https://autopilotaihq.com/blog?category=${post.category}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: post.title,
          item: `https://autopilotaihq.com/blog/${post.slug}`,
        },
      ],
    },
  ];

  const renderBlogContent = () => {
    switch (post.slug) {
      case 'top-5-ai-trends-2025':
        return <AITrendsBlogContent />;
      case 'why-businesses-rely-on-ai-automation-2026':
        return <AIAutomation2026BlogContent />;
      case 'how-autopilotai-powers-customer-support':
        return <CustomerSupportBlogContent />;
      default:
        return null;
    }
  };

  return (
    <>
      <SEO
        title={`${post.title} - AutoPilotAI Blog`}
        description={post.description}
        canonicalUrl={`https://autopilotaihq.com/blog/${post.slug}`}
        ogType="article"
        ogImageAlt={`${post.title} - AutoPilotAI Blog`}
        twitterImageAlt={`${post.title} - AutoPilotAI Blog`}
        keywords={post.tags}
        author={post.author}
        authorUrl="https://autopilotaihq.com"
        publishedDate={post.publishedDate}
        updatedDate={post.updatedDate}
        schema={schemaData}
        hreflangs={[
          { lang: 'en', url: `https://autopilotaihq.com/blog/${post.slug}` },
          { lang: 'en-IN', url: `https://autopilotaihq.com/blog/${post.slug}` },
        ]}
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
        <Header />
        <main className="pt-20">
          <Container>
            {/* Back Button */}
            <div className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </div>

            {/* Article Header */}
            <article className="max-w-3xl mx-auto mb-20">
              {/* Breadcrumb */}
              <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                Blog / {post.category}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{post.author}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{post.authorRole}</p>
                      {post.authorCredentials && post.authorCredentials.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {post.authorCredentials.map((credential, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium"
                            >
                              ✓ {credential}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Published {new Date(post.publishedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  {post.updatedDate && (
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                      <span>
                        Updated {new Date(post.updatedDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-16">
                {renderBlogContent()}
              </div>

              {/* CTA Section */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-8 border border-blue-200 dark:border-blue-700 mb-16 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Ready to Transform Your Business?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Join hundreds of companies using AutoPilotAI to automate their operations and
                  scale effortlessly.
                </p>
                <Button variant="gradient">
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                    Related Articles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        to={`/blog/${relatedPost.slug}`}
                        className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group p-6 flex flex-col"
                      >
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                            {relatedPost.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </Container>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
};

export default BlogPostPage;
