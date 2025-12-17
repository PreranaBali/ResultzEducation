import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Linkedin, 
  Twitter, 
  Youtube, 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  CheckCircle2,
  Locate,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Animated Stats State
  const [counters, setCounters] = useState({
    students: 0,
    mentors: 0,
    courses: 0,
    placement: 0
  });

  // Counter Animation Logic
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

    animateCounter(25000, 'students');
    animateCounter(500, 'mentors');
    animateCounter(150, 'courses');
    animateCounter(94, 'placement');
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setSelectedCategory('');
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@resultzeducation.com',
      subInfo: 'Response within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      info: '+91 99646 66544',
      subInfo: 'Mon-Fri 9AM to 6PM IST'
    },
    {
      icon: Locate,
      title: 'Headquarters',
      info: 'Jayanagar, Bangalore',
      subInfo: '#14/1, 3rd Floor, 40th Cross, 8th Main'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300">
      {/* Custom Scoped Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        .map-dark-filter {
          filter: invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        .glass-card {
          background: rgba(26, 26, 26, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(249, 176, 62, 0.1);
        }
      `}} />

      {/* Hero Header */}
      <section className="relative pt-20 pb-12 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[#f9b03e]/5 blur-[120px] rounded-full"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] bg-clip-text text-transparent mb-4">
            Connect With Us
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a question about our programs or career paths? Our expert consultants are ready to help you take the next step.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Learners', value: counters.students, icon: GraduationCap, suffix: '+' },
            { label: 'Mentors', value: counters.mentors, icon: Users, suffix: '+' },
            { label: 'Courses', value: counters.courses, icon: BookOpen, suffix: '+' },
            { label: 'Success', value: counters.placement, icon: Award, suffix: '%' },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-2xl text-center hover:border-[#f9b03e]/30 transition-all">
              <stat.icon className="w-6 h-6 text-[#f9b03e] mx-auto mb-2 opacity-80" />
              <div className="text-2xl font-bold text-white">{stat.value}{stat.suffix}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Interaction Section */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          
          {/* Form Side */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 rounded-3xl">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-[#f9b03e]" />
                Direct Inquiry
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">Full Name</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-[#f9b03e]/40 outline-none transition-all text-white" 
                      placeholder="Jane Doe" 
                      required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 ml-1">Email Address</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-[#f9b03e]/40 outline-none transition-all text-white" 
                      placeholder="jane@example.com" 
                      required 
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Subject</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-[#f9b03e]/40 outline-none transition-all text-white"
                    required
                  >
                    <option value="" disabled>Choose inquiry type</option>
                    <option value="admission">Admissions</option>
                    <option value="tech">Technical Support</option>
                    <option value="career">Career Counseling</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-500 ml-1">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4" 
                    className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 focus:border-[#f9b03e]/40 outline-none transition-all text-white resize-none" 
                    placeholder="Tell us how we can help..." 
                    required 
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] font-bold py-4 rounded-xl hover:shadow-[0_0_20px_rgba(249,176,62,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Processing..." : <>Send Message <ArrowRight className="w-4 h-4" /></>}
                </button>

                {showSuccess && (
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-200">Message sent! We'll be in touch soon.</span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Details Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 rounded-3xl h-full flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-8">Reach Us Directly</h3>
                <div className="space-y-8">
                  {contactMethods.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="p-3 bg-[#f9b03e]/10 rounded-xl group-hover:bg-[#f9b03e]/20 transition-colors">
                        <item.icon className="w-5 h-5 text-[#f9b03e]" />
                      </div>
                      <div>
                        <div className="text-white font-medium mb-1">{item.title}</div>
                        <div className="text-sm text-gray-300">{item.info}</div>
                        <div className="text-xs text-gray-500 mt-1 italic">{item.subInfo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5">
                <div className="flex gap-4">
                  {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="p-3 bg-white/5 rounded-full hover:bg-[#f9b03e]/20 hover:text-[#f9b03e] transition-all">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#f9b03e] text-xs font-bold tracking-[0.2em] uppercase">Find our Campus</span>
              <h2 className="text-3xl font-bold text-white mt-2">Locate Resultz Education</h2>
            </div>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=12.917948,77.584417" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-[#f9b03e] hover:underline"
            >
              Get Directions <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="relative rounded-[2rem] overflow-hidden border border-[#f9b03e]/20 group shadow-2xl">
            {/* Map Iframe */}
            <div className="h-[500px] w-full bg-[#1a1a1a]">
              <iframe
                title="Resultz Education Location"
                src="https://maps.google.com/maps?q=12.917948,77.584417&t=&z=17&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 map-dark-filter grayscale-[0.5]"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Custom Interactive Overlay */}
            <div className="absolute top-6 left-6 md:top-auto md:bottom-8 md:left-8">
              <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#f9b03e] to-[#ff7a00] rounded-xl flex items-center justify-center text-[#0a0a0a] font-bold text-xl">
                    R
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Resultz Education</h4>
                    <p className="text-gray-400 text-xs leading-relaxed mt-1">
                      #14/1, 3rd Floor, 40th Cross, Jayanagar 5th Block, Bengaluru
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  <span>Open: Mon - Sat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-style CTA */}
      <section className="px-4 py-20 bg-gradient-to-b from-transparent to-[#f9b03e]/5">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 rounded-[3rem]">
          <h2 className="text-3xl font-bold text-white mb-4">Start Your Transformation Today</h2>
          <p className="text-gray-400 mb-8">Join our community of over 25,000 successful students worldwide.</p>
          <button 
            onClick={() => navigate('/courses')}
            className="px-8 py-4 bg-white text-[#0a0a0a] font-bold rounded-full hover:scale-105 transition-transform"
          >
            Explore Programs
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;