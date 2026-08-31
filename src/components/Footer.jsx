import { Link } from "react-router-dom";
import { profile } from "../data/profile";

export default function Footer() {
  const internalLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Experience", to: "/experience" },
    { label: "Skills", to: "/skills" },
    { label: "Projects", to: "/projects" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <footer className="border-t border-slate-200 bg-white py-6 mt-10">
      <div className="mx-auto w-full max-w-[1680px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#0a66c2] text-white font-bold text-[10px]">
              in
            </span>
            <span className="font-medium text-slate-700">{profile.name}</span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span>&bull;</span>
            <span>{profile.location || "Delhi, India"}</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-medium">
            {internalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-[#0a66c2] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={profile?.contact?.linkedin?.href || "https://www.linkedin.com/in/jagmohan-singh49"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0a66c2] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={profile?.contact?.github?.href || "https://github.com/jattiphrswan"}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0a66c2] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-3 text-center text-[11px] text-slate-400">
          LinkedIn-inspired portfolio built with React 19, Tailwind CSS &amp; Vite
        </div>
      </div>
    </footer>
  );
}

