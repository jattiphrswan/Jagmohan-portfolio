import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import SectionCard from "../components/SectionCard";
import { profile } from "../data/profile";
import {
  FiPhone,
  FiMail,
  FiExternalLink,
  FiChevronDown,
  FiAward,
  FiCheckCircle,
  FiFolder,
  FiBookOpen,
} from "react-icons/fi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function ProfilePage() {
  const contactItems = [
    { key: "phone", Icon: FiPhone, label: "Phone", href: profile?.contact?.phone?.href, text: profile?.contact?.phone?.label },
    { key: "email", Icon: FiMail, label: "Email", href: profile?.contact?.email?.href, text: profile?.contact?.email?.label },
    { key: "linkedin", Icon: FaLinkedin, label: "LinkedIn", href: profile?.contact?.linkedin?.href, text: "LinkedIn Profile" },
    { key: "github", Icon: FaGithub, label: "GitHub", href: profile?.contact?.github?.href, text: "GitHub Profile" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(250px,280px)_minmax(0,1fr)_minmax(250px,280px)] xl:grid-cols-[minmax(260px,290px)_minmax(0,1fr)_minmax(260px,290px)] gap-5 items-start">
      {/* ── LEFT SIDEBAR (Desktop: 250-290px) ──────────────────── */}
      <aside className="space-y-4 order-2 lg:order-1 lg:sticky lg:top-20 self-start">
        {/* Contact Card */}
        <SectionCard title="Contact Information" bodyClassName="p-4 space-y-3">
          <div className="space-y-2.5 text-xs">
            {contactItems.map(({ key, Icon, label, href, text }) => {
              if (!href) return null;
              const isExternal = href.startsWith("http");
              return (
                <div key={key} className="flex items-start gap-2.5">
                  <Icon className="mt-0.5 text-slate-500 shrink-0 text-sm" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-medium text-slate-400 block">{label}</span>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-slate-800 font-medium hover:text-[#0a66c2] hover:underline break-all transition-colors"
                    >
                      {text}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href={profile?.contact?.phone?.href || "tel:+919315667284"}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#0a66c2] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#004182]"
            >
              Hire Me
            </a>
          </div>
        </SectionCard>

        {/* Services Card */}
        <SectionCard title="Services Offered" bodyClassName="p-4">
          <ul className="space-y-2 text-xs text-slate-700">
            {(profile?.services || []).map((service) => (
              <li key={service} className="flex items-start gap-2">
                <FiCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
                <span>{service}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        {/* Tools Card */}
        <SectionCard title="Tools & Technologies" bodyClassName="p-4">
          <div className="flex flex-wrap gap-1.5">
            {(profile?.tools || []).map((tool) => (
              <span
                key={tool}
                className="rounded-md border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </SectionCard>
      </aside>

      {/* ── CENTER CONTENT (Desktop: fluid expanded 1fr) ─────── */}
      <section className="space-y-4 order-1 lg:order-2">
        {/* Main Profile Hero Card */}
        <ProfileCard profile={profile} />

        {/* About Section */}
        <SectionCard
          title="About"
          id="about"
          action={
            <Link to="/about" className="text-xs font-semibold text-[#0a66c2] hover:underline">
              Read more
            </Link>
          }
        >
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {profile?.about}
          </p>
        </SectionCard>

        {/* Experience Section */}
        <SectionCard
          title="Experience"
          id="experience"
          action={
            <Link to="/experience" className="text-xs font-semibold text-[#0a66c2] hover:underline">
              View all ({profile?.experience?.length || 0})
            </Link>
          }
        >
          <div className="divide-y divide-slate-100">
            {(profile?.experience || []).map((exp, idx) => (
              <details
                key={idx}
                className="group py-3.5 first:pt-0 last:pb-0 transition-colors"
                open={idx === 0}
              >
                <summary className="cursor-pointer list-none flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-bold text-sm">
                      {exp.company ? exp.company.slice(0, 2).toUpperCase() : "WP"}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                        {exp.role}
                      </h3>
                      <div className="text-xs font-medium text-slate-700 mt-0.5">
                        {exp.company}
                        {exp.type && <span className="mx-1.5 text-slate-300">•</span>}
                        <span className="text-slate-500">{exp.type}</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {exp.start} – {exp.end}
                        {exp.location && <span className="mx-1.5 text-slate-300">•</span>}
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <span className="mt-1 rounded p-1 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 group-open:rotate-180">
                    <FiChevronDown className="text-base" />
                  </span>
                </summary>

                {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                  <ul className="mt-3 ml-13 list-disc pl-5 text-xs text-slate-700 space-y-1.5 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </details>
            ))}
          </div>
        </SectionCard>

        {/* Featured Projects Preview Card */}
        <SectionCard
          title="Featured Projects"
          id="projects"
          action={
            <Link to="/projects" className="text-xs font-semibold text-[#0a66c2] hover:underline flex items-center gap-1">
              <span>View all projects</span>
              <FiExternalLink className="text-[10px]" />
            </Link>
          }
        >
          <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-4 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-[#0a66c2] mb-2">
              <FiFolder className="text-lg" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">Portfolio Projects</h4>
            <p className="mt-1 text-xs text-slate-600 max-w-md mx-auto">
              Completed 80+ client websites, custom WordPress themes, WooCommerce stores, and responsive React web applications.
            </p>
            <Link
              to="/projects"
              className="mt-3 inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Explore Project Showcase
            </Link>
          </div>
        </SectionCard>

        {/* Skills Section */}
        <SectionCard
          title="Skills & Endorsements"
          id="skills"
          action={
            <Link to="/skills" className="text-xs font-semibold text-[#0a66c2] hover:underline">
              All skills
            </Link>
          }
        >
          <div className="flex flex-wrap gap-2">
            {(profile?.skills || []).map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-800 transition-all hover:border-[#0a66c2] hover:bg-blue-50 hover:text-[#0a66c2] hover:-translate-y-0.5 cursor-pointer shadow-2xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Education Section */}
        <SectionCard title="Education" id="education">
          <div className="space-y-3">
            {(profile?.education || []).map((edu, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 border border-slate-200 text-slate-700">
                  <FiBookOpen className="text-lg" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">{edu.school}</h4>
                  <p className="text-xs text-slate-700">{edu.degree}</p>
                  <p className="text-xs text-slate-500">
                    {edu.start} – {edu.end}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      {/* ── RIGHT SIDEBAR (Desktop: 250-290px) ─────────────────── */}
      <aside className="space-y-4 order-3 lg:sticky lg:top-20 self-start">
        {/* Profile Highlights Card */}
        <SectionCard title="Portfolio Highlights" bodyClassName="p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-2.5">
              <div className="text-lg font-bold text-[#0a66c2]">{profile.projects || "80+"}</div>
              <div className="text-[11px] text-slate-500 font-medium">Projects Done</div>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-2.5">
              <div className="text-lg font-bold text-[#0a66c2]">3+ Years</div>
              <div className="text-[11px] text-slate-500 font-medium">Experience</div>
            </div>
          </div>
          <div className="rounded-lg bg-slate-50 border border-slate-100 p-2.5 text-center">
            <div className="text-sm font-semibold text-slate-900">20+ WordPress Sites</div>
            <div className="text-[11px] text-slate-500">Custom themes &amp; Elementor</div>
          </div>
        </SectionCard>

        {/* People Also Viewed Card */}
        <SectionCard title="Related Specializations" bodyClassName="p-4">
          <div className="space-y-3">
            {(profile?.peopleAlsoViewed || []).map((item, idx) => (
              <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#0a66c2] font-semibold text-xs border border-blue-100">
                    <FiAward />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-900 truncate">{item.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{item.role}</div>
                  </div>
                </div>
                <Link
                  to="/about"
                  className="shrink-0 rounded-full border border-slate-300 px-3 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                >
                  {item.button || "View"}
                </Link>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Quick Contact Box */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-4 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0a66c2]">
            Ready to collaborate?
          </h4>
          <p className="mt-1 text-xs text-slate-600">
            Available for freelance web design, WordPress development, and front-end engineering.
          </p>
          <Link
            to="/contact"
            className="mt-3 block text-center rounded-full bg-[#0a66c2] py-2 text-xs font-semibold text-white hover:bg-[#004182] transition shadow-xs"
          >
            Get In Touch
          </Link>
        </div>
      </aside>
    </div>
  );
}

