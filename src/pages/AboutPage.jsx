import { Link } from "react-router-dom";
import SectionCard from "../components/SectionCard";
import { useProfile } from "../context/useProfile";
import { FiCheckCircle, FiTool, FiUser, FiBriefcase, FiMapPin, FiMail, FiPhone } from "react-icons/fi";

export default function AboutPage() {
  const { profile } = useProfile();

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Profile Overview Card */}
      <SectionCard title="About Jagmohan Singh" subtitle="Web Designer & Front-End Developer">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
            {profile.about}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <FiBriefcase className="text-slate-400 shrink-0" />
              <span>Current: <strong className="text-slate-800 font-semibold">{profile.company || "SkyFish Development"}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FiMapPin className="text-slate-400 shrink-0" />
              <span>Location: <strong className="text-slate-800 font-semibold">{profile.location || "Delhi, India"}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FiMail className="text-slate-400 shrink-0" />
              <a href={profile?.contact?.email?.href} className="text-[#0a66c2] hover:underline font-medium">
                {profile?.contact?.email?.label}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <FiPhone className="text-slate-400 shrink-0" />
              <a href={profile?.contact?.phone?.href} className="text-[#0a66c2] hover:underline font-medium">
                {profile?.contact?.phone?.label}
              </a>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Services Grid */}
      <SectionCard title="Services & Capabilities" subtitle="What I bring to your team or project">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(profile.services || []).map((service) => (
            <div
              key={service}
              className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/60 p-3 text-xs"
            >
              <FiCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
              <div>
                <div className="font-semibold text-slate-900">{service}</div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Tools & Workflow */}
      <SectionCard title="Tools & Technologies" subtitle="Languages, frameworks & software">
        <div className="flex flex-wrap gap-2">
          {(profile.tools || []).map((tool) => (
            <span
              key={tool}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-2xs"
            >
              {tool}
            </span>
          ))}
        </div>
      </SectionCard>

      {/* Navigation Footer Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-xs">
        <span className="text-slate-600">Interested in working together?</span>
        <div className="flex gap-2">
          <Link
            to="/experience"
            className="rounded-full border border-slate-300 px-4 py-1.5 font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Experience
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-[#0a66c2] px-4 py-1.5 font-semibold text-white hover:bg-[#004182]"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </div>
  );
}

