import { useState, useEffect, useMemo } from 'react';
import SectionCard from '../components/SectionCard';
import ProjectCard from '../components/ProjectCard';
import { FiFolder, FiSearch, FiFilter, FiAlertCircle } from 'react-icons/fi';

// Verified fallback projects based on authentic repository content
const initialProjects = [
  {
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
    featured: true,
    order: 1
  },
  {
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
    featured: true,
    order: 2
  },
  {
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
    featured: true,
    order: 3
  },
  {
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
    featured: false,
    order: 4
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function fetchProjects() {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/projects');
        if (res.ok) {
          const json = await res.json();
          if (isMounted && Array.isArray(json.data) && json.data.length > 0) {
            setProjects(json.data);
          }
        }
      } catch {
        // Safe fallback is already in state
        if (isMounted) setError(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(['All']);
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(project.technologies) &&
          project.technologies.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          ));
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Header Card */}
      <SectionCard
        title="Projects & Client Work"
        subtitle="Selected web design, custom WordPress themes, and front-end engineering projects"
      >
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            A curated showcase of production client websites, custom WordPress themes, WooCommerce stores, and responsive React applications.
          </p>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-all duration-150 ${
                    selectedCategory === cat
                      ? 'bg-[#0a66c2] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or stack..."
                className="w-full rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-[#0a66c2] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0a66c2]"
              />
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Projects Grid */}
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
          Loading projects...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-xs text-red-600 flex items-center justify-center gap-2">
          <FiAlertCircle />
          <span>{error}</span>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-xs text-slate-500">
          <FiFolder className="mx-auto text-2xl text-slate-400 mb-2" />
          <p className="font-semibold text-slate-700">No matching projects found</p>
          <p className="mt-1 text-slate-400">Try adjusting your search query or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
