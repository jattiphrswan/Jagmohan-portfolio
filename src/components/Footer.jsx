import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto w-full max-w-[1600px] px-3 py-4 sm:px-6 sm:py-6">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-slate-500">
          {(profile.footer?.links || []).map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="hover:text-slate-900 hover:underline"
              >
                {link.label}
              </a>
              {i < profile.footer.links.length - 1 && (
                <span className="text-slate-300">•</span>
              )}
            </span>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-3 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {profile.name} · {profile.location}
        </div>

        {/* Optional branding (LinkedIn-style subtle text) */}
        <div className="mt-1 text-center text-[11px] text-slate-300">
          Built with React & Tailwind
        </div>
      </div>
    </footer>
  );
}
