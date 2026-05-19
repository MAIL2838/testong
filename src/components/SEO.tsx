import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'AutoPilotAI';
const BASE_URL = 'https://autopilotaihq.com';
const LOGO_URL = 'https://i.postimg.cc/DzwJ1cyC/Autopilot-AI-logo.png';
const DEFAULT_OG_IMAGE = LOGO_URL;
const DEFAULT_TWITTER_IMAGE = LOGO_URL;

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  ogImageAlt?: string;
  twitterImage?: string;
  twitterImageAlt?: string;
  twitterCard?: string;
  keywords?: string[];
  author?: string;
  authorUrl?: string;
  publishedDate?: string;
  updatedDate?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  hreflangs?: Array<{ lang: string; url: string }>;
}

const SEO: React.FC<SEOProps> = ({
  title = `${SITE_NAME} - AI Automation for Customer Support, Scheduling & Lead Capture`,
  description = 'AutoPilotAI automates customer support, scheduling, lead capture, and more with intelligent AI. Start automating your business today with our no-code platform.',
  canonicalUrl = BASE_URL,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  twitterImage = DEFAULT_TWITTER_IMAGE,
  twitterImageAlt,
  twitterCard = 'summary_large_image',
  keywords = [
    'AI automation',
    'customer support automation',
    'lead capture',
    'scheduling automation',
    'AI chatbot',
  ],
  author = SITE_NAME,
  authorUrl,
  publishedDate,
  updatedDate,
  schema,
  hreflangs = [
    { lang: 'en', url: BASE_URL },
    { lang: 'en-IN', url: BASE_URL },
  ],
}) => {
  const resolvedOgImageAlt = ogImageAlt ?? `${title} - ${SITE_NAME}`;
  const resolvedTwitterImageAlt = twitterImageAlt ?? resolvedOgImageAlt;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: ['Auto Pilot AI', 'AutoPilot AI', 'AutopilotAI'],
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    description,
    foundingDate: '2024',
    sameAs: [
      'https://x.com/AutopilotAiHQ',
      'https://www.instagram.com/AutopilotAiHQ/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8287046925',
      contactType: 'Customer Service',
      email: 'Solution@AutopilotAihq.com',
      areaServed: 'IN',
      availableLanguage: 'en-US',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressLocality: 'India',
    },
  };

  const finalSchema = schema ?? defaultSchema;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <meta name="author" content={author} />
      <meta name="theme-color" content="#3b82f6" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Crawl directives */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Geo Tags */}
      <meta name="geo.country" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedOgImageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twitterImage} />
      <meta name="twitter:image:alt" content={resolvedTwitterImageAlt} />
      <meta name="twitter:creator" content="@AutopilotAiHQ" />
      <meta name="twitter:site" content="@AutopilotAiHQ" />

      {/* Article timestamps (blog posts) */}
      {publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {updatedDate && (
        <meta property="article:modified_time" content={updatedDate} />
      )}
      {authorUrl && (
        <meta property="article:author" content={authorUrl} />
      )}

      {/* hreflang tags for GEO targeting */}
      {hreflangs.map((hreflang) => (
        <link
          key={hreflang.lang}
          rel="alternate"
          hrefLang={hreflang.lang}
          href={hreflang.url}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(finalSchema)}</script>
    </Helmet>
  );
};

export default SEO;
