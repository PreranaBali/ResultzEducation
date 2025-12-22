import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Target, Heart, Users, Award, TrendingUp, Globe, MessageCircle, Sparkles, Check } from 'lucide-react';
import FlowingMenu from './utils/FlowingMenu';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const [counters, setCounters] = useState({
    lives: 0,
    companies: 0,
    success: 0,
    rating: 0,
    mentors: 0,
    awards: 0
  });
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRefs = useRef([]);
  const markerRefs = useRef([]);
  const containerRef = useRef(null);
  const [pointerTop, setPointerTop] = useState(0);

  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];
  
  // Animated counters
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const increment = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 16);
    };

    animateCounter(25000, 'lives');
    animateCounter(150, 'companies');
    animateCounter(98, 'success');
    animateCounter(4.9, 'rating');
    animateCounter(50, 'mentors');
    animateCounter(12, 'awards');
  }, []);

  const timeline = [
    { year: '2019', event: 'Started with 5 volunteer mentors', icon: '🌱', image: 'https://picsum.photos/seed/mentor/400/250' },
    { year: '2020', event: 'Launched online platform during pandemic', icon: '💻', image: 'https://picsum.photos/seed/remote/400/250' },
    { year: '2021', event: 'Reached 10,000+ students guided', icon: '🎯', image: 'https://picsum.photos/seed/success/400/250' },
    { year: '2023', event: 'Expanded to 15 countries', icon: '🌍', image: 'https://picsum.photos/seed/global/400/250' },
    { year: '2024', event: 'Introduced AI-powered career matching', icon: '🤖', image: 'https://picsum.photos/seed/ai/400/250' }
  ];

  // Scroll observer for snapping pointer
  useEffect(() => {
    const observers = timelineRefs.current.map((el, i) => {
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveIndex(i);
          });
        },
        { threshold: 0.6 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  useEffect(() => {
    const marker = markerRefs.current[activeIndex];
    const container = containerRef.current;
    if (marker && container) {
      const markerRect = marker.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const relTop = markerRect.top - containerRect.top + markerRect.height / 2;
      setPointerTop(relTop);
    }
  }, [activeIndex]);

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image: 'https://i.pravatar.cc/150?img=1',
      message: 'The personalized guidance changed everything. I went from confused college student to landing my dream job in just 8 months.'
    },
    {
      name: 'Michael Torres',
      role: 'Entrepreneur',
      image: 'https://i.pravatar.cc/150?img=3',
      message: 'Not just career advice—they helped me discover what I truly wanted. Now running my own startup!'
    },
    {
      name: 'Priya Sharma',
      role: 'Data Scientist',
      image: 'https://i.pravatar.cc/150?img=5',
      message: "The mentors genuinely care. They stayed with me through rejections and celebrated my wins. Couldn't have done it without them."
    }
  ];

  const features = [
    { icon: '🎯', title: 'Personalized Approach', desc: 'Your journey is unique. We tailor everything to fit your goals, skills, and dreams.' },
    { icon: '💡', title: 'Expert Mentors', desc: "Learn from professionals who've walked the path and love sharing their wisdom." },
    { icon: '🚀', title: 'Proven Methods', desc: "Our framework has helped thousands. We know what works and what doesn't." },
    { icon: '❤', title: 'Genuine Support', desc: "We celebrate your wins and stand by you through challenges. You're never alone." },
    { icon: '📊', title: 'Data-Driven Insights', desc: 'Smart tools and analytics to make informed decisions about your future.' },
    { icon: '🌍', title: 'Global Network', desc: 'Connect with opportunities and mentors worldwide. Your career has no borders.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Subtle animations only */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* Hero Section - Professional */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="mb-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#f9b03e] via-[#ff7a00] to-[#ffd35c] bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Empowering dreams, one journey at a time
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission - Cleaner */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a]/50 rounded-2xl p-8 border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all">
              <div className="bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] rounded-xl p-3 w-fit mb-4">
                <Target className="h-6 w-6 text-[#0a0a0a]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                A world where everyone discovers their true potential and builds careers they love. We see a future where career decisions are confident, informed, and aligned with personal passions.
              </p>
            </div>
            <div className="bg-[#1a1a1a]/50 rounded-2xl p-8 border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all">
              <div className="bg-gradient-to-r from-[#ff7a00] to-[#ffd35c] rounded-xl p-3 w-fit mb-4">
                <Heart className="h-6 w-6 text-[#0a0a0a]" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                We guide students and professionals through personalized career discovery, providing expert mentorship, cutting-edge tools, and unwavering support to transform career confusion into clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Interactive Timeline Section - Professional */}
      <section className="px-4 py-16 bg-[#0a0a0a]/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-4 text-white">
            Our Journey
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            From a small team of mentors to a global platform helping thousands achieve their career goals
          </p>

          {/* Enhanced Timeline */}
          <div className="relative" ref={containerRef}>
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#f9b03e]/30 to-[#ffd35c]/30"></div>

            {/* Active Pointer */}
            <div
              className="absolute left-1/2 w-4 h-4 rounded-full border-2 border-[#0a0a0a] bg-[#f9b03e] transition-all duration-500 ease-out z-20"
              style={{ top: `${pointerTop}px`, transform: 'translate(-50%, -50%)' }}
            ></div>

            {timeline.map((item, i) => (
              <div
                key={i}
                ref={(el) => (timelineRefs.current[i] = el)}
                className={`flex flex-col md:flex-row items-center mb-16 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Text */}
                <div className="flex-1 px-6">
                  <div
                    className={`bg-[#1a1a1a]/50 rounded-xl p-6 border transition-all duration-500 ${
                      activeIndex === i 
                        ? 'border-[#f9b03e]/40 bg-[#1a1a1a]/80' 
                        : 'border-[#f9b03e]/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-semibold text-[#f9b03e] text-lg">{item.year}</span>
                    </div>
                    <p className="text-gray-300">{item.event}</p>
                  </div>
                </div>

                {/* Marker */}
                <div
                  ref={(el) => (markerRefs.current[i] = el)}
                  className={`w-4 h-4 rounded-full border-2 border-[#0a0a0a] z-10 transition-all duration-500 ${
                    activeIndex === i
                      ? 'bg-[#f9b03e] scale-125'
                      : 'bg-[#f9b03e]/40'
                  }`}
                ></div>

                {/* Image */}
                <div className="flex-1 px-6 mt-6 md:mt-0 flex justify-center">
                  <img
                    src={item.image}
                    alt={item.year}
                    className={`w-80 h-52 object-cover rounded-xl transition-all duration-700 ease-out border ${
                      activeIndex === i
                        ? 'scale-105 opacity-100 border-[#f9b03e]/30'
                        : 'scale-95 opacity-60 border-transparent'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-center mt-12 text-gray-500 italic">The journey continues...</p>
        </div>
      </section>

      {/* Achievements - Professional */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-10 text-white">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { value: counters.lives, suffix: '+', label: 'Lives Transformed' },
              { value: counters.companies, suffix: '+', label: 'Partner Companies' },
              { value: counters.success, suffix: '%', label: 'Success Rate' },
              { value: counters.rating.toFixed(1), suffix: '★', label: 'Average Rating' },
              { value: counters.mentors, suffix: '+', label: 'Expert Mentors' },
              { value: counters.awards, suffix: '', label: 'Industry Awards' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-[#1a1a1a]/50 rounded-xl p-6 text-center border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all"
              >
                <div className="text-3xl font-semibold text-white mb-1">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Career Guidance Section - Professional */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-8 border border-[#f9b03e]/10">
            <h2 className="text-2xl font-semibold mb-2 text-center text-white">Have Questions About Your Career?</h2>
            <p className="text-center mb-6 text-gray-400">We're here to help you navigate your journey. No question is too small or too big.</p>
            
            <div className="space-y-4">
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question... (we reply personally)"
                className="w-full p-4 rounded-lg bg-[#0a0a0a]/50 text-white placeholder-gray-500 resize-none h-24 focus:outline-none focus:border focus:border-[#f9b03e]/30 border border-[#f9b03e]/10 transition-colors"
              />
              
              <div className="flex flex-wrap gap-3">
                {['Looking for Guidance', 'Want to Collaborate', 'Need Direction'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      selectedOption === option 
                        ? 'bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a]' 
                        : 'bg-[#0a0a0a]/50 hover:bg-[#0a0a0a]/80 text-gray-300 border border-[#f9b03e]/10'
                    }`}
                  >
                    {selectedOption === option && <Check className="inline w-4 h-4 mr-1" />}
                    {option}
                  </button>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] font-semibold py-3 rounded-lg hover:shadow-lg transition-all">
                Send Your Question
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Professional */}
      <section className="px-4 py-16 bg-[#0a0a0a]/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-10 text-white">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-[#1a1a1a]/50 rounded-xl p-6 border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all"
              >
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Professional */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-10 border border-[#f9b03e]/10">
            <Sparkles className="w-10 h-10 mx-auto mb-4 text-[#f9b03e]" />
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-gray-400 mb-6">
              Your dream career is closer than you think. Let's take the first step together.
            </p>
            <button  onClick={() => navigate('/courses')} className="bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] font-semibold py-3 px-8 rounded-lg hover:shadow-lg transition-all inline-flex items-center">
              Get Started Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;