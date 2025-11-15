import React, { useState, useRef, useEffect } from "react"
import { Send, Bot, User, MessageSquare } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

// Simple 3D Robot Model
function RobotModel() {
  return (
    <mesh>
      <boxGeometry args={[1, 1.2, 1]} />
      <meshStandardMaterial color="#4f8df7" />
    </mesh>
  )
}

export default function LMSChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🤖 Hi! I'm RoboMentor. How can I help you today?",
      sender: "bot",
      options: [
        { id: "learn_system", text: "📚 Learn About the Platform" },
        { id: "courses", text: "🎓 Courses & Enrollment" },
        { id: "certificates", text: "📄 Certificates" },
        { id: "faqs", text: "❓ FAQs" },
      ],
    },
  ])

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleOptionSelect = (optionId, optionText) => {
    const newUserMessage = {
      id: messages.length + 1,
      text: optionText,
      sender: "user",
    }

    setMessages((prev) => [...prev, newUserMessage])
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = getBotResponse(optionId)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 900)
  }

  const getBotResponse = (optionId) => {
    const responses = {
      learn_system: {
        text: "Our LMS helps students learn with structured modules, videos, and quizzes. What would you like to explore?",
        options: [
          { id: "modules", text: "📘 Learning Modules" },
          { id: "tracking", text: "📊 Progress Tracking" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      modules: {
        text: "Modules include video lectures, notes, and quizzes to help you learn step-by-step.",
        options: [
          { id: "learn_system", text: "📚 Back" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      tracking: {
        text: "Your progress updates automatically as you complete modules and quizzes.",
        options: [
          { id: "learn_system", text: "📚 Back" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      courses: {
        text: "Browse courses, view details, and enroll instantly.",
        options: [{ id: "main_menu", text: "🏠 Main Menu" }],
      },

      certificates: {
        text: "Certificates generate automatically after you complete all modules.",
        options: [{ id: "main_menu", text: "🏠 Main Menu" }],
      },

      faqs: {
        text: "Choose an FAQ:",
        options: [
          { id: "faq1", text: "❓ How to enroll?" },
          { id: "faq2", text: "❓ How to download notes?" },
          { id: "faq3", text: "❓ Certificate issues" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      faq1: {
        text: "You can enroll by clicking the 'Enroll Now' button on the course page.",
        options: [
          { id: "faqs", text: "🔙 Back" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      faq2: {
        text: "Notes can be downloaded from the Materials section in your module.",
        options: [
          { id: "faqs", text: "🔙 Back" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      faq3: {
        text: "Ensure all modules and quizzes are completed for certificate generation.",
        options: [
          { id: "faqs", text: "🔙 Back" },
          { id: "main_menu", text: "🏠 Main Menu" },
        ],
      },

      main_menu: {
        text: "How can I assist you today?",
        options: [
          { id: "learn_system", text: "📚 Learn About the Platform" },
          { id: "courses", text: "🎓 Courses & Enrollment" },
          { id: "certificates", text: "📄 Certificates" },
          { id: "faqs", text: "❓ FAQs" },
        ],
      },
    }

    return {
      id: Date.now(),
      text: responses[optionId]?.text || "I didn’t understand that.",
      sender: "bot",
      options: responses[optionId]?.options || [],
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition transform hover:scale-110 z-50"
      >
        <MessageSquare size={26} />
      </button>

      {/* FULL SCREEN CHAT */}
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-[90%] h-[85%] rounded-3xl shadow-2xl flex overflow-hidden border border-gray-200">

            {/* LEFT: 3D ROBOT */}
            <div className="w-1/2 bg-gray-50 flex items-center justify-center relative">
              <Canvas camera={{ position: [2, 2, 3] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} />
                <RobotModel />
                <OrbitControls enableZoom={false} />
              </Canvas>
              <h2 className="absolute bottom-6 text-xl font-semibold text-gray-700">Your AI Mentor</h2>
            </div>

            {/* RIGHT: CHAT */}
            <div className="w-1/2 flex flex-col bg-white">
              <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
                <h2 className="font-semibold text-lg flex items-center gap-2">
                  <Bot size={22} /> RoboMentor
                </h2>
                <button onClick={() => setOpen(false)} className="text-white text-xl">✖</button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`px-4 py-2 rounded-xl text-sm shadow-md max-w-[70%] ${
                        msg.sender === "bot" ? "bg-gray-100 text-gray-800" : "bg-blue-600 text-white"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-start gap-2 text-gray-500 text-sm">
                    <span className="animate-pulse">Typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t bg-gray-50">
                {messages[messages.length - 1]?.options?.length > 0 && !isTyping && (
                  <div className="grid grid-cols-1 gap-2">
                    {messages[messages.length - 1].options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleOptionSelect(opt.id, opt.text)}
                        className="bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-50 rounded-lg px-3 py-2 text-left text-sm transition"
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}
