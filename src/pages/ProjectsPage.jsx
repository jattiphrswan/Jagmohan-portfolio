import SectionCard from "../components/SectionCard";
import { FiFolder, FiExternalLink, FiGithub, FiLayers } from "react-icons/fi";

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <SectionCard
        title="Projects & Client Work"
        subtitle="Selected web design, WordPress themes, and front-end development projects"
      >
        <div className="space-y-4">
          {/* Note/Status box */}
          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 text-xs text-slate-700">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <FiFolder className="text-[#0a66c2]" />
              <span>Project Showcase System (Ready for Node N6)</span>
            </div>
            <p className="mt-1 text-slate-600 leading-relaxed">
              Real projects will be populated from the database in Node N6. Below is the visual component design establishing responsive layout, technology badges, action buttons, and LinkedIn card styling.
            </p>
          </div>

          {/* Project Card Shell Design Prototype */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {/* Card Model 1 */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
              <div className="h-40 w-full rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200/60 overflow-hidden">
                <div className="text-center p-4">
                  <FiLayers className="mx-auto text-2xl text-slate-400 mb-1" />
                  <span className="text-xs font-semibold text-slate-600 block">Custom WordPress Website</span>
                  <span className="text-[11px] text-slate-400">Theme Design &amp; WooCommerce</span>
                </div>
              </div>

              <div className="mt-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0a66c2]">
                      Client Project
                    </span>
                    <span className="text-[11px] text-slate-400">2025</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mt-1">
                    WordPress &amp; Elementor Development
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    Custom responsive business website built with Elementor, ACF, speed optimization, and cross-browser compatibility.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["WordPress", "Elementor", "CSS3", "ACF"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-700">Explore in N6</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400 cursor-not-allowed"
                    >
                      <FiExternalLink /> Live Demo
                    </button>
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400 cursor-not-allowed"
                    >
                      <FiGithub /> Code
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Model 2 */}
            <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
              <div className="h-40 w-full rounded-lg bg-gradient-to-br from-blue-50 to-slate-100 flex items-center justify-center border border-slate-200/60 overflow-hidden">
                <div className="text-center p-4">
                  <FiFolder className="mx-auto text-2xl text-[#0a66c2] mb-1" />
                  <span className="text-xs font-semibold text-slate-600 block">React &amp; Tailwind UI</span>
                  <span className="text-[11px] text-slate-400">Modern Frontend Application</span>
                </div>
              </div>

              <div className="mt-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0a66c2]">
                      Frontend App
                    </span>
                    <span className="text-[11px] text-slate-400">2024</span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mt-1">
                    Responsive React Application
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    Modular React web application featuring Tailwind CSS styling, responsive multi-page layout, and optimized performance.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {["React", "Tailwind CSS", "Vite", "JavaScript"].map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-700">Explore in N6</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400 cursor-not-allowed"
                    >
                      <FiExternalLink /> Live Demo
                    </button>
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-400 cursor-not-allowed"
                    >
                      <FiGithub /> Code
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

