import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, Heart, Users, Award, TrendingUp, Globe, MessageCircle, Sparkles, Check } from 'lucide-react';
import FlowingMenu from './utils/FlowingMenu'
const AboutPage = () => {
  const [counters, setCounters] = useState({
    lives: 0,
    companies: 0,
    success: 0,
    rating: 0,
    mentors: 0,
    awards: 0
  });

  const [question, setQuestion] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

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
    { year: '2019', event: 'Started with 5 volunteer mentors', icon: '🌱' },
    { year: '2020', event: 'Launched online platform during pandemic', icon: '💻' },
    { year: '2021', event: 'Reached 10,000+ students guided', icon: '🎯' },
    { year: '2023', event: 'Expanded to 15 countries', icon: '🌍' },
    { year: '2024', event: 'Introduced AI-powered career matching', icon: '🤖' }
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-pulse"></div>
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 font-light">
            Empowering dreams, one journey at a time
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <span className="inline-block h-2 w-2 rounded-full bg-blue-400 animate-bounce"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-purple-400 animate-bounce delay-100"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-indigo-400 animate-bounce delay-200"></span>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-6 left-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 mb-4 text-2xl font-bold text-gray-800">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where everyone discovers their true potential and builds careers they love. We see a future where career decisions are confident, informed, and aligned with personal passions.
              </p>
            </div>
            <div className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute -top-6 left-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-6 mb-4 text-2xl font-bold text-gray-800">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                We guide students and professionals through personalized career discovery, providing expert mentorship, cutting-edge tools, and unwavering support to transform career confusion into clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-4 py-16 md:py-24 bg-white/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Story
          </h2>
          <div className="mb-12 max-w-3xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              We started with a simple belief: career guidance shouldn't be a luxury—it should be accessible to everyone.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Born from the challenges we faced in our own career journeys, we created a platform that combines human expertise with innovative technology. What began as weekend mentoring sessions in 2019 has grown into a thriving community helping thousands find their path.
            </p>
          </div>
          
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div
                    className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow inline-block">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="font-bold text-blue-600">{item.year}</span>
                      </div>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { value: counters.lives, suffix: '+', label: 'Lives Transformed' },
              { value: counters.companies, suffix: '+', label: 'Partner Companies' },
              { value: counters.success, suffix: '%', label: 'Success Rate' },
              { value: counters.rating.toFixed(1), suffix: '★', label: 'Average Rating' },
              { value: counters.mentors, suffix: '+', label: 'Expert Mentors' },
              { value: counters.awards, suffix: '', label: 'Industry Awards' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className="text-sm text-gray-600 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What People Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 ring-4 ring-blue-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.message}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Guidance Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Have Questions About Your Career?</h2>
            <p className="text-center mb-8 text-blue-100">We're here to help you navigate your journey. No question is too small or too big.</p>
            
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your question... (we reply personally)"
                className="w-full p-4 rounded-xl bg-white/90 text-gray-800 placeholder-gray-500 resize-none h-24 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              
              <div className="flex flex-wrap gap-3 mt-4">
                {['Looking for Guidance', 'Want to Collaborate', 'Need Direction'].map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedOption(option)}
                    className={`px-4 py-2 rounded-full transition-all ${
                      selectedOption === option 
                        ? 'bg-white text-blue-600 shadow-lg' 
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {selectedOption === option && <Check className="inline w-4 h-4 mr-1" />}
                    {option}
                  </button>
                ))}
              </div>
              
              <button className="mt-6 w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5">
                Send Your Question
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4 py-16 md:py-24 bg-white/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-12">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-purple-600" />
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Your dream career is closer than you think. Let's take the first step together.
            </p>
            <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full hover:shadow-xl transition-all hover:-translate-y-1">
              <span className="flex items-center">
                Get Started Today
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      <div style={{ height: '600px', position: 'relative' }}>
        <FlowingMenu items={demoItems} />
      </div>
      </section>
    </div>
  );
};

export default AboutPage;