import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { activeProfile, updateActiveProfile } from '../data/profileStore.js';

const router = Router();

// Protect all admin profile routes
router.use(requireAuth);

/**
 * GET /api/admin/profile
 * Get current profile configuration
 */
router.get('/', async (req, res, next) => {
  try {
    let profile = await safeDbQuery(async () => {
      if (prisma && prisma.profile) {
        return await prisma.profile.findFirst();
      }
      return null;
    });

    if (!profile) {
      profile = activeProfile;
    }

    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/admin/profile
 * Update profile information
 */
router.put('/', async (req, res, next) => {
  try {
    const {
      name,
      headline,
      location,
      about,
      company,
      projectsCount,
      projectsDone,
      yearsExperience,
      wordpressProjects,
      wordpressProjectsSubtitle,
      email,
      phone,
      linkedin,
      github,
      avatar,
      banner,
      services,
      tools
    } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.'
      });
    }

    if (!headline || !headline.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Professional headline is required.'
      });
    }

    const resolvedProjectsDone = projectsDone ? projectsDone.trim() : (projectsCount ? projectsCount.trim() : '60+');

    const updatedData = {
      name: name.trim(),
      headline: headline.trim(),
      location: location ? location.trim() : 'Delhi, India',
      about: about ? about.trim() : '',
      company: company ? company.trim() : 'SkyFish Development',
      projectsCount: resolvedProjectsDone,
      projectsDone: resolvedProjectsDone,
      yearsExperience: yearsExperience ? yearsExperience.trim() : '3+ Years',
      wordpressProjects: wordpressProjects ? wordpressProjects.trim() : '50+ WordPress Projects',
      wordpressProjectsSubtitle: wordpressProjectsSubtitle ? wordpressProjectsSubtitle.trim() : 'Custom Builds, WooCommerce & Elementor',
      email: email ? email.trim() : null,
      phone: phone ? phone.trim() : null,
      linkedin: linkedin ? linkedin.trim() : null,
      github: github ? github.trim() : null,
      avatar: avatar ? avatar.trim() : null,
      banner: banner ? banner.trim() : null,
      services: Array.isArray(services) ? services.map((s) => String(s).trim()).filter(Boolean) : [],
      tools: Array.isArray(tools) ? tools.map((t) => String(t).trim()).filter(Boolean) : [],
      updatedAt: new Date().toISOString()
    };

    let updated = await safeDbQuery(async () => {
      if (prisma && prisma.profile) {
        const existing = await prisma.profile.findFirst();
        if (existing) {
          return await prisma.profile.update({
            where: { id: existing.id },
            data: updatedData
          });
        }
        return await prisma.profile.create({
          data: { id: 'profile-main', ...updatedData }
        });
      }
      return null;
    });

    if (!updated) {
      updated = updateActiveProfile(updatedData);
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

export default router;
