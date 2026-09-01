import SectionCard from "../components/SectionCard";
import SEO from "../components/SEO";
import { useProfile } from "../context/useProfile";
import { FiCheck, FiLayers, FiCode, FiLayout, FiCpu } from "react-icons/fi";

export default function SkillsPage() {
  const { profile } = useProfile();

  const categories = [
    {
      name: "Front-End Development",
      icon: FiCode,
      skills: ["HTML", "CSS", "Tailwind CSS", "Bootstrap", "React"],
    },
    {
      name: "WordPress & CMS",
      icon: FiLayout,
      skills: ["WordPress", "WooCommerce", "Elementor", "Divi Builder", "ACF"],
    },
    {
      name: "Design & Creative Tools",
      icon: FiCpu,
      skills: ["Photoshop", "Affinity Photo", "Figma", "UI/UX Design"],
    },
  ];

  return (
    <>
      <SEO
        title="Technical Skills & Tools | Jagmohan Singh — Front-End Developer"
        description="Technical skills and tools catalogue of Jagmohan Singh, including WordPress, WooCommerce, React, Tailwind CSS, Bootstrap, and UI/UX design tools."
        canonical="/skills"
      />
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Main Skills Card */}
        <SectionCard
          title="Skills & Endorsements"
          subtitle="Core competencies and technical stack"
          headingLevel="h1"
        >
        <div className="space-y-6">
          {categories.map(({ name, icon: Icon, skills }) => (
            <div key={name} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <Icon className="text-[#0a66c2]" />
                <span>{name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-all duration-200 hover:border-[#0a66c2] hover:bg-blue-50 hover:text-[#0a66c2] hover:shadow-xs cursor-default"
                  >
                    <FiCheck className="text-emerald-600 text-sm" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* All Tools Card */}
      <SectionCard
        title="All Tools & Technologies"
        subtitle="Software, libraries & environments"
      >
        <div className="flex flex-wrap gap-2">
          {(profile.tools || []).map((tool) => (
            <span
              key={tool}
              className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-2xs hover:border-slate-300 transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </SectionCard>
    </div>
    </>
  );
}

