// Active verified Profile dataset
export let activeProfile = {
  id: 'profile-main',
  name: 'Jagmohan Singh',
  headline: 'Web Designer & Front-End Developer | WordPress | React | Tailwind',
  location: 'Delhi, India',
  about: 'I’m a Web Designer & Front-End Developer with 3+ years of experience building responsive, modern websites. I specialize in crafting clean user interfaces with HTML, CSS, Tailwind, and React, alongside building and optimizing custom WordPress and WooCommerce websites.',
  company: 'SkyFish Development',
  projectsCount: '80+',
  email: 'jattiphrswan49@gmail.com',
  phone: '+91 931 566 7284',
  linkedin: 'https://www.linkedin.com/in/jagmohan-singh49',
  github: 'https://github.com/jattiphrswan',
  avatar: 'profile.webp',
  banner: 'Banner.jpg',
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
  createdAt: new Date('2025-01-01').toISOString(),
  updatedAt: new Date().toISOString()
};

export function updateActiveProfile(updater) {
  if (typeof updater === 'function') {
    activeProfile = updater(activeProfile);
  } else {
    activeProfile = { ...activeProfile, ...updater, updatedAt: new Date().toISOString() };
  }
  return activeProfile;
}

// Active verified Experience dataset
export let activeExperiences = [
  {
    id: 'exp-1',
    role: 'Senior WordPress Designer & Developer',
    company: 'SkyFish Development',
    type: 'Full-time',
    start: '2025',
    end: 'Present',
    isCurrent: true,
    location: 'Remote',
    bullets: [
      'Leading WordPress design and front-end development across 20+ client projects.',
      'Building high-conversion WordPress websites using Elementor and custom CSS.',
      'Handling deep theme customization, plugin integrations, and dynamic content with ACF.',
      'Resolving SMTP email configurations, CDN caching conflicts, and performance bottlenecks.',
      'Auditing and improving Core Web Vitals and mobile responsiveness.'
    ],
    displayOrder: 1,
    createdAt: new Date('2025-01-15').toISOString(),
    updatedAt: new Date('2025-01-15').toISOString()
  },
  {
    id: 'exp-2',
    role: 'Senior WordPress Developer',
    company: 'Danstring Technologies',
    type: 'Full-time',
    start: '2024',
    end: '2025',
    isCurrent: false,
    location: 'On-site',
    bullets: [
      'Delivered 20+ client websites using Divi Builder and customized CSS.',
      'Built reusable page layouts and responsive design templates.',
      'Mentored a team of 3–4 junior developers and interns through code reviews and task planning.',
      'Ensured strict adherence to client requirements and delivery timelines.'
    ],
    displayOrder: 2,
    createdAt: new Date('2024-06-10').toISOString(),
    updatedAt: new Date('2024-06-10').toISOString()
  },
  {
    id: 'exp-3',
    role: 'Web Design & Development Intern',
    company: 'SMWebTech India',
    type: 'Internship',
    start: '2023',
    end: '2024',
    isCurrent: false,
    location: 'On-site',
    bullets: [
      'Completed intensive hands-on frontend development with HTML, CSS, and Bootstrap.',
      'Developed static web layouts and PHP-based themes in local XAMPP environments.',
      'Assisted senior designers in converting UI wireframes into functional pages.'
    ],
    displayOrder: 3,
    createdAt: new Date('2023-08-01').toISOString(),
    updatedAt: new Date('2023-08-01').toISOString()
  },
  {
    id: 'exp-4',
    role: 'Web Designer & Developer',
    company: 'Freelance & Agency Collaborations',
    type: 'Contract',
    start: '2023',
    end: 'Present',
    isCurrent: true,
    location: 'Remote',
    bullets: [
      'Designed custom UI/UX mockups and delivered responsive web solutions for global clients.',
      'Created high-performance landing pages in React, Tailwind CSS, and WordPress.',
      'Collaborated directly with business owners to deliver tailored digital web experiences.'
    ],
    displayOrder: 4,
    createdAt: new Date('2023-01-01').toISOString(),
    updatedAt: new Date('2023-01-01').toISOString()
  }
];

export function updateActiveExperiences(updater) {
  activeExperiences = updater(activeExperiences);
  return activeExperiences;
}

// Active verified Skills dataset
export let activeSkills = [
  { id: 'skill-1', name: 'HTML5', category: 'Frontend', displayOrder: 1, featured: true },
  { id: 'skill-2', name: 'CSS3', category: 'Frontend', displayOrder: 2, featured: true },
  { id: 'skill-3', name: 'JavaScript (ES6+)', category: 'Frontend', displayOrder: 3, featured: true },
  { id: 'skill-4', name: 'React', category: 'Frontend', displayOrder: 4, featured: true },
  { id: 'skill-5', name: 'Tailwind CSS', category: 'Frontend', displayOrder: 5, featured: true },
  { id: 'skill-6', name: 'Bootstrap', category: 'Frontend', displayOrder: 6, featured: true },
  { id: 'skill-7', name: 'WordPress', category: 'WordPress & CMS', displayOrder: 7, featured: true },
  { id: 'skill-8', name: 'WooCommerce', category: 'WordPress & CMS', displayOrder: 8, featured: true },
  { id: 'skill-9', name: 'Elementor Pro', category: 'WordPress & CMS', displayOrder: 9, featured: true },
  { id: 'skill-10', name: 'Divi Builder', category: 'WordPress & CMS', displayOrder: 10, featured: true },
  { id: 'skill-11', name: 'Advanced Custom Fields (ACF)', category: 'WordPress & CMS', displayOrder: 11, featured: true },
  { id: 'skill-12', name: 'Photoshop', category: 'Design Tools', displayOrder: 12, featured: true },
  { id: 'skill-13', name: 'Affinity Photo', category: 'Design Tools', displayOrder: 13, featured: true },
  { id: 'skill-14', name: 'Figma', category: 'Design Tools', displayOrder: 14, featured: true },
  { id: 'skill-15', name: 'Git & GitHub', category: 'Workflow & Tools', displayOrder: 15, featured: true }
];

export function updateActiveSkills(updater) {
  activeSkills = updater(activeSkills);
  return activeSkills;
}
