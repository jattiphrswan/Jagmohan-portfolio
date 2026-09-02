import { useState, useEffect, useMemo } from 'react';
import SectionCard from '../components/SectionCard';
import SEO from '../components/SEO';
import { useProfile } from '../context/useProfile';
import { defaultSkills } from '../data/skills';
import { API_BASE } from '../config/api';
import {
  FiCheck,
  FiCode,
  FiLayout,
  FiCpu,
  FiDatabase,
  FiTool,
  FiLayers
} from 'react-icons/fi';

/**
 * Returns an appropriate icon based on category name
 */
function getCategoryIcon(catName = '') {
  const lower = catName.toLowerCase();
  if (lower.includes('front') || lower.includes('react') || lower.includes('code') || lower.includes('web')) {
    return FiCode;
  }
  if (lower.includes('word') || lower.includes('cms') || lower.includes('elementor') || lower.includes('divi')) {
    return FiLayout;
  }
  if (lower.includes('design') || lower.includes('creative') || lower.includes('ui') || lower.includes('ux') || lower.includes('figma')) {
    return FiCpu;
  }
  if (lower.includes('back') || lower.includes('data') || lower.includes('sql') || lower.includes('server') || lower.includes('node') || lower.includes('php')) {
    return FiDatabase;
  }
  if (lower.includes('work') || lower.includes('tool') || lower.includes('cloud') || lower.includes('devops') || lower.includes('git')) {
    return FiTool;
  }
  return FiLayers;
}

export default function SkillsPage() {
  const { profile } = useProfile();
  const [skills, setSkills] = useState(defaultSkills);

  useEffect(() => {
    let isMounted = true;
    async function fetchSkills() {
      try {
        const res = await fetch(`${API_BASE}/api/profile/skills`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && Array.isArray(json.data) && json.data.length > 0) {
            setSkills(json.data);
          }
        }
      } catch {
        // Fallback remains in state
      }
    }

    fetchSkills();
    return () => {
      isMounted = false;
    };
  }, []);

  // Dynamically group FEATURED skills by category
  const categories = useMemo(() => {
    const featuredSkills = skills.filter((s) => s.featured !== false);
    const map = new Map();

    featuredSkills.forEach((skill) => {
      const cat = skill.category?.trim() || 'Core Competencies';
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat).push(skill);
    });

    // Ensure skills within each category are sorted by displayOrder
    map.forEach((list) => {
      list.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    });

    return Array.from(map.entries()).map(([name, groupSkills]) => ({
      name,
      icon: getCategoryIcon(name),
      skills: groupSkills,
    }));
  }, [skills]);

  // Dynamically list ALL skills for the "All Tools & Technologies" section
  const allTools = useMemo(() => {
    const skillNames = skills.map((s) => s.name);
    const profileTools = profile?.tools || [];
    // Deduplicate while preserving order
    return Array.from(new Set([...skillNames, ...profileTools])).filter(Boolean);
  }, [skills, profile]);

  return (
    <>
      <SEO
        title="Technical Skills & Tools | Jagmohan Singh — Front-End Developer"
        description="Technical skills and tools catalogue of Jagmohan Singh, including WordPress, WooCommerce, React, Tailwind CSS, Bootstrap, and UI/UX design tools."
        canonical="/skills"
      />
      <div className="mx-auto max-w-4xl space-y-5">
        {/* Main Skills Card (Featured skills grouped by category) */}
        <SectionCard
          title="Skills & Endorsements"
          subtitle="Core competencies and technical stack"
          headingLevel="h1"
        >
          <div className="space-y-6">
            {categories.map(({ name, icon: Icon, skills: groupSkills }) => (
              <div key={name} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <Icon className="text-[#0a66c2]" />
                  <span>{name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {groupSkills.map((skill) => (
                    <div
                      key={skill.id || skill.name}
                      className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50/70 px-3.5 py-2 text-xs font-semibold text-slate-800 transition-all duration-200 hover:border-[#0a66c2] hover:bg-blue-50 hover:text-[#0a66c2] hover:shadow-xs cursor-default"
                    >
                      <FiCheck className="text-emerald-600 text-sm" />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* All Tools Card (Dynamically shows all tools & technologies) */}
        <SectionCard
          title="All Tools & Technologies"
          subtitle="Software, libraries & environments"
        >
          <div className="flex flex-wrap gap-2">
            {allTools.map((tool) => (
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
