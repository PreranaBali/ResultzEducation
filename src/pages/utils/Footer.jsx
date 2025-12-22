// Professional Elegant Gold - Luxury Brand Footer (Contact Highlighted)
// Features: #F25912 Branding, Glass-morphism Contact Card, Obsidian Depth

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, Github, Linkedin, Twitter, Instagram } from "lucide-react";

/* -------------------- THEME CONFIG -------------------- */
const BRAND_COLOR = "#F25912"; // Resultz Education Highlight
const GOLD_CHAMPAGNE = "#D4AF37";
const OBSIDIAN_DEEP = "#050505";
/* ------------------------------------------------------ */

const SocialIcon = ({ Icon, href }) => (
  <motion.a
    href={href}
    whileHover={{ y: -4, color: GOLD_CHAMPAGNE }}
    className="w-10 h-10 flex items-center justify-center rounded-full border border-stone-800 text-stone-500 transition-all duration-500 hover:border-gold-500/40 hover:bg-gold-500/5"
  >
    <Icon size={18} strokeWidth={1.5} />
  </motion.a>
);

const FooterLink = ({ children }) => (
  <li>
    <a href="#" className="group flex items-center text-stone-400 hover:text-stone-100 transition-colors duration-500 text-sm font-light tracking-wide">
      <span className="w-0 group-hover:w-4 transition-all duration-500 overflow-hidden text-[#D4AF37] opacity-0 group-hover:opacity-100">
        <ArrowUpRight size={14} className="mr-2" />
      </span>
      {children}
    </a>
  </li>
);

export default function BrandFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&family=Inter:wght@300;400;600&display=swap');
        .font-tech { font-family: 'Rajdhani', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Luxury Background Detail: Soft Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-32 bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 pb-20">
          
          {/* COLUMN 1: BRAND STORY */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <div className="font-tech text-3xl font-bold tracking-[0.25em] text-white uppercase flex items-center gap-3">
                RESULTZEducation<span style={{ color: BRAND_COLOR }}>.</span>
              </div>
              <p className="font-inter text-sm leading-relaxed text-stone-500 font-light max-w-sm">
                The premier destination for technical mastery. We engineer future-ready professionals through holographic learning and architectural precision.
              </p>
            </div>
            
            <div className="flex gap-3">
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="https://www.instagram.com/resultseducationpvtltd/" />
              <SocialIcon Icon={Github} href="#" />
            </div>
          </div>

          {/* COLUMN 2: CURRICULUM & INSTITUTION */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-tech text-xs tracking-[0.5em] uppercase text-stone-600 font-bold">Curriculum</h4>
              <ul className="space-y-4">
                <FooterLink>Full-Stack Web</FooterLink>
                <FooterLink>AI & Intelligence</FooterLink>
                <FooterLink>Data Analytics</FooterLink>
                <FooterLink>Cyber Security</FooterLink>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-tech text-xs tracking-[0.5em] uppercase text-stone-600 font-bold">Institution</h4>
              <ul className="space-y-4">
                <FooterLink>Admissions</FooterLink>
                <FooterLink>Our Architects</FooterLink>
                <FooterLink>Career Portal</FooterLink>
                <FooterLink>Placement Registry</FooterLink>
              </ul>
            </div>
          </div>

          {/* COLUMN 3: HIGHLIGHTED CONTACT INFO */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
                <h4 className="font-tech text-xs tracking-[0.5em] uppercase text-stone-600 font-bold">The Registry</h4>
                
                {/* HIGHLIGHTED CONTACT BOX */}
                <div className="relative p-6 rounded-xl bg-stone-900/20 border-l-2 border-[#F25912] backdrop-blur-md group hover:bg-stone-900/40 transition-all duration-500">
                    {/* Subtle Glow behind the highlight box */}
                    <div className="absolute -inset-2 bg-[#F25912]/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <ul className="relative z-10 space-y-5">
                        <li className="flex items-start gap-4 group/item">
                            <div className="w-8 h-8 rounded-lg bg-[#F25912]/10 flex items-center justify-center text-[#F25912] shrink-0 border border-[#F25912]/20">
                                <MapPin size={16} />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] tracking-widest text-stone-500 uppercase font-bold">Location</span>
                                <span className="text-sm text-stone-200 font-light">Bangalore, India <br/>
                                             #14/1, 3rd Floor, 40th Cross, 8th Main, 5th Block, Jayanagar, Bangalore -560041
                                </span>
                            </div>
                        </li>
                        
                        <li className="flex items-start gap-4 group/item">
                            <div className="w-8 h-8 rounded-lg bg-[#F25912]/10 flex items-center justify-center text-[#F25912] shrink-0 border border-[#F25912]/20">
                                <Phone size={16} />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] tracking-widest text-stone-500 uppercase font-bold">Direct Line</span>
                                <span className="text-sm text-stone-200 font-light">+91 9964666544</span>
                            </div>
                        </li>
                        
                        <li className="flex items-start gap-4 group/item">
                            <div className="w-8 h-8 rounded-lg bg-[#F25912]/10 flex items-center justify-center text-[#F25912] shrink-0 border border-[#F25912]/20">
                                <Mail size={16} />
                            </div>
                            <div className="space-y-1">
                                <span className="block text-[10px] tracking-widest text-stone-500 uppercase font-bold">Email Registry</span>
                                <span className="text-sm text-stone-200 font-light hover:text-[#F25912] transition-colors cursor-pointer">support@resultzeducation.com</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Newsletter Minimalist Field */}
            <div className="relative group pt-4">
              <input 
                type="email" 
                placeholder="Secure email link..."
                className="w-full bg-transparent border-b border-stone-800 py-3 text-sm text-stone-100 outline-none focus:border-gold-500/50 transition-all duration-700 placeholder:text-stone-700 font-light"
              />
              <button className="absolute right-0 bottom-3 text-stone-500 hover:text-[#F25912] transition-colors duration-500">
                <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* ELEGANT BOTTOM BAR */}
        <div className="pt-10 border-t border-stone-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-tech text-[9px] tracking-[0.4em] uppercase text-stone-700">
            Copyright © {currentYear} Resultz Education System. <span className="ml-2 border-l border-stone-800 pl-2 text-stone-800">All Rights Secured.</span>
          </div>
          
          <div className="flex gap-10 font-tech text-[9px] tracking-[0.3em] uppercase text-stone-500">
            <a href="#" className="hover:text-gold-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-gold-500 transition-colors">Legal</a>
          </div>

          {/* Node Status Indicator */}
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-8 bg-stone-800" />
             <div className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: BRAND_COLOR }} />
                <span className="font-tech text-[9px] tracking-widest text-stone-600 uppercase">Registry Online</span>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}