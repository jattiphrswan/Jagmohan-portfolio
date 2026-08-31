import { useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { profile } from "../data/profile";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiHome,
  FiUser,
  FiLayers,
  FiFolder,
  FiBriefcase,
  FiAward,
  FiMail,
} from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);
  const base = import.meta.env.BASE_URL;

  const links = useMemo(
    () => [
      { label: "Home", to: "/", icon: FiHome },
      { label: "About", to: "/about", icon: FiUser },
      { label: "Experience", to: "/experience", icon: FiBriefcase },
      { label: "Skills", to: "/skills", icon: FiLayers },
      { label: "Projects", to: "/projects", icon: FiFolder },
      { label: "Certifications", to: "/certifications", icon: FiAward },
      { label: "Contact", to: "/contact", icon: FiMail },
    ],
    []
  );


  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-14 w-full max-w-[1680px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 max-w-md">
          <Link
            to="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="Go to Home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0a66c2] text-white font-bold text-lg shadow-sm group-hover:bg-[#004182] transition-colors">
              in
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-sm font-semibold text-slate-900 group-hover:text-[#0a66c2] transition-colors">
                {profile.name}
              </div>
              <div className="text-[11px] text-slate-500 line-clamp-1 max-w-[200px]">
                {profile.headline}
              </div>
            </div>
          </Link>

          {/* Search bar */}
          <div className="relative hidden md:block flex-1 max-w-[240px]">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="search"
              aria-label="Search"
              className="w-full rounded-md border border-slate-200 bg-slate-100/80 py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-500 transition-colors focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              placeholder="Search portfolio..."
            />
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-1 sm:gap-2 text-xs font-medium text-slate-600 h-full"
          aria-label="Main Navigation"
        >
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center h-14 min-w-[56px] px-2.5 transition-colors group ${
                  isActive
                    ? "text-slate-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-slate-900"
                    : "text-slate-500 hover:text-slate-900"
                }`
              }
            >
              <Icon className="text-base mb-0.5 transition-transform group-hover:scale-110" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right: CTA & Mobile controls */}
        <div className="flex items-center gap-2">
          {/* Hire Me CTA */}
          <a
            href={profile?.contact?.phone?.href || "tel:+919315667284"}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#0a66c2] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#004182] active:scale-95"
          >
            Hire Me
          </a>

          {/* Mini Avatar in Header */}
          <Link
            to="/about"
            className="hidden sm:block h-8 w-8 overflow-hidden rounded-full border border-slate-200 shadow-sm transition hover:ring-2 hover:ring-[#0a66c2]/40"
            title="View Profile"
          >
            {profile.avatar ? (
              <img
                src={`${base}images/${profile.avatar}`}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                JS
              </div>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-100 md:hidden"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FiX className="text-lg" /> : <FiMenu className="text-lg" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 md:hidden shadow-lg animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {links.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-[#0a66c2] font-semibold"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                <Icon className="text-base shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
            <a
              href={profile?.contact?.phone?.href || "tel:+919315667284"}
              className="flex-1 inline-flex justify-center rounded-full bg-[#0a66c2] py-2 text-xs font-semibold text-white hover:bg-[#004182]"
              onClick={() => setOpen(false)}
            >
              Hire Me
            </a>
            <a
              href={profile?.contact?.email?.href || "mailto:jattiphrswan49@gmail.com"}
              className="flex-1 inline-flex justify-center rounded-full border border-slate-300 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              onClick={() => setOpen(false)}
            >
              Message
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

