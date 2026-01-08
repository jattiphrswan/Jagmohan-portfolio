import { useMemo, useState } from "react";
import { profile } from "../data/profile";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";

export default function Header() {
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-3 py-3 sm:px-4 lg:px-6">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-md bg-blue-600" />
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-4">{profile.name}</div>
            <div className="text-xs text-slate-500 leading-4">{profile.headline}</div>
          </div>
        </a>

        {/* Search (Desktop) */}
        <div className="hidden md:block flex-1">
          <input
            className="w-full max-w-md rounded-full border bg-slate-50 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Search"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-slate-900">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={profile?.contact?.phone?.href}
          className="hidden lg:inline-flex items-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Hire Me
        </a>

        {/* Mobile actions */}
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          {/* Search icon (mobile) */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-slate-50"
            aria-label="Search"
            onClick={() => {
              // Optional: scroll to About or open a search modal later
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <FiSearch />
          </button>

          {/* Menu toggle */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border hover:bg-slate-50"
            aria-label="Menu"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="hidden sm:block h-9 w-9 rounded-full bg-slate-200" />
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="mx-auto w-full max-w-[1600px] px-3 py-3 sm:px-4">
            <div className="grid gap-2 text-sm">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="rounded-lg px-3 py-2 hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ))}

              <a
                href={profile?.contact?.phone?.href}
                className="mt-2 inline-flex justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={() => setOpen(false)}
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
