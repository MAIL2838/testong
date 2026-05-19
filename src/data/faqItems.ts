export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

export const faqItems: FAQItem[] = [
  {
    id: 'what-are-ai-agents',
    question: 'What exactly are Custom AI Agents, and how can they benefit my business?',
    answer:
      'Custom AI Agents are intelligent, conversational systems we build specifically for your business that automate interactions with your customers and prospects. They can handle lead generation by engaging website visitors, qualify leads by asking targeted questions, and provide 24/7 customer support without human intervention. We deploy them as voice agents (phone-based) or text bots (chat/messaging), seamlessly integrated into your existing systems. Benefits include reduced operational costs, faster response times, increased lead capture, and the ability to handle unlimited simultaneous interactions.',
    category: 'AI Agents',
    keywords: ['AI agents', 'voice agents', 'text bots', 'lead generation', 'customer support', 'automation'],
  },
  {
    id: 'lead-qualification-process',
    question: 'How do your AI Agents qualify leads automatically?',
    answer:
      'Our AI Agents use natural language processing to engage prospects in intelligent conversations, asking strategic qualifying questions about their budget, timeline, pain points, and authority to make decisions. The agent scores and categorizes leads in real-time based on predefined criteria, automatically routing high-quality leads to your sales team and lower-quality leads to nurture sequences. This ensures your team focuses on the most promising opportunities, dramatically improving conversion rates and sales efficiency.',
    category: 'AI Agents',
    keywords: ['lead qualification', 'lead scoring', 'sales automation', 'intelligent routing', 'conversion'],
  },
  {
    id: 'workflow-automation-examples',
    question: 'What kinds of business processes can be automated with Advanced Workflow Automations?',
    answer:
      'We automate virtually any repetitive business process, including: lead capture from web forms and follow-up sequences, appointment scheduling across multiple calendars, invoice generation and payment reminders, customer onboarding workflows, data entry and validation, multi-step approval processes, and cross-system data synchronization. Our workflows eliminate manual tasks, reduce human error, and ensure consistent processes. Each automation is customized to your exact business logic and requirements.',
    category: 'Workflows',
    keywords: ['workflow automation', 'business processes', 'data automation', 'scheduling', 'lead nurturing'],
  },
  {
    id: 'crm-email-integration',
    question: 'How do you integrate with our existing CRM, email, and database systems?',
    answer:
      'We build seamless API integrations connecting your existing tools—whether it\'s Salesforce, HubSpot, Pipedrive, your custom database, email service, or other business applications. Our integrations enable real-time data flow between systems, ensuring information is always current and eliminating manual data entry. We map your existing workflows to these connections, creating automated pipelines where new leads flow directly to your CRM, customer interactions are logged automatically, and internal systems stay synchronized. All integrations are secure, encrypted, and comply with your data protection requirements.',
    category: 'Integrations',
    keywords: ['CRM integration', 'API integration', 'data synchronization', 'Salesforce', 'HubSpot', 'custom database'],
  },
  {
    id: 'industry-specific-solutions',
    question: 'Do you have specialized solutions for specific industries?',
    answer:
      'Yes, we have deep expertise in E-commerce, Healthcare, Real Estate, Agencies, and IT sectors. For E-commerce, we automate order processing, customer support, and post-purchase follow-up. In Healthcare, we handle patient appointment scheduling, intake forms, and follow-up communications while maintaining HIPAA compliance. For Real Estate, our agents schedule property viewings and qualify buyers. Agencies benefit from client onboarding, project management automation, and proposal workflows. IT companies use our solutions for support ticket routing, software license renewals, and technical troubleshooting. Each solution is tailored to industry-specific workflows and compliance requirements.',
    category: 'Industries',
    keywords: ['industry-specific', 'ecommerce', 'healthcare', 'real estate', 'agencies', 'IT', 'compliance'],
  },
  {
    id: 'implementation-consultation',
    question: 'What does the implementation and consultation process look like?',
    answer:
      'We begin with a comprehensive discovery consultation where we understand your business, current systems, pain points, and automation goals. Our experts audit your existing processes and identify optimization opportunities. We then create a detailed roadmap showing what will be automated, the timeline, and expected ROI. Once approved, our development team builds and configures your AI agents, workflows, and integrations. Throughout, we provide regular updates and training. Most projects launch within 2-6 weeks depending on complexity. We handle all technical aspects so you can focus on your business.',
    category: 'Getting Started',
    keywords: ['implementation', 'consultation', 'discovery', 'onboarding', 'timeline', 'ROI'],
  },
  {
    id: 'data-security-compliance',
    question: 'How do you ensure my data is secure and compliant?',
    answer:
      'Security is our top priority. We implement enterprise-grade encryption (AES-256) for all data in transit and at rest. Our systems comply with GDPR, CCPA, HIPAA (for healthcare), and industry-specific regulations. We conduct regular security audits, penetration testing, and maintain SOC 2 Type II certification. Your data is never shared with third parties without explicit permission, and we maintain detailed audit trails for compliance reporting. All integrations use secure API tokens and OAuth flows. We also provide data residency options for companies with specific geographic requirements.',
    category: 'Security',
    keywords: ['security', 'encryption', 'GDPR', 'HIPAA', 'compliance', 'data protection', 'CCPA'],
  },
  {
    id: 'voice-agent-capabilities',
    question: 'What are the capabilities and limitations of your Voice Agents?',
    answer:
      'Our Voice Agents handle complex conversations including lead qualification, appointment scheduling, customer support, and information collection. They understand context, handle customer objections, and route to humans when needed. They support multiple languages, can handle accents and background noise, and provide real-time transcripts. Capabilities include integrating with phone systems, logging calls to your CRM, and transferring to live agents seamlessly. Limitations include that very specialized legal/medical advice still requires human review, and they work best for initial contact and qualification—complex negotiations typically need human interaction. Performance improves as the agent learns from interactions.',
    category: 'AI Agents',
    keywords: ['voice agents', 'phone automation', 'lead qualification', 'call handling', 'IVR'],
  },
  {
    id: 'roi-and-measurable-results',
    question: 'What kind of ROI and measurable results should we expect?',
    answer:
      'Most clients see significant returns within the first 90 days. Typical results include: 40-60% reduction in manual operational time, 50-70% increase in lead capture volume, 30-50% improvement in lead response time, and 25-40% increase in conversion rates. Cost savings average 35-55% reduction in customer support expenses. Real estate clients report 3-5x increase in appointments booked. E-commerce clients see 20-30% increase in order processing speed. Healthcare practices reduce no-show rates by 40-50%. We provide detailed tracking and reporting so you can measure results continuously. ROI typically appears within 6-12 months.',
    category: 'Benefits',
    keywords: ['ROI', 'results', 'metrics', 'cost savings', 'efficiency', 'conversion', 'revenue'],
  },
  {
    id: 'customization-and-scalability',
    question: 'How customizable are your solutions, and can they scale as we grow?',
    answer:
      'Complete customization is standard. We don\'t use templates—every AI agent, workflow, and integration is built for your specific business logic, terminology, and brand voice. You define the exact questions the agent asks, how it routes interactions, what data it collects, and how it integrates with your systems. As you grow, your automations scale seamlessly. An agent handling 50 leads daily can instantly handle 5,000. Our infrastructure supports unlimited data processing and integrations. You pay only for what you use, and we can add new capabilities—new integrations, additional agents, more complex workflows—on demand without disrupting existing operations.',
    category: 'Features',
    keywords: ['customization', 'scalability', 'flexibility', 'growth', 'enterprise'],
  },
];

export function getFAQByCategory(category: string): FAQItem[] {
  return faqItems.filter((item) => item.category === category);
}

export function getFAQCategories(): string[] {
  return Array.from(new Set(faqItems.map((item) => item.category)));
}

export function searchFAQ(query: string): FAQItem[] {
  const normalizedQuery = query.toLowerCase();
  return faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.answer.toLowerCase().includes(normalizedQuery) ||
      item.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedQuery))
  );
}
