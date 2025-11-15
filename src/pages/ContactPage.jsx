import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  HeadphonesIcon,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Award,
  Briefcase
} from 'lucide-react';

const ContactPage = () => {
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

  // Professional stats for LMS
  const [counters, setCounters] = useState({
    students: 0,
    mentors: 0,
    courses: 0,
    placement: 0
  });

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setShowSuccess(false), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      info: 'support@learnpath.edu',
      subInfo: 'Response within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      info: '+1 (555) 123-4567',
      subInfo: 'Mon-Fri 9AM to 6PM EST'
    },
    {
      icon: MessageSquare,
      title: 'Student Support',
      info: 'Live chat available',
      subInfo: 'Instant assistance'
    },
    {
      icon: Calendar,
      title: 'Book Consultation',
      info: 'Schedule a meeting',
      subInfo: 'Free career guidance'
    }
  ];

  const departments = [
    {
      name: 'Admissions',
      email: 'admissions@learnpath.edu',
      phone: '+1 (555) 123-4567',
      hours: '9AM - 6PM EST'
    },
    {
      name: 'Technical Support',
      email: 'tech@learnpath.edu',
      phone: '+1 (555) 123-4568',
      hours: '24/7 Available'
    },
    {
      name: 'Career Services',
      email: 'careers@learnpath.edu',
      phone: '+1 (555) 123-4569',
      hours: '10AM - 5PM EST'
    },
    {
      name: 'Corporate Training',
      email: 'corporate@learnpath.edu',
      phone: '+1 (555) 123-4570',
      hours: '9AM - 5PM EST'
    }
  ];

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'You can enroll directly through our platform after creating an account. Browse courses, select your program, and follow the enrollment process. Our admissions team is available to assist you.'
    },
    {
      question: 'What support is available for students?',
      answer: 'We offer 24/7 technical support, dedicated mentorship, career counseling, and academic assistance. Each student gets a personal success manager.'
    },
    {
      question: 'Are the certifications recognized?',
      answer: 'Yes, our certifications are industry-recognized and accredited. We partner with leading organizations to ensure our credentials have value in the job market.'
    },
    {
      question: 'Do you offer placement assistance?',
      answer: 'Yes, we provide comprehensive placement support including resume building, interview preparation, and direct connections with our hiring partners.'
    }
  ];

  const categories = [
    'Course Inquiry',
    'Technical Support',
    'Admission Query',
    'Career Counseling',
    'Corporate Training',
    'Partnership Opportunity',
    'Other'
  ];

  const socialLinks = [
    { icon: Linkedin, link: '#', name: 'LinkedIn' },
    { icon: Twitter, link: '#', name: 'Twitter' },
    { icon: Youtube, link: '#', name: 'YouTube' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Subtle animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>

      {/* Hero Section - More Professional */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="mb-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#f9b03e] via-[#ff7a00] to-[#ffd35c] bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Get in touch with our team for course inquiries, technical support, or career guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics - Professional Stats */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, value: counters.students, label: 'Active Students', suffix: '+' },
              { icon: Users, value: counters.mentors, label: 'Expert Mentors', suffix: '+' },
              { icon: BookOpen, value: counters.courses, label: 'Courses Available', suffix: '+' },
              { icon: Award, value: counters.placement, label: 'Placement Rate', suffix: '%' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="bg-[#1a1a1a]/50 rounded-xl p-6 text-center border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#f9b03e]" />
                <div className="text-2xl font-semibold text-white">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Form - Main Focus */}
            <div className="lg:col-span-3">
              <div className="bg-[#1a1a1a]/50 rounded-2xl p-8 border border-[#f9b03e]/10">
                <h2 className="text-2xl font-semibold mb-2 text-white">Send Us a Message</h2>
                <p className="text-gray-400 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a]/50 border border-[#f9b03e]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f9b03e]/30 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a]/50 border border-[#f9b03e]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f9b03e]/30 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a]/50 border border-[#f9b03e]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f9b03e]/30 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Inquiry Type *</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a]/50 border border-[#f9b03e]/10 text-white focus:outline-none focus:border-[#f9b03e]/30 transition-colors"
                      >
                        <option value="">Select inquiry type</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a]/50 border border-[#f9b03e]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f9b03e]/30 transition-colors"
                      placeholder="Brief description of your inquiry"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      className="w-full px-4 py-2.5 rounded-lg bg-[#0a0a0a]/50 border border-[#f9b03e]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f9b03e]/30 transition-colors resize-none"
                      placeholder="Provide details about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {showSuccess && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                      <p className="text-green-400 text-sm">Thank you for contacting us. We'll respond within 24 hours.</p>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Contact Information - Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Contact Methods */}
              <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 border border-[#f9b03e]/10">
                <h3 className="text-xl font-semibold text-white mb-4">Quick Contact</h3>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-[#f9b03e]/10 rounded-lg p-2">
                        <method.icon className="w-5 h-5 text-[#f9b03e]" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{method.title}</h4>
                        <p className="text-gray-300 text-sm">{method.info}</p>
                        <p className="text-gray-500 text-xs">{method.subInfo}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 border border-[#f9b03e]/10">
                <h3 className="text-xl font-semibold text-white mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>Monday - Friday</span>
                    <span className="text-[#f9b03e]">9:00 AM - 6:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Saturday</span>
                    <span className="text-[#f9b03e]">10:00 AM - 4:00 PM EST</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                  <div className="pt-3 mt-3 border-t border-gray-700">
                    <p className="text-gray-400 text-xs">
                      * 24/7 support available for enrolled students via student portal
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-[#1a1a1a]/50 rounded-2xl p-6 border border-[#f9b03e]/10">
                <h3 className="text-xl font-semibold text-white mb-4">Connect With Us</h3>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="bg-[#0a0a0a]/50 rounded-lg p-3 hover:bg-[#f9b03e]/10 text-gray-400 hover:text-[#f9b03e] transition-all"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="px-4 py-16 bg-[#0a0a0a]/50">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-semibold text-center mb-10 text-white">Department Contacts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a]/50 rounded-xl p-5 border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all"
              >
                <h3 className="text-lg font-semibold text-[#f9b03e] mb-3">{dept.name}</h3>
                <div className="space-y-2 text-sm">
                  <p className="text-gray-300 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-500" />
                    {dept.email}
                  </p>
                  <p className="text-gray-300 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-gray-500" />
                    {dept.phone}
                  </p>
                  <p className="text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-gray-500" />
                    {dept.hours}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold text-center mb-10 text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a]/50 rounded-xl p-6 border border-[#f9b03e]/10"
              >
                <h3 className="text-lg font-medium text-[#f9b03e] mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-10 border border-[#f9b03e]/10">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-[#f9b03e]" />
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-gray-400 mb-6">
              Join thousands of students who have transformed their careers with our programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all">
                Browse Courses
              </button>
              <button className="bg-[#0a0a0a]/50 text-white font-semibold py-3 px-6 rounded-lg border border-[#f9b03e]/20 hover:border-[#f9b03e]/40 transition-all">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;