export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  updatedDate?: string;
  author: string;
  authorRole: string;
  authorCredentials?: string[];
  readTime: number;
  category: string;
  tags: string[];
  excerpt: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'why-businesses-rely-on-ai-automation-2026',
    title: 'Why 90% of Businesses Will Rely on AI Automation by 2026',
    description:
      'AI automation is no longer optional. Discover why over 90% of businesses will depend on intelligent automation by 2026 and what late adopters stand to lose.',
    publishedDate: '2025-06-27',
    updatedDate: '2025-07-15',
    author: 'AutoPilotAI Team',
    authorRole: 'AI Automation Experts',
    authorCredentials: ['10+ years of AI research', 'Published in leading tech publications', 'Trusted by 500+ enterprises'],
    readTime: 4,
    category: 'AI Trends',
    tags: ['AI Automation', 'Business Growth', 'Future of Work', '2026 Trends'],
    excerpt:
      'AI isn\'t a buzzword anymore — it\'s a quiet revolution. From small teams to growing startups, companies that adopt automation today are outpacing their competitors in speed, accuracy, and customer experience.',
  },
  {
    slug: 'how-autopilotai-powers-customer-support',
    title: 'How AutoPilotAI Powers Customer Support',
    description:
      'An in-depth case study of how AutoPilotAI helped a fintech startup cut support resolution time by 43%, handle 67% of Tier 1 tickets autonomously, and save $11,200 per month.',
    publishedDate: '2025-04-12',
    updatedDate: '2025-07-10',
    author: 'AutoPilotAI Team',
    authorRole: 'AI Automation Experts',
    authorCredentials: ['Certified in Business Process Automation', 'Led 100+ enterprise implementations', 'Industry-recognized for ROI optimization'],
    readTime: 4,
    category: 'Case Studies',
    tags: ['Customer Support', 'AI Automation', 'Case Study', 'Fintech'],
    excerpt:
      'Case studies and backend insights on how intelligent routing, AI-classified tags, and a memory-based priority engine transformed a fintech startup\'s support operations.',
  },
  {
    slug: 'top-5-ai-trends-2025',
    title: 'Top 5 AI Trends in 2025',
    description:
      'From conversational AI going mainstream to AI-first business models, explore the five most impactful AI trends reshaping industries in 2025.',
    publishedDate: '2025-05-20',
    updatedDate: '2025-06-30',
    author: 'AutoPilotAI Team',
    authorRole: 'AI Automation Experts',
    authorCredentials: ['Active contributor to ML community', 'Speaker at major tech conferences', 'Advisor to Fortune 500 companies'],
    readTime: 3,
    category: 'AI Trends',
    tags: ['AI Trends', '2025', 'Machine Learning', 'Business Strategy'],
    excerpt:
      '2025 marks a pivotal year for AI adoption. Businesses leveraging AI are transforming operations, enhancing customer experiences, and driving unprecedented growth.',
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
