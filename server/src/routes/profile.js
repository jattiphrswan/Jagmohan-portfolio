import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { activeProfile, activeExperiences, activeSkills } from '../data/profileStore.js';

const router = Router();

/**
 * GET /api/profile
 * Public aggregated profile endpoint
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

    let experiences = await safeDbQuery(async () => {
      if (prisma && prisma.experience) {
        return await prisma.experience.findMany({
          orderBy: [{ displayOrder: 'asc' }, { start: 'desc' }]
        });
      }
      return null;
    });

    if (!experiences || experiences.length === 0) {
      experiences = activeExperiences;
    }

    let skills = await safeDbQuery(async () => {
      if (prisma && prisma.skill) {
        return await prisma.skill.findMany({
          orderBy: [{ displayOrder: 'asc' }]
        });
      }
      return null;
    });

    if (!skills || skills.length === 0) {
      skills = activeSkills;
    }

    // Assemble unified public payload
    const unifiedPayload = {
      ...profile,
      contact: {
        email: profile.email || 'jattiphrswan49@gmail.com',
        phone: profile.phone || '+91 931 566 7284',
        linkedin: profile.linkedin || 'https://www.linkedin.com/in/jagmohan-singh49',
        github: profile.github || 'https://github.com/jattiphrswan'
      },
      experience: experiences,
      skills: skills.map((s) => s.name),
      skillsList: skills,
      education: [
        {
          institution: 'Academic Education',
          degree: 'Computer Applications & Web Development',
          start: '2019',
          end: '2022'
        }
      ]
    };

    return res.status(200).json({
      success: true,
      data: unifiedPayload,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/profile/experience
 * Public experience list
 */
router.get('/experience', async (req, res, next) => {
  try {
    let experiences = await safeDbQuery(async () => {
      if (prisma && prisma.experience) {
        return await prisma.experience.findMany({
          orderBy: [{ displayOrder: 'asc' }, { start: 'desc' }]
        });
      }
      return null;
    });

    if (!experiences || experiences.length === 0) {
      experiences = activeExperiences;
    }

    return res.status(200).json({
      success: true,
      data: experiences
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/profile/skills
 * Public skills list
 */
router.get('/skills', async (req, res, next) => {
  try {
    let skills = await safeDbQuery(async () => {
      if (prisma && prisma.skill) {
        return await prisma.skill.findMany({
          orderBy: [{ displayOrder: 'asc' }]
        });
      }
      return null;
    });

    if (!skills || skills.length === 0) {
      skills = activeSkills;
    }

    return res.status(200).json({
      success: true,
      data: skills
    });
  } catch (err) {
    next(err);
  }
});

export default router;
