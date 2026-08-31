import SectionCard from "../components/SectionCard";
import { useProfile } from "../context/useProfile";
import { FiChevronDown, FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";

export default function ExperiencePage() {
  const { profile } = useProfile();

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <SectionCard
        title="Experience"
        subtitle={`${profile.experience?.length || 0} positions • Web Design, Front-End & WordPress`}
      >
        <div className="divide-y divide-slate-100">
          {(profile.experience || []).map((exp, idx) => (
            <details
              key={idx}
              className="group py-4 first:pt-0 last:pb-0 transition-colors"
              open={idx < 2}
            >
              <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  {/* Company Logo Badge */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-sm shadow-2xs">
                    {exp.company ? exp.company.slice(0, 2).toUpperCase() : "WP"}
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-slate-900 leading-snug">
                      {exp.role}
                    </h2>
                    <div className="text-xs font-semibold text-slate-700 mt-0.5">
                      {exp.company}
                      {exp.type && <span className="mx-1.5 text-slate-300">•</span>}
                      <span className="font-normal text-slate-500">{exp.type}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <FiCalendar className="text-slate-400" />
                        <span>{exp.start} – {exp.end}</span>
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <FiMapPin className="text-slate-400" />
                          <span>{exp.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <span className="mt-1 rounded-md p-1.5 text-slate-400 hover:text-slate-600 transition-transform duration-200 group-open:rotate-180">
                  <FiChevronDown className="text-lg" />
                </span>
              </summary>

              {Array.isArray(exp.bullets) && exp.bullets.length > 0 && (
                <div className="mt-3 ml-14 pl-1 border-l-2 border-slate-100">
                  <ul className="list-disc pl-4 text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              )}
            </details>
          ))}
        </div>
      </SectionCard>

      {/* Education Card */}
      <SectionCard title="Education" subtitle="Academic background">
        <div className="space-y-3">
          {(profile.education || []).map((edu, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-800">
                <FiBriefcase className="text-lg" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{edu.school}</h3>
                <p className="text-xs text-slate-700">{edu.degree}</p>
                <p className="text-xs text-slate-500">{edu.start} – {edu.end}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

