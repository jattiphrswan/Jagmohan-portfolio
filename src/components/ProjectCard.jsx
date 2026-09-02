import { Link } from 'react-router-dom';
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi';
import ProjectScreenshotPreview from './ProjectScreenshotPreview';

export default function ProjectCard({ project }) {
  if (!project) return null;

  return (
    <article className="group flex flex-col rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-slate-300">
      {/* Project Showcase Image (with hover scroll effect) */}
      <div className="mb-3.5">
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`View ${project.title} details`}
          className="block overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a66c2] focus:ring-offset-1"
        >
          <ProjectScreenshotPreview
            src={project.image}
            alt={project.title}
          />
        </Link>
      </div>

      {/* Category & Date Header */}
      <div className="flex items-center justify-between gap-2">
        {project.category && (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#0a66c2] border border-blue-100">
            {project.category}
          </span>
        )}
        {project.role && (
          <span className="text-[11px] font-medium text-slate-500 truncate max-w-[180px]">
            {project.role}
          </span>
        )}
      </div>

      {/* Title & Description */}
      <div className="mt-3 flex-1">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight hover:text-[#0a66c2] transition-colors">
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        {project.description && (
          <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        )}

        {/* Technology Badges */}
        {Array.isArray(project.technologies) && project.technologies.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0a66c2] hover:underline"
        >
          <span>View Details</span>
          <FiArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
        </Link>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <FiGithub className="text-xs" />
              <span>Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-full bg-[#0a66c2] px-3.5 py-1 text-xs font-semibold text-white hover:bg-[#004182] transition-colors shadow-2xs"
            >
              <FiExternalLink className="text-xs" />
              <span>Live Site</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
