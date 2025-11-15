import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function RobotChatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hey there! 👋 I\'m your course assistant. How can I help you today?', isAI: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Quick question suggestions
  const quickQuestions = [
    "What courses do you offer?",
    "How do I enroll?",
    "Do you provide certificates?",
    "What are the course prices?",
    "How long are the courses?",
    "How can I contact support?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common course questions
  const getLocalResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Course-related questions
    if (lowerMessage.includes('course') && (lowerMessage.includes('offer') || lowerMessage.includes('available') || lowerMessage.includes('have'))) {
      return 'We offer a wide range of courses including:\n• Web Development (HTML, CSS, JavaScript, React)\n• Python Programming\n• Data Science & AI\n• Mobile App Development\n• Cloud Computing\n\nWhich course interests you? 📚';
    }
    
    if (lowerMessage.includes('enroll') || lowerMessage.includes('registration') || lowerMessage.includes('sign up')) {
      return 'To enroll in a course:\n1. Browse our course catalog\n2. Click on the course you want\n3. Click "Enroll Now"\n4. Complete the registration form\n\nNeed help with a specific course? Let me know! ✨';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return 'Our courses have flexible pricing:\n• Free courses for beginners\n• Premium courses: ₹999 - ₹4,999\n• Certification programs: ₹5,999+\n\nMany courses offer installment options. Check individual course pages for details! 💰';
    }
    
    if (lowerMessage.includes('certificate') || lowerMessage.includes('certification')) {
      return 'Yes! We provide certificates:\n• Course completion certificates for all paid courses\n• Industry-recognized certifications for advanced programs\n• Certificates are downloadable and shareable on LinkedIn\n\nComplete all assignments to earn your certificate! 🎓';
    }
    
    if (lowerMessage.includes('duration') || lowerMessage.includes('how long')) {
      return 'Course durations vary:\n• Short courses: 2-4 weeks\n• Standard courses: 6-8 weeks\n• Comprehensive programs: 3-6 months\n\nYou can learn at your own pace with lifetime access! ⏱️';
    }
    
    if (lowerMessage.includes('assignment') || lowerMessage.includes('homework')) {
      return 'Assignments are an important part of learning:\n• Check your course dashboard for pending assignments\n• Submission deadlines are clearly marked\n• Get feedback from instructors within 48 hours\n• Need help? Use the discussion forum or contact support! 📝';
    }
    
    if (lowerMessage.includes('support') || lowerMessage.includes('help') || lowerMessage.includes('contact')) {
      return 'We\'re here to help! 💪\n• Live chat support: Available 9 AM - 6 PM IST\n• Email: support@yourwebsite.com\n• Discussion forums for each course\n• 1-on-1 mentor sessions for premium courses\n\nWhat do you need help with?';
    }
    
    if (lowerMessage.includes('instructor') || lowerMessage.includes('teacher')) {
      return 'Our instructors are industry experts with:\n• 5+ years of real-world experience\n• Working professionals from top companies\n• Passionate about teaching\n• Available for doubt resolution\n\nEach course page shows instructor profiles! 👨‍🏫';
    }
    
    if (lowerMessage.includes('refund') || lowerMessage.includes('money back')) {
      return 'We offer a 7-day money-back guarantee:\n• Request a refund within 7 days of purchase\n• No questions asked policy\n• Full refund processed in 5-7 business days\n• Contact support@yourwebsite.com to initiate\n\nYour satisfaction is our priority! 💯';
    }
    
    if (lowerMessage.includes('prerequisite') || lowerMessage.includes('requirement')) {
      return 'Prerequisites vary by course:\n• Beginner courses: No prior knowledge needed\n• Intermediate courses: Basic programming knowledge\n• Advanced courses: Check specific requirements on course page\n\nNot sure? Take our skill assessment quiz! 🎯';
    }
    
    // General greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hey there! 👋 I\'m your course assistant. I can help you with:\n• Course information and enrollment\n• Pricing and certifications\n• Technical support\n• General questions\n\nWhat would you like to know?';
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return 'You\'re welcome! 😊 Feel free to ask if you have more questions. Happy learning! 🚀';
    }
    
    return null; // No local match, use Gemini
  };

  const handleSubmit = async (e, questionText = null) => {
    e?.preventDefault();
    const userMessage = questionText || input.trim();
    
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, isAI: false }]);
    setIsLoading(true);
    
    // Check for local response first
    const localResponse = getLocalResponse(userMessage);
    
    if (localResponse) {
      // Simulate a small delay for natural feel
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: localResponse, isAI: false }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // If no local response found, use Gemini AI
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error('API key not found. Please add VITE_GEMINI_API_KEY to your .env file');
      }

      // Initialize Gemini AI with free tier model
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        systemInstruction: "You are a helpful course assistant. Be friendly, concise, and educational."
      });

      // Build conversation history for context (excluding the initial welcome message)
      // Filter out the welcome message and ensure history starts with user message
      const chatHistory = messages
        .slice(1) // Skip the first welcome message
        .filter((msg, index, arr) => {
          // Ensure we don't start with a model message
          if (index === 0 && msg.role === 'assistant') return false;
          return true;
        })
        .map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        }));

      // Start chat with history
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });

      // Send message and get response
      const result = await chat.sendMessage(userMessage);
      const text = result.response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text, isAI: true }]);
    } catch (error) {
      console.error('Gemini API Error:', error);
      let errorMessage = 'Oops! Something went wrong. ';
      
      if (error.message?.includes('API key')) {
        errorMessage += 'Please check your API key in the .env file.';
      } else if (error.message?.includes('quota')) {
        errorMessage += 'API quota exceeded. Please try again later.';
      } else if (error.message?.includes('404')) {
        errorMessage += 'Model not found. Please check the model name.';
      } else {
        errorMessage += `Error: ${error.message || 'Unknown error'}`;
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        isAI: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = (question) => {
    handleSubmit(null, question);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070c] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] flex gap-6 relative">
        
        {/* 3D Robot Section */}
        <div className="flex-1 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a0f1a] to-[#05070c] border border-orange-500/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-transparent to-transparent z-10 pointer-events-none" />
          <iframe 
            src='https://my.spline.design/superkidrobotcopy-fcsbjadb1HEIELz9cV31szos/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            className="relative z-0"
            title="3D Robot Model"
          />
          <div className="absolute bottom-8 left-8 z-20 flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-xl opacity-50 animate-pulse" />
              <div className="relative w-3 h-3 bg-orange-500 rounded-full" />
            </div>
            <span className="text-orange-400 font-medium text-sm tracking-wide">ONLINE</span>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="w-[450px] flex flex-col rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f1419] to-[#05070c] border border-orange-500/10 shadow-2xl">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/10 backdrop-blur-sm border-b border-orange-500/20 p-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-orange-500 blur-md opacity-50 animate-pulse" />
                <Sparkles className="w-6 h-6 text-orange-400 relative" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Course Assistant</h2>
                <p className="text-sm text-gray-400">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-500/20'
                        : 'bg-[#1a1f2e] text-gray-100 border border-gray-800'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
                {/* AI Badge */}
                {message.role === 'assistant' && (
                  <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mt-1`}>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#1a1f2e]/50 border border-gray-800/50">
                      <div className={`w-1.5 h-1.5 rounded-full ${message.isAI ? 'bg-purple-400' : 'bg-green-400'}`} />
                      <span className="text-[10px] text-gray-500">
                        {message.isAI ? 'AI Response' : 'Instant Answer'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Quick Questions - Always visible */}
            {messages.length >= 1 && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs text-gray-500 font-medium">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      disabled={isLoading}
                      className="text-xs bg-[#1a1f2e] hover:bg-orange-500/20 text-gray-300 hover:text-orange-400 px-3 py-2 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-[#1a1f2e] rounded-2xl px-5 py-3 border border-gray-800">
                  <Loader2 className="w-5 h-5 text-orange-400 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-gradient-to-t from-[#0a0f1a] to-transparent border-t border-orange-500/10">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="w-full bg-[#1a1f2e] text-white rounded-2xl pl-6 pr-14 py-4 outline-none border border-gray-800 focus:border-orange-500/50 transition-all duration-300 placeholder-gray-500 disabled:opacity-50"
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-orange-600 to-orange-500 text-white rounded-xl p-3 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">
              Powered by Gemini AI
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
}