import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.svg";

// Glassmorphic, router-aware navbar (no page background)
export default function AuroraNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* NAV CONTAINER */}
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto mt-2 max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* GLASS BAR */}
        <div
          className={`relative flex items-center justify-between rounded-2xl border px-4 py-3 sm:px-6 lg:px-8 backdrop-blur-md ${
            scrolled
              ? "bg-white/10 border-white/15 shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
              : "bg-white/5 border-white/10"
          }`}
        >
          {/* top glow line */}
          <span className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-cyan-400/0 via-cyan-300/60 to-fuchsia-400/0 blur-[1px]" />

          {/* LOGO */}
          <Link to="/" className="group inline-flex items-center gap-2">
            <motion.img
              whileHover={{ rotate: 8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              src={logo}
              alt="Logo"
              className="h-8 w-auto drop-shadow-[0_0_20px_rgba(88,182,255,0.25)]"
            />
            <span className="hidden text-sm font-medium tracking-wide text-slate-200 sm:block">
              Results Education
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <NavItem key={l.label} to={l.to} onClick={() => setOpen(false)}>
                {l.label}
              </NavItem>
            ))}
          </div>

          {/* CTA */}
          <Link
            to="/courses"
            className="relative hidden overflow-hidden rounded-full px-4 py-2 text-sm font-medium text-white md:inline-flex"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-fuchsia-500/20" />
            <span className="absolute inset-[1px] rounded-full bg-slate-900/50 backdrop-blur-sm" />
            <span className="relative z-10">Get started</span>
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent [mask-image:linear-gradient(90deg,transparent,white,transparent)] animate-[shimmer_2s_linear_infinite]" />
          </Link>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 md:hidden hover:bg-white/5"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* MOBILE PANEL */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
            >
              <ul className="divide-y divide-white/10">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between px-5 py-4 text-slate-200 hover:bg-white/5"
                    >
                      <span>{l.label}</span>
                      <span className="text-xs opacity-60 group-hover:opacity-100">↗</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    to="/courses"
                    onClick={() => setOpen(false)}
                    className="mx-5 my-3 block rounded-xl border border-white/10 bg-slate-900/50 px-5 py-3 text-center text-sm text-white hover:bg-white/5"
                  >
                    Get started
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer so fixed nav doesn't overlap content */}
      <div className="h-20" />

      <style jsx="true">{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>
    </header>
  );
}

function NavItem({ to, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative text-sm font-medium tracking-wide transition-colors ${
          isActive ? "text-white" : "text-slate-300"
        }`
      }
    >
      <span className="relative z-10 group-hover:text-white">{children}</span>
      {/* underline */}
      <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full" />
      {/* glow */}
      <span className="pointer-events-none absolute -inset-x-3 -inset-y-2 scale-95 rounded-xl bg-cyan-400/0 opacity-0 blur transition-all duration-300 group-hover:scale-100 group-hover:bg-cyan-400/10 group-hover:opacity-100" />
    </NavLink>
  );
}
