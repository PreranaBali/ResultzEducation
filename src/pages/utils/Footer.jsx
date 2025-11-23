import React from "react";
import { motion } from "framer-motion";

const BRAND_GOLD = "#FFB800";
const BRAND_BLUE = "#0066FF";

export default function BrandFooter() {
  return (
    <footer
      className="relative w-full text-white py-12 md:py-16 mt-20"
      style={{
        background: "linear-gradient(135deg, #0A0F1C 0%, #1a2744 100%)",
        borderTop: `3px solid ${BRAND_GOLD}`,
      }}
    >
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${BRAND_BLUE}20 1px, transparent 1px), linear-gradient(90deg, ${BRAND_BLUE}20 1px, transparent 1px)` ,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Gold & Blue Accent Cuts */}
      <div
        className="absolute top-0 left-0 w-40 h-40"
        style={{
          background: `linear-gradient(135deg, ${BRAND_GOLD}, transparent)`,
          clipPath: "polygon(0 0, 100% 0, 0 100%)",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-40 h-40"
        style={{
          background: `linear-gradient(135deg, transparent, ${BRAND_BLUE})`,
          clipPath: "polygon(100% 100%, 0 100%, 100% 0)",
          opacity: 0.7,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              ResultsEducation.
            </h2>
            <p className="text-gray-300 max-w-sm">
              Empowering affordable, innovative and future-ready learning for
              every student.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold" style={{ color: BRAND_GOLD }}>
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white transition">Courses</li>
              <li className="hover:text-white transition">Admissions</li>
              <li className="hover:text-white transition">About Us</li>
              <li className="hover:text-white transition">Contact</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold" style={{ color: BRAND_BLUE }}>
              Reach Us
            </h3>
            <p className="text-gray-300">📍 Bengaluru, Karnataka</p>
            <p className="text-gray-300">📞 +91 98765 43210</p>
            <p className="text-gray-300">✉️ info@resultseducation.com</p>
          </motion.div>
        </div>

        <div className="mt-12 border-t border-gray-700/50 pt-5 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ResultsEducation. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
