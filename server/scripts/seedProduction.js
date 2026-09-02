import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from 'bcryptjs';
import { prisma } from '../src/lib/prisma.js';
import { activeProjects } from '../src/data/projectsStore.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const authenticExperiences = [
  {
    role: "Senior WordPress Designer & Developer",
    company: "SkyFish Development",
    type: "Full-time",
    start: "2025",
    end: "Present",
    isCurrent: true,
    location: "Remote",
    bullets: [
      "Working as a senior WordPress designer and developer on 20+ client projects.",
      "Building and customizing WordPress websites using Elementor and custom CSS.",
      "Handling plugin customization, theme customization, and advanced site configurations.",
      "Resolving SMTP email issues, CDN conflicts, and website performance problems.",
      "Ensuring mobile responsiveness and cross-browser compatibility across all deliverables."
    ],
    displayOrder: 1
  },
  {
    role: "Senior WordPress Developer",
    company: "Danstring Technologies",
    type: "Full-time",
    start: "2024",
    end: "2025",
    isCurrent: false,
    location: "Remote",
    bullets: [
      "Developed and maintained client websites using the Divi theme builder.",
      "Created reusable page templates and custom CSS styling for consistent branding.",
      "Conducted website audits for speed, broken links, and mobile responsiveness.",
      "Collaborated with project managers to meet strict delivery deadlines."
    ],
    displayOrder: 2
  },
  {
    role: "Web Designer",
    company: "SM Webtech",
    type: "Full-time",
    start: "2023",
    end: "2024",
    isCurrent: false,
    location: "Delhi, India",
    bullets: [
      "Designed and coded responsive website layouts using HTML5, CSS3, Bootstrap, and Tailwind.",
      "Created visual assets, banners, and mockups in Photoshop and Affinity Photo.",
      "Optimized website images and assets for faster page load times.",
      "Collaborated with backend teams to integrate frontend templates with dynamic content."
    ],
    displayOrder: 3
  }
];

const authenticSkills = [
  // Front-End Development
  { name: "HTML5", category: "Front-End Development", displayOrder: 1, featured: true },
  { name: "CSS3", category: "Front-End Development", displayOrder: 2, featured: true },
  { name: "JavaScript (ES6+)", category: "Front-End Development", displayOrder: 3, featured: true },
  { name: "React", category: "Front-End Development", displayOrder: 4, featured: true },
  { name: "Next.js", category: "Front-End Development", displayOrder: 5, featured: true },
  { name: "Tailwind CSS", category: "Front-End Development", displayOrder: 6, featured: true },
  { name: "Bootstrap", category: "Front-End Development", displayOrder: 7, featured: true },

  // WordPress & CMS
  { name: "WordPress", category: "WordPress & CMS", displayOrder: 8, featured: true },
  { name: "WooCommerce", category: "WordPress & CMS", displayOrder: 9, featured: true },
  { name: "Elementor Pro", category: "WordPress & CMS", displayOrder: 10, featured: true },
  { name: "Divi Builder", category: "WordPress & CMS", displayOrder: 11, featured: true },
  { name: "Advanced Custom Fields (ACF)", category: "WordPress & CMS", displayOrder: 12, featured: true },
  { name: "WP Mail SMTP", category: "WordPress & CMS", displayOrder: 13, featured: false },
  { name: "Rank Math SEO", category: "WordPress & CMS", displayOrder: 14, featured: false },

  // Backend & Database
  { name: "PHP", category: "Backend & Database", displayOrder: 15, featured: true },
  { name: "Node.js", category: "Backend & Database", displayOrder: 16, featured: true },
  { name: "Express.js", category: "Backend & Database", displayOrder: 17, featured: true },
  { name: "PostgreSQL", category: "Backend & Database", displayOrder: 18, featured: true },
  { name: "Prisma ORM", category: "Backend & Database", displayOrder: 19, featured: false },
  { name: "Drizzle ORM", category: "Backend & Database", displayOrder: 20, featured: false },

  // Design & Creative Tools
  { name: "Photoshop", category: "Design & Creative Tools", displayOrder: 21, featured: true },
  { name: "Affinity Photo", category: "Design & Creative Tools", displayOrder: 22, featured: true },
  { name: "Figma", category: "Design & Creative Tools", displayOrder: 23, featured: true },
  { name: "UI/UX Design", category: "Design & Creative Tools", displayOrder: 24, featured: true },

  // Workflow & Cloud Tools
  { name: "Git & GitHub", category: "Workflow & Cloud Tools", displayOrder: 25, featured: true },
  { name: "Vercel", category: "Workflow & Cloud Tools", displayOrder: 26, featured: false },
  { name: "Render", category: "Workflow & Cloud Tools", displayOrder: 27, featured: false },
  { name: "Hostinger", category: "Workflow & Cloud Tools", displayOrder: 28, featured: false },
  { name: "Resend", category: "Workflow & Cloud Tools", displayOrder: 29, featured: false },
  { name: "Gmail API", category: "Workflow & Cloud Tools", displayOrder: 30, featured: false },
  { name: "Brevo (Sendinblue)", category: "Workflow & Cloud Tools", displayOrder: 31, featured: false },
  { name: "GoHighLevel (GHL)", category: "Workflow & Cloud Tools", displayOrder: 32, featured: false },
  { name: "Tawk.to", category: "Workflow & Cloud Tools", displayOrder: 33, featured: false },
  { name: "Google Analytics 4 (GA4)", category: "Workflow & Cloud Tools", displayOrder: 34, featured: false },
  { name: "Google Tag Manager", category: "Workflow & Cloud Tools", displayOrder: 35, featured: false }
];

