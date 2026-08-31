import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

const router = Router();

// Verified real seed projects based strictly on authentic repository work
export const verifiedProjects = [
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
    order: 1,
    createdAt: new Date('2025-01-15').toISOString(),
    updatedAt: new Date('2025-01-15').toISOString()
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
    order: 2,
    createdAt: new Date('2024-06-10').toISOString(),
    updatedAt: new Date('2024-06-10').toISOString()
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
    order: 3,
    createdAt: new Date('2024-11-20').toISOString(),
    updatedAt: new Date('2024-11-20').toISOString()
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
    order: 4,
    createdAt: new Date('2023-08-01').toISOString(),
    updatedAt: new Date('2023-08-01').toISOString()
  }
];

/**
 * GET /api/projects
 * Public projects listing endpoint
 */
router.get('/', async (req, res, next) => {
  try {
    let projects = [];
    try {
      if (prisma && prisma.project) {
        projects = await prisma.project.findMany({
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        });
      }
    } catch {
      projects = [];
    }

    if (!projects || projects.length === 0) {
      projects = verifiedProjects;
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/projects/:slug
 * Public project detail endpoint by slug
 */
router.get('/:slug', async (req, res, next) => {
  try {
    const { slug } = req.params;
    let project = null;

    try {
      if (prisma && prisma.project) {
        project = await prisma.project.findUnique({
          where: { slug }
        });
      }
    } catch {
      project = null;
    }

    if (!project) {
      project = verifiedProjects.find((p) => p.slug === slug) || null;
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with slug '${slug}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
});

export default router;
