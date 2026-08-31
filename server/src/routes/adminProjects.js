import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { activeProjects, updateActiveProjects } from '../data/projectsStore.js';

const router = Router();

// Protect all admin project routes
router.use(requireAuth);

/**
 * Helper to normalize slug
 */
function normalizeSlug(slug, title) {
  if (slug && typeof slug === 'string' && slug.trim()) {
    return slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\-_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\-_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Helper to normalize technologies
 */
function normalizeTechnologies(techInput) {
  if (Array.isArray(techInput)) {
    return techInput.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof techInput === 'string') {
    return techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
  return [];
}

/**
 * GET /api/admin/projects
 * List all projects (published & drafts) for admin dashboard
 */
router.get('/', async (req, res, next) => {
  try {
    let projects = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.findMany({
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }]
        });
      }
      return null;
    });

    if (!projects || projects.length === 0) {
      projects = activeProjects;
    }

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/projects/:id
 * Retrieve single project by ID for editing
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    let project = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.findUnique({
          where: { id }
        });
      }
      return null;
    });

    if (!project) {
      project = activeProjects.find((p) => p.id === id) || null;
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/projects
 * Create a new portfolio project
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      title,
      slug: rawSlug,
      description,
      overview,
      category,
      technologies,
      role,
      liveUrl,
      githubUrl,
      image,
      featured,
      order,
      status
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project title is required.'
      });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project category is required.'
      });
    }

    const slug = normalizeSlug(rawSlug, title);
    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Valid project slug is required.'
      });
    }

    // Check slug uniqueness in DB
    const existingInDb = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.findUnique({ where: { slug } });
      }
      return null;
    });

    if (existingInDb) {
      return res.status(409).json({
        success: false,
        message: `A project with slug '${slug}' already exists.`
      });
    }

    const memoryExisting = activeProjects.find((p) => p.slug === slug);
    if (memoryExisting) {
      return res.status(409).json({
        success: false,
        message: `A project with slug '${slug}' already exists.`
      });
    }

    const newProjectData = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      slug,
      description: description ? description.trim() : '',
      overview: overview ? overview.trim() : null,
      category: category.trim(),
      technologies: normalizeTechnologies(technologies),
      role: role ? role.trim() : null,
      liveUrl: liveUrl ? liveUrl.trim() : null,
      githubUrl: githubUrl ? githubUrl.trim() : null,
      image: image ? image.trim() : null,
      featured: Boolean(featured),
      order: typeof order === 'number' ? order : parseInt(order, 10) || 0,
      status: status === 'draft' ? 'draft' : 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let createdProject = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.create({
          data: newProjectData
        });
      }
      return null;
    });

    if (!createdProject) {
      createdProject = newProjectData;
      updateActiveProjects((list) => [...list, createdProject]);
    }

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: createdProject
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/admin/projects/:id
 * Update an existing project
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug: rawSlug,
      description,
      overview,
      category,
      technologies,
      role,
      liveUrl,
      githubUrl,
      image,
      featured,
      order,
      status
    } = req.body || {};

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Project title is required.'
      });
    }

    const slug = normalizeSlug(rawSlug, title);

    // Check slug conflict with other projects
    const slugOwner = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.findUnique({ where: { slug } });
      }
      return null;
    });

    if (slugOwner && slugOwner.id !== id) {
      return res.status(409).json({
        success: false,
        message: `A project with slug '${slug}' already exists.`
      });
    }

    const memoryConflict = activeProjects.find((p) => p.slug === slug && p.id !== id);
    if (memoryConflict) {
      return res.status(409).json({
        success: false,
        message: `A project with slug '${slug}' already exists.`
      });
    }

    const updatedData = {
      title: title.trim(),
      slug,
      description: description ? description.trim() : '',
      overview: overview ? overview.trim() : null,
      category: category ? category.trim() : 'WordPress',
      technologies: normalizeTechnologies(technologies),
      role: role ? role.trim() : null,
      liveUrl: liveUrl ? liveUrl.trim() : null,
      githubUrl: githubUrl ? githubUrl.trim() : null,
      image: image ? image.trim() : null,
      featured: Boolean(featured),
      order: typeof order === 'number' ? order : parseInt(order, 10) || 0,
      status: status === 'draft' ? 'draft' : 'published',
      updatedAt: new Date().toISOString()
    };

    let updatedProject = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.update({
          where: { id },
          data: updatedData
        });
      }
      return null;
    });

    if (!updatedProject) {
      const idx = activeProjects.findIndex((p) => p.id === id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          message: `Project with ID '${id}' not found`
        });
      }
      updatedProject = { ...activeProjects[idx], ...updatedData };
      updateActiveProjects((list) => {
        const copy = [...list];
        copy[idx] = updatedProject;
        return copy;
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updatedProject
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/admin/projects/:id
 * Delete a project
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = false;

    const dbDeleted = await safeDbQuery(async () => {
      if (prisma && prisma.project) {
        return await prisma.project.delete({
          where: { id }
        });
      }
      return null;
    });

    if (dbDeleted) {
      deleted = true;
    }

    const idx = activeProjects.findIndex((p) => p.id === id);
    if (idx !== -1) {
      updateActiveProjects((list) => list.filter((p) => p.id !== id));
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Project with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