async function seedProduction() {
  console.log("🌱 Starting safe production database initialization...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not defined in environment.");
    process.exit(1);
  }

  try {
    // 1. Admin account bootstrap
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@portfolio.local").trim().toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@2026!";
    const passwordHash = await bcrypt.hash(adminPassword, 10);

    const admin = await prisma.admin.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash }
    });
    console.log(`✅ Admin account configured: ${admin.email}`);

    // 2. Profile bootstrap
    const profileCount = await prisma.profile.count();
    if (profileCount === 0) {
      await prisma.profile.create({
        data: {
          name: "Jagmohan Singh",
          headline: "Web Designer & Front-End Developer | WordPress | React | Tailwind",
          location: "Delhi, India",
          about: "I’m a Web Designer & Front-End Developer with 3+ years of experience building responsive, modern websites. I work with HTML, CSS, Bootstrap, Tailwind, React, and WordPress, and I also design visuals using Photoshop and Affinity Photo.",
          company: "SkyFish Development",
          projectsCount: "80+",
          email: "jattiphrswan49@gmail.com",
          phone: "+91 931 566 7284",
          linkedin: "https://www.linkedin.com/in/jagmohan-singh49",
          github: "https://github.com/jattiphrswan",
          avatar: "/profile.webp",
          banner: "/Banner.jpg",
          services: [
            "Website Design (UI/UX)",
            "WordPress + WooCommerce",
            "Landing Pages",
            "Responsive Frontend",
            "Speed Optimization",
            "Custom Development",
            "Figma"
          ],
          tools: [
            "HTML",
            "CSS",
            "Bootstrap",
            "Tailwind",
            "React",
            "WordPress",
            "Photoshop",
            "Affinity Photo"
          ]
        }
      });
      console.log("✅ Initial authentic profile created.");
    } else {
      console.log("ℹ️ Profile already exists, skipping overwrite.");
    }

    // 3. Experience bootstrap
    const expCount = await prisma.experience.count();
    if (expCount === 0) {
      for (const exp of authenticExperiences) {
        await prisma.experience.create({ data: exp });
      }
      console.log(`✅ ${authenticExperiences.length} authentic experience records seeded.`);
    } else {
      console.log("ℹ️ Experience records already exist, skipping.");
    }

    // 4. Skills bootstrap & synchronization
    let addedSkillsCount = 0;
    for (const skill of authenticSkills) {
      const existing = await prisma.skill.findFirst({
        where: {
          name: { equals: skill.name, mode: 'insensitive' }
        }
      });
      if (!existing) {
        await prisma.skill.create({ data: skill });
        addedSkillsCount++;
      }
    }
    console.log(`✅ Skills synchronized: ${addedSkillsCount} new skills added, authentic catalogue: ${authenticSkills.length}.`);

    // 5. Projects bootstrap
    const projectCount = await prisma.project.count();
    if (projectCount === 0) {
      for (const p of activeProjects) {
        await prisma.project.create({
          data: {
            slug: p.slug,
            title: p.title,
            description: p.description,
            overview: p.overview || "",
            category: p.category,
            image: p.image || null,
            technologies: p.technologies || [],
            role: p.role || "",
            liveUrl: p.liveUrl || null,
            githubUrl: p.githubUrl || null,
            featured: p.featured ?? true,
            order: p.order || 0,
            status: p.status || "published"
          }
        });
      }
      console.log(`✅ ${activeProjects.length} authentic projects seeded.`);
    } else {
      console.log("ℹ️ Projects already exist, skipping.");
    }

    console.log("✨ Production database seeding completed successfully.");
  } catch (err) {
    console.error("❌ Database seeding error:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

seedProduction();
