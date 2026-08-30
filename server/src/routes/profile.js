import { Router } from 'express';

const router = Router();

const publicProfile = {
  name: 'Jagmohan Singh',
  headline: 'Web Designer & Front-End Developer | WordPress | React | Tailwind',
  location: 'Delhi, India',
  about: 'I’m a Web Designer & Front-End Developer with 3+ years of experience building responsive, modern websites. I specialize in crafting clean user interfaces with HTML, CSS, Tailwind, and React, alongside building and optimizing custom WordPress and WooCommerce websites.',
  company: 'SkyFish Development',
  projectsCount: '80+',
  contact: {
    email: 'jattiphrswan49@gmail.com',
    phone: '+91 931 566 7284',
    linkedin: 'https://www.linkedin.com/in/jagmohan-singh49',
    github: 'https://github.com/jattiphrswan'
  },
  services: [
    'Website Design (UI/UX)',
    'WordPress + WooCommerce Development',
    'Landing Page Design & Conversion Optimization',
    'Responsive Front-End Development (React + Tailwind)',
    'Core Web Vitals & Speed Optimization',
    'Custom Theme & Plugin Customization',
    'Figma to Pixel-Perfect Code'
  ],
  tools: [
    'HTML5',
    'CSS3',
    'JavaScript (ES6+)',
    'React',
    'Tailwind CSS',
    'Bootstrap',
    'WordPress',
    'WooCommerce',
    'Elementor Pro',
    'Divi Builder',
    'Advanced Custom Fields (ACF)',
    'Photoshop',
    'Affinity Photo',
    'Figma',
    'Git & GitHub'
  ],
  experience: [
    {
      role: 'Senior WordPress Designer & Developer',
      company: 'SkyFish Development',
      type: 'Full-time',
      start: '2025',
      end: 'Present',
      location: 'Remote',
      bullets: [
        'Leading WordPress design and front-end development across 20+ client projects.',
        'Building high-conversion WordPress websites using Elementor and custom CSS.',
        'Handling deep theme customization, plugin integrations, and dynamic content with ACF.',
        'Resolving SMTP email configurations, CDN caching conflicts, and performance bottlenecks.',
        'Auditing and improving Core Web Vitals and mobile responsiveness.'
      ]
    },
    {
      role: 'Senior WordPress Developer',
      company: 'Danstring Technologies',
      type: 'Full-time',
      start: '2024',
      end: '2025',
      location: 'On-site',
      bullets: [
        'Delivered 20+ client websites using Divi Builder and customized CSS.',
        'Built reusable page layouts and responsive design templates.',
        'Mentored a team of 3–4 junior developers and interns through code reviews and task planning.',
        'Ensured strict adherence to client requirements and delivery timelines.'
      ]
    },
    {
      role: 'Web Design & Development Intern',
      company: 'SMWebTech India',
      type: 'Internship',
      start: '2023',
      end: '2024',
      location: 'On-site',
      bullets: [
        'Completed intensive hands-on frontend development with HTML, CSS, and Bootstrap.',
        'Developed static web layouts and PHP-based themes in local XAMPP environments.',
        'Assisted senior designers in converting UI wireframes into functional pages.'
      ]
    },
    {
      role: 'Web Designer & Developer',
      company: 'Freelance & Agency Collaborations',
      type: 'Contract',
      start: '2023',
      end: 'Present',
      location: 'Remote',
      bullets: [
        'Designed custom UI/UX mockups and delivered responsive web solutions for global clients.',
        'Created high-performance landing pages in React, Tailwind CSS, and WordPress.',
        'Collaborated directly with business owners to deliver tailored digital web experiences.'
      ]
    }
  ],
  education: [
    {
      institution: 'Academic Education',
      degree: 'Computer Applications & Web Development',
      start: '2019',
      end: '2022'
    }
  ]
};

/**
 * GET /api/profile
 * Public profile data endpoint
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: publicProfile,
    timestamp: new Date().toISOString()
  });
});

export default router;
