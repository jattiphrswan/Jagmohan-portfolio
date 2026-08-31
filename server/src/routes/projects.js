import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { activeProjects } from '../data/projectsStore.js';

const router = Router();

/**
 * GET /api/projects
 * Public projects listing endpoint (published projects only)
 */
router.get('/', async (req, res, next) => {
  try {
    let projects = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.findMany({
          where: { status: 'published' },
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        });
      }
      return null;
    });

    if (!projects || projects.length === 0) {
      projects = activeProjects.filter((p) => p.status !== 'draft');
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

    let project = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.findUnique({
          where: { slug }
        });
      }
      return null;
    });

    if (!project) {
      project = activeProjects.find((p) => p.slug === slug && p.status !== 'draft') || null;
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
