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
  { name: "HTML5", category: "Frontend", displayOrder: 1 },
  { name: "CSS3", category: "Frontend", displayOrder: 2 },
  { name: "Bootstrap", category: "Frontend", displayOrder: 3 },
  { name: "Tailwind CSS", category: "Frontend", displayOrder: 4 },
  { name: "JavaScript", category: "Frontend", displayOrder: 5 },
  { name: "React", category: "Frontend", displayOrder: 6 },
  { name: "WordPress", category: "WordPress", displayOrder: 7 },
  { name: "WooCommerce", category: "WordPress", displayOrder: 8 },
  { name: "Elementor Pro", category: "WordPress", displayOrder: 9 },
  { name: "Divi Builder", category: "WordPress", displayOrder: 10 },
  { name: "ACF", category: "WordPress", displayOrder: 11 },
  { name: "Photoshop", category: "Design Tools", displayOrder: 12 },
  { name: "Affinity Photo", category: "Design Tools", displayOrder: 13 },
  { name: "Figma", category: "Design Tools", displayOrder: 14 }
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

    // 4. Skills bootstrap
    const skillsCount = await prisma.skill.count();
    if (skillsCount === 0) {
      for (const skill of authenticSkills) {
        await prisma.skill.create({ data: skill });
      }
      console.log(`✅ ${authenticSkills.length} authentic skills seeded.`);
    } else {
      console.log("ℹ️ Skills already exist, skipping.");
    }

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
