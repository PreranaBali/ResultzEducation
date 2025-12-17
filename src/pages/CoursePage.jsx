import React, { useState } from 'react';
import { 
  ChevronRight, 
  Search,
  Filter,
  Clock,
  Users,
  Star,
  BookOpen,
  Award,
  TrendingUp,
  Play,
  CheckCircle,
  BarChart,
  Code,
  Database,
  Cloud,
  Brain,
  Lock,
  Cpu,
  Network,
  Globe,
  Zap
} from 'lucide-react';

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Courses');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchTerm, setSearchTerm] = useState('');

  // Updated Categories based on your content grouping
  const categories = [
    { name: 'All Courses', icon: BookOpen, count: 12 },
    { name: 'Tech Development', icon: Code, count: 5 },
    { name: 'Professional Skills', icon: TrendingUp, count: 4 },
    { name: 'Creative Fields', icon: Zap, count: 2 },
    { name: 'Finance & Tax', icon: BarChart, count: 3 },
  ];

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  // Updated Courses Data
  const courses = [
    {
      id: 1,
      title: 'Data Analytics',
      category: 'Professional Skills',
      level: 'Intermediate',
      image: 'https://picsum.photos/seed/data/400/250',
      instructor: 'Expert Analyst',
      rating: 4.8,
      reviews: 1240,
      students: 8500,
      duration: '10 weeks',
      lessons: 45,
      price: 299,
      description: 'Master data-driven decision-making. Become a Data Analyst or Scientist.',
      tags: ['Python', 'Machine Learning', 'SQL'],
      bestseller: true
    },
    {
      id: 2,
      title: 'Full-Stack Web Development',
      category: 'Tech Development',
      level: 'Advanced',
      image: 'https://picsum.photos/seed/fullstack/400/250',
      instructor: 'Senior Dev',
      rating: 4.9,
      reviews: 2150,
      students: 15400,
      duration: '16 weeks',
      lessons: 120,
      price: 349,
      description: 'Master building dynamic, responsive web applications. Launch a career as a Full-Stack Developer.',
      tags: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      bestseller: true
    },
    {
      id: 3,
      title: 'Digital Marketing',
      category: 'Professional Skills',
      level: 'Beginner',
      image: 'https://picsum.photos/seed/marketing/400/250',
      instructor: 'Marketing Pro',
      rating: 4.7,
      reviews: 980,
      students: 6200,
      duration: '8 weeks',
      lessons: 60,
      price: 199,
      description: 'Master driving business growth with proven strategies. Excel as a Digital Marketing Specialist.',
      tags: ['SEO', 'Social Media', 'Google Ads', 'Email Marketing'],
      bestseller: false
    },
    {
      id: 4,
      title: 'Graphic Design',
      category: 'Creative Fields',
      level: 'Beginner',
      image: 'https://picsum.photos/seed/design/400/250',
      instructor: 'Creative Lead',
      rating: 4.8,
      reviews: 1500,
      students: 9000,
      duration: '10 weeks',
      lessons: 85,
      price: 249,
      description: 'Master creating stunning visuals and designs. Succeed as a Graphic or UI/UX Designer.',
      tags: ['Photoshop', 'Illustrator', 'UI/UX Design'],
      bestseller: false
    },
    {
      id: 5,
      title: 'Java Course',
      category: 'Tech Development',
      level: 'Intermediate',
      image: 'https://picsum.photos/seed/java/400/250',
      instructor: 'Java Expert',
      rating: 4.6,
      reviews: 3200,
      students: 18000,
      duration: '12 weeks',
      lessons: 90,
      price: 279,
      description: 'Master OOP, Web Development, Databases. Build scalable applications, become a Java Developer.',
      tags: ['OOP', 'Debugging', 'Web Dev', 'Databases'],
      bestseller: true
    },
    {
      id: 6,
      title: 'Python Course',
      category: 'Tech Development',
      level: 'Beginner',
      image: 'https://picsum.photos/seed/python/400/250',
      instructor: 'Python Guru',
      rating: 4.9,
      reviews: 4500,
      students: 25000,
      duration: '10 weeks',
      lessons: 80,
      price: 259,
      description: 'Master Data Structures, Functions, Automation. Excel in web, data science, AI development.',
      tags: ['Data Structures', 'Automation', 'APIs'],
      bestseller: true
    },
    {
      id: 7,
      title: 'AI & Machine Learning',
      category: 'Tech Development',
      level: 'Advanced',
      image: 'https://picsum.photos/seed/ai/400/250',
      instructor: 'Dr. AI',
      rating: 4.9,
      reviews: 1800,
      students: 11000,
      duration: '14 weeks',
      lessons: 110,
      price: 399,
      description: 'Master Neural Networks, Deep Learning. Work in automation, healthcare, finance industries.',
      tags: ['Neural Networks', 'Deep Learning', 'Data Science'],
      bestseller: true
    },
    {
      id: 8,
      title: 'SAP Course',
      category: 'Professional Skills',
      level: 'Advanced',
      image: 'https://picsum.photos/seed/sap/400/250',
      instructor: 'SAP Consultant',
      rating: 4.7,
      reviews: 850,
      students: 4500,
      duration: '12 weeks',
      lessons: 75,
      price: 499,
      description: 'Master ERP Systems, SAP S/4HANA. Work in finance, Supply chain & Business Analytics.',
      tags: ['ERP', 'S/4HANA', 'Automation'],
      bestseller: false
    },
    {
      id: 9,
      title: 'UI & UX Design',
      category: 'Creative Fields',
      level: 'Intermediate',
      image: 'https://picsum.photos/seed/uiux/400/250',
      instructor: 'Design Lead',
      rating: 4.8,
      reviews: 1100,
      students: 7800,
      duration: '8 weeks',
      lessons: 55,
      price: 229,
      description: 'Master user-centered design, prototyping. Build intuitive digital experiences.',
      tags: ['Wireframing', 'Prototyping', 'Accessibility'],
      bestseller: false
    },
    {
      id: 10,
      title: 'U.S Taxation',
      category: 'Finance & Tax',
      level: 'Advanced',
      image: 'https://picsum.photos/seed/tax/400/250',
      instructor: 'Tax Expert',
      rating: 4.8,
      reviews: 600,
      students: 3200,
      duration: '10 weeks',
      lessons: 65,
      price: 349,
      description: 'Master Federal, state, and local tax laws. Become a tax consultant or financial advisor.',
      tags: ['Compliance', 'Auditing', 'IRS Regulations'],
      bestseller: false
    },
    {
      id: 11,
      title: 'Cyber Security Master',
      category: 'Tech Development',
      level: 'Advanced',
      image: 'https://picsum.photos/seed/security/400/250',
      instructor: 'Security Analyst',
      rating: 4.9,
      reviews: 1400,
      students: 9500,
      duration: '12 weeks',
      lessons: 85,
      price: 379,
      description: 'Master Threat detection, risk management. Become a Cyber security analyst.',
      tags: ['Ethical Hacking', 'Risk Mgmt', 'Security Analysis'],
      bestseller: true
    },
    {
      id: 12,
      title: 'Forex Trading',
      category: 'Finance & Tax',
      level: 'Intermediate',
      image: 'https://picsum.photos/seed/forex/400/250',
      instructor: 'Market Trader',
      rating: 4.6,
      reviews: 2100,
      students: 12000,
      duration: '6 weeks',
      lessons: 40,
      price: 299,
      description: 'Master Currency markets, trading strategies. Become a Forex trader or financial analyst.',
      tags: ['Technical Analysis', 'Market Trends', 'Psychology'],
      bestseller: false
    }
  ];

  // Updated Learning Paths based on the "Services" section provided
  const learningPaths = [
    {
      title: 'Engineering',
      courses: 3,
      duration: 'JEE/KCET',
      icon: Cpu,
      description: 'Comprehensive coaching for competitive exams like JEE, KCET, and BITSAT, helping students excel in their path to top engineering institutes.'
    },
    {
      title: 'Medical',
      courses: 2,
      duration: 'NEET Prep',
      icon: Brain,
      description: 'NEET preparation courses designed to equip aspiring medical professionals with the tools to succeed.'
    },
    {
      title: 'Government Exams',
      courses: 4,
      duration: 'UPSC/SSC',
      icon: BookOpen,
      description: 'Rigorous training for competitive exams like UPSC, SSC, IAS, and KAS, fostering public service aspirations.'
    },
    {
      title: 'Professional Skills',
      courses: 5,
      duration: 'Data/AI',
      icon: TrendingUp,
      description: 'Hands-on courses in Data Science, AI, Machine Learning, and Power BI, aligning with industry demands.'
    },
    {
      title: 'Creative Fields',
      courses: 3,
      duration: 'Design',
      icon: Zap,
      description: 'Programs like Graphic Design and Digital Marketing to nurture modern creative and marketing skills.'
    },
    {
      title: 'Tech Development',
      courses: 6,
      duration: 'Full Stack',
      icon: Code,
      description: 'Full-Stack Development courses to empower learners in building robust, scalable, and modern applications.'
    }
  ];

  const stats = [
    { icon: BookOpen, value: '12+', label: 'Courses Available' },
    { icon: Users, value: '50K+', label: 'Active Students' },
    { icon: Award, value: '95%', label: 'Completion Rate' },
    { icon: TrendingUp, value: '90%', label: 'Career Success' }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All Courses' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="mb-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#f9b03e] via-[#ff7a00] to-[#ffd35c] bg-clip-text text-transparent">
              Mastering Tomorrow's Skills Today
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
        Results Education empowers learners with future-ready skills in Data Science, AI, and Full-Stack Development to thrive in an evolving world.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses by name, topic, or skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg bg-[#1a1a1a]/50 border border-[#f9b03e]/10 text-white placeholder-gray-500 focus:outline-none focus:border-[#f9b03e]/30 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a]/50 rounded-xl p-6 text-center border border-[#f9b03e]/10"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#f9b03e]" />
                <div className="text-2xl font-semibold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">Course Categories</h2>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 rounded-lg bg-[#1a1a1a]/50 border border-[#f9b03e]/10 text-white focus:outline-none focus:border-[#f9b03e]/30"
            >
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`p-4 rounded-xl border transition-all ${
                  selectedCategory === category.name
                    ? 'bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] border-transparent'
                    : 'bg-[#1a1a1a]/50 text-gray-300 border-[#f9b03e]/10 hover:border-[#f9b03e]/30'
                }`}
              >
                <category.icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-sm font-medium mb-1">{category.name}</div>
                <div className="text-xs opacity-70">{category.count} courses</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              {selectedCategory} 
              <span className="text-gray-400 text-lg ml-2">({filteredCourses.length} courses)</span>
            </h2>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl text-gray-400 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-[#1a1a1a]/50 rounded-2xl overflow-hidden border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all group cursor-pointer"
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                    
                    {/* Bestseller Badge */}
                    {course.bestseller && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] px-3 py-1 rounded-full text-xs font-semibold">
                        Bestseller
                      </div>
                    )}
                    
                    {/* Level Badge */}
                    <div className="absolute top-3 right-3 bg-[#0a0a0a]/80 backdrop-blur text-white px-3 py-1 rounded-full text-xs">
                      {course.level}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-[#f9b03e] rounded-full p-4">
                        <Play className="w-6 h-6 text-[#0a0a0a]" fill="#0a0a0a" />
                      </div>
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[#f9b03e] text-sm font-medium">{course.category}</span>
                      {/* <div className="flex items-center text-yellow-500 text-sm">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-gray-500 ml-1">({course.reviews})</span>
                      </div> */}
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#f9b03e] transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {course.description}
                    </p>

                    {/* <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Users className="w-4 h-4 mr-1" />
                      <span>{course.students.toLocaleString()} students</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{course.duration}</span>
                    </div> */}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {course.tags.slice(0, 3).map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-[#0a0a0a]/50 text-gray-400 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#f9b03e]/10">
                      {/* <div>
                        <span className="text-2xl font-bold text-white">${course.price}</span>
                      </div> */}
                      {/* <button className="bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] px-4 py-2 rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
                        Enroll Now
                      </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Learning Paths */}
      <section className="px-4 py-16 bg-[#0a0a0a]/50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold text-white mb-3">Our Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Follow structured learning paths to master specific career tracks and competitive exams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div 
                key={index}
                className="bg-[#1a1a1a]/50 rounded-2xl p-6 border border-[#f9b03e]/10 hover:border-[#f9b03e]/30 transition-all cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] rounded-xl p-3 w-fit mb-4 group-hover:scale-110 transition-transform">
                  <path.icon className="w-8 h-8 text-[#0a0a0a]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{path.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{path.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" />
                    View Service
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-8 border border-[#f9b03e]/10">
            <h2 className="text-3xl font-semibold text-white mb-8 text-center">Why Learn With Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: CheckCircle, title: 'Industry-Recognized Certificates', desc: 'Boost your career with verified credentials' },
                { icon: Users, title: 'Expert Instructors', desc: 'Learn from professionals with real-world experience' },
                { icon: Zap, title: 'Hands-On Projects', desc: 'Build portfolio-worthy projects while learning' },
                { icon: Globe, title: 'Lifetime Access', desc: 'Learn at your own pace, anytime, anywhere' },
                { icon: Award, title: 'Career Support', desc: 'Get job placement assistance and mentorship' },
                { icon: TrendingUp, title: 'Updated Content', desc: 'Courses updated regularly with latest trends' }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="bg-[#f9b03e]/10 rounded-lg p-2">
                    <benefit.icon className="w-5 h-5 text-[#f9b03e]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-[#1a1a1a]/50 rounded-2xl p-10 border border-[#f9b03e]/10">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-[#f9b03e]" />
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Not Sure Where to Start?
            </h2>
            <p className="text-gray-400 mb-6">
              Get personalized course recommendations based on your goals and experience level.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-gradient-to-r from-[#f9b03e] to-[#ff7a00] text-[#0a0a0a] font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all">
                Get Course Recommendations
              </button>
              <button className="bg-[#0a0a0a]/50 text-white font-semibold py-3 px-6 rounded-lg border border-[#f9b03e]/20 hover:border-[#f9b03e]/40 transition-all">
                Talk to Advisor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;