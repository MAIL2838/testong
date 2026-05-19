import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/Container';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  highlights: string[];
}

interface TestimonialProps extends TestimonialData {
  index: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  author, 
  role, 
  company, 
  rating, 
  highlights,
  index 
}) => {
  // Create highlighted quote text
  const getHighlightedQuote = (text: string, highlights: string[]) => {
    let highlightedText = text;
    highlights.forEach(highlight => {
      const regex = new RegExp(`(${highlight})`, 'gi');
      highlightedText = highlightedText.replace(
        regex, 
        '<span class="font-semibold text-purple-400">$1</span>'
      );
    });
    return highlightedText;
  };

  // Get first initial for avatar
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div 
      className="glass-card rounded-2xl p-8 h-full flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl dark:hover:shadow-slate-900/50 group min-w-0 flex-shrink-0"
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        animation: `slideUp 0.8s ease-out forwards`,
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="text-blue-600 dark:text-blue-400 mb-6 group-hover:animate-pulse">
        <Quote size={40} />
      </div>
      
      {/* Rating stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
          />
        ))}
      </div>
      
      <p 
        className="text-lg text-gray-700 dark:text-gray-300 mb-8 flex-grow leading-relaxed italic"
        dangerouslySetInnerHTML={{ 
          __html: `"${getHighlightedQuote(quote, highlights)}"` 
        }}
      />
      
      <div className="flex items-center">
        {/* Initials Avatar with Gradient */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mr-4 flex items-center justify-center">
          <span className="text-white font-bold text-lg">
            {getInitial(author)}
          </span>
        </div>
        <div>
          <p className="font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
            {author}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{role}</p>
          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">{company}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const testimonials: TestimonialData[] = [
    {
      quote: "AutoPilotAI transformed our customer support completely. Response times dropped by 85%, and our team can focus on complex issues while AI handles the routine queries flawlessly.",
      author: "Sarah Chen",
      role: "Head of Customer Success",
      company: "TechFlow Solutions",
      rating: 5,
      highlights: ["transformed", "85%", "flawlessly"]
    },
    {
      quote: "The AI phone agents are incredible - our clients can't tell the difference! We've booked 60% more appointments since implementation, and our sales team loves the qualified leads.",
      author: "Marcus Rodriguez",
      role: "Sales Director",
      company: "Growth Dynamics",
      rating: 5,
      highlights: ["incredible", "60% more appointments", "qualified leads"]
    },
    {
      quote: "Implementation was seamless, and the ROI was immediate. Our operational costs decreased by 40% while customer satisfaction scores hit an all-time high. Game-changing technology.",
      author: "Dr. Emily Watson",
      role: "Operations Manager",
      company: "MedTech Innovations",
      rating: 5,
      highlights: ["seamless", "immediate", "40%", "all-time high", "Game-changing"]
    },
    {
      quote: "The lead capture system is pure magic. We're converting 3x more visitors into qualified leads, and the CRM integration means our sales process is completely automated and optimized.",
      author: "James Park",
      role: "Marketing Director",
      company: "Digital Ventures",
      rating: 5,
      highlights: ["pure magic", "3x more", "completely automated"]
    },
    {
      quote: "AutoPilotAI's scheduling system eliminated double bookings entirely. Our appointment no-show rate dropped to under 5%, and client satisfaction with our booking process is through the roof.",
      author: "Lisa Thompson",
      role: "Practice Manager",
      company: "Wellness Center Pro",
      rating: 5,
      highlights: ["eliminated", "under 5%", "through the roof"]
    },
    {
      quote: "The custom AI bot they built for our e-commerce store increased our conversion rate by 45%. It handles product recommendations better than our human staff ever could.",
      author: "David Kim",
      role: "E-commerce Director",
      company: "RetailTech Solutions",
      rating: 5,
      highlights: ["45%", "better than our human staff"]
    }
  ];

  // Get number of slides to show based on screen size
  const getSlidesPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = testimonials.length - 1;

  // Infinite loop navigation functions
  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1;
      return nextIndex;
    });
    
    // Reset transition flag after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex <= 0 ? maxIndex : prevIndex - 1;
      return nextIndex;
    });
    
    // Reset transition flag after animation completes
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-scroll functionality with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [isTransitioning]);

  // Calculate visible testimonials for current view
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < slidesPerView; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        originalIndex: index,
        displayIndex: i
      });
    }
    return visible;
  };

  // Calculate dot indicator position (for progress tracking)
  const getDotIndex = () => {
    return currentIndex % testimonials.length;
  };

  // Calculate progress percentage
  const getProgressPercentage = () => {
    return ((currentIndex % testimonials.length) + 1) / testimonials.length * 100;
  };

  // Handle dot click navigation
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const visibleTestimonials = getVisibleTestimonials();

  const reviewSchema = testimonials.map((testimonial) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(testimonial.rating),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody: testimonial.quote,
    author: {
      '@type': 'Person',
      name: testimonial.author,
    },
    affiliationName: testimonial.company,
  }));

  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: '5',
    bestRating: '5',
    worstRating: '1',
    ratingCount: String(testimonials.length),
    reviewCount: String(testimonials.length),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(aggregateRatingSchema)}</script>
        {reviewSchema.map((schema, index) => (
          <script key={index} type="application/ld+json">{JSON.stringify(schema)}</script>
        ))}
      </Helmet>
      <section id="testimonials" className="py-24 relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pastel-purple/20 dark:bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pastel-green/20 dark:bg-green-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">
            What Our Clients{' '}
            <span className="gradient-text">
              Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed animate-slide-up delay-200">
            Join thousands of businesses transforming with AutoPilotAI
          </p>
        </div>
        
        <div className="relative">
          {/* Testimonials Container with Smooth Infinite Transition */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(0%)`, // Always at 0% since we're managing visible items
            }}
          >
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.originalIndex}-${currentIndex}`} // Unique key for smooth transitions
                className={`${
                  slidesPerView === 1 ? 'w-full' :
                  slidesPerView === 2 ? 'w-1/2' : 'w-1/3'
                } flex-shrink-0`}
                style={{ 
                  paddingRight: index === visibleTestimonials.length - 1 ? '0' : '2rem',
                  opacity: isTransitioning ? 0.7 : 1,
                  transition: 'opacity 0.3s ease-in-out'
                }}
              >
                <Testimonial
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  company={testimonial.company}
                  rating={testimonial.rating}
                  highlights={testimonial.highlights}
                  index={testimonial.displayIndex}
                />
              </div>
            ))}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-center mt-12 space-x-4">
            <button 
              onClick={prevSlide}
              disabled={isTransitioning}
              className="p-3 glass-card rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 pastel-glow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonials"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={isTransitioning}
              className="p-3 glass-card rounded-full text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110 pastel-glow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonials"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === getDotIndex() ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-600 w-2'
                } disabled:cursor-not-allowed`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4 max-w-xs mx-auto">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-500"
                style={{ 
                  width: `${getProgressPercentage()}%` 
                }}
              />
            </div>
            <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              {getDotIndex() + 1} of {testimonials.length}
            </div>
          </div>
        </div>
      </Container>
    </section>
    </>
  );
};

export default TestimonialsSection;