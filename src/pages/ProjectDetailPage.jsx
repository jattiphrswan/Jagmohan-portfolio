import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionCard from '../components/SectionCard';
import { API_BASE } from '../config/api';
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiCheckCircle,
  FiBriefcase,
  FiCalendar,
  FiAlertCircle,
} from 'react-icons/fi';


const fallbackProjects = {
  'skyfish-wordpress-ecommerce': {
    id: 'proj-1',
    slug: 'skyfish-wordpress-ecommerce',
    title: 'SkyFish WordPress & WooCommerce Platform',
    description: 'Custom WordPress & WooCommerce website featuring Elementor Pro, Advanced Custom Fields (ACF), and performance optimization.',
    overview: 'Engineered high-conversion custom WordPress layouts and WooCommerce product structures. Handled custom theme styling, ACF dynamic data modeling, SMTP integration, and Core Web Vitals speed optimization across client deployments.',
    category: 'WordPress & WooCommerce',
    image: null,
    technologies: ['WordPress', 'WooCommerce', 'Elementor Pro', 'ACF', 'CSS3', 'PHP'],
    role: 'Senior WordPress Designer & Developer',
    liveUrl: 'https://skyfish.dev',
    githubUrl: null,
    featured: true
  },
  'danstring-divi-web-solutions': {
    id: 'proj-2',
    slug: 'danstring-divi-web-solutions',
    title: 'Danstring Custom WordPress & Divi Platform',
    description: 'Full-lifecycle WordPress development using Divi Builder with custom reusable page templates and team code review.',
    overview: 'Delivered 20+ responsive WordPress client projects using Divi Builder. Created modular templates, reusable styling components, and mentored junior developers while ensuring strict quality standards and delivery deadlines.',
    category: 'WordPress',
    image: null,
    technologies: ['WordPress', 'Divi Builder', 'Custom CSS', 'PHP', 'JavaScript'],
    role: 'Senior WordPress Developer',
    liveUrl: 'https://danstring.com',
    githubUrl: null,
    featured: true
  },
  'jagmohan-portfolio-v2': {
    id: 'proj-3',
    slug: 'jagmohan-portfolio-v2',
    title: 'LinkedIn-Style React Portfolio V2',
    description: 'Modern, multi-page portfolio application with sticky 3-column LinkedIn UI, Express backend, and PostgreSQL foundation.',
    overview: 'Designed and built an interactive LinkedIn-inspired developer portfolio using React 19, Tailwind CSS, React Router, Node.js Express backend, and Prisma ORM. Features a fluid wide-screen layout, sticky sidebars, and clean RESTful API integration.',
    category: 'React & Frontend',
    image: null,
    technologies: ['React 19', 'Tailwind CSS', 'React Router', 'Node.js', 'Express', 'Prisma', 'PostgreSQL'],
    role: 'Front-End Developer & UI Designer',
    liveUrl: null,
    githubUrl: 'https://github.com/jattiphrswan/Jagmohan-portfolio',
    featured: true
  },
  'smwebtech-responsive-layouts': {
    id: 'proj-4',
    slug: 'smwebtech-responsive-layouts',
    title: 'Responsive Web Design & HTML Themes',
    description: 'Responsive HTML5, CSS3, and Bootstrap web layouts converted from custom UI wireframes with PHP templating.',
    overview: 'Developed cross-browser compatible responsive static web layouts and PHP-based themes using local XAMPP environments during an intensive 6-month frontend development internship.',
    category: 'Front-End',
    image: null,
    technologies: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'PHP', 'XAMPP'],
    role: 'Web Design & Development Intern',
    liveUrl: null,
    githubUrl: 'https://github.com/jattiphrswan',
    featured: false
  }
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const [project, setProject] = useState(fallbackProjects[slug] || null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(!fallbackProjects[slug]);

  useEffect(() => {
    let isMounted = true;
    async function fetchProject() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/projects/${slug}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted && json.data) {
            setProject(json.data);
            setNotFound(false);
          }
        } else if (res.status === 404) {
          if (isMounted) {
            setNotFound(true);
            setProject(null);
          }
        }
      } catch {
        // Fallback already in place
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProject();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-xs text-slate-500">
        Loading project details...
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="mx-auto max-w-lg py-8">
        <SectionCard className="text-center p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600 text-2xl mb-3">
            <FiAlertCircle />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Project Not Found</h1>
          <p className="mt-2 text-xs text-slate-600">
            The project with slug <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">{slug}</code> does not exist or has been moved.
          </p>
          <Link
            to="/projects"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0a66c2] px-5 py-2 text-xs font-semibold text-white hover:bg-[#004182]"
          >
            <FiArrowLeft />
            <span>Back to Projects</span>
          </Link>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a66c2] hover:underline"
        >
          <FiArrowLeft />
          <span>Back to All Projects</span>
        </Link>
        {project.category && (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0a66c2] border border-blue-100 uppercase tracking-wider">
            {project.category}
          </span>
        )}
      </div>

      {/* Main Project Header Card */}
      <SectionCard>
        <div className="space-y-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-snug">
            {project.title}
          </h1>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
            {project.role && (
              <div className="flex items-center gap-1.5">
                <FiBriefcase className="text-slate-400 shrink-0" />
                <span>Role: <strong className="text-slate-800">{project.role}</strong></span>
              </div>
            )}
            {project.category && (
              <div className="flex items-center gap-1.5">
                <FiLayers className="text-slate-400 shrink-0" />
                <span>Domain: <strong className="text-slate-800">{project.category}</strong></span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[#0a66c2] px-5 py-2 text-xs font-semibold text-white hover:bg-[#004182] transition shadow-sm"
              >
                <FiExternalLink />
                <span>Visit Live Website</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <FiGithub />
                <span>Source Repository</span>
              </a>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Project Overview */}
      {project.overview && (
        <SectionCard title="Project Overview & Contribution">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {project.overview}
          </p>
        </SectionCard>
      )}

      {/* Technologies & Stack */}
      {Array.isArray(project.technologies) && project.technologies.length > 0 && (
        <SectionCard title="Technologies & Architecture">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800"
              >
                <FiCheckCircle className="text-emerald-600 text-xs" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
