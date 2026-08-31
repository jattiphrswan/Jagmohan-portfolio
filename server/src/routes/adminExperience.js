import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { activeExperiences, updateActiveExperiences } from '../data/profileStore.js';

const router = Router();

// Protect all admin experience routes
router.use(requireAuth);

/**
 * GET /api/admin/experience
 * List all experience records
 */
router.get('/', async (req, res, next) => {
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
      count: experiences.length,
      data: experiences
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/experience/:id
 * Single experience by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    let item = await safeDbQuery(async () => {
      if (prisma && prisma.experience) {
        return await prisma.experience.findUnique({ where: { id } });
      }
      return null;
    });

    if (!item) {
      item = activeExperiences.find((e) => e.id === id) || null;
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Experience with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: item
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/experience
 * Create experience entry
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      role,
      company,
      type,
      start,
      end,
      isCurrent,
      location,
      bullets,
      displayOrder
    } = req.body || {};

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Role / Job title is required.'
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required.'
      });
    }

    if (!start || !start.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Start year/date is required.'
      });
    }

    const newExpData = {
      id: `exp-${Date.now()}`,
      role: role.trim(),
      company: company.trim(),
      type: type ? type.trim() : 'Full-time',
      start: start.trim(),
      end: isCurrent ? 'Present' : (end ? end.trim() : null),
      isCurrent: Boolean(isCurrent),
      location: location ? location.trim() : 'Remote',
      bullets: Array.isArray(bullets)
        ? bullets.map((b) => String(b).trim()).filter(Boolean)
        : (typeof bullets === 'string'
          ? bullets.split('\n').map((b) => b.trim()).filter(Boolean)
          : []),
      displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10) || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let created = await safeDbQuery(async () => {
      if (prisma && prisma.experience) {
        return await prisma.experience.create({ data: newExpData });
      }
      return null;
    });

    if (!created) {
      created = newExpData;
      updateActiveExperiences((list) => [...list, created]);
    }

    return res.status(201).json({
      success: true,
      message: 'Experience created successfully.',
      data: created
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/admin/experience/:id
 * Update experience entry
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      role,
      company,
      type,
      start,
      end,
      isCurrent,
      location,
      bullets,
      displayOrder
    } = req.body || {};

    if (!role || !role.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Role / Job title is required.'
      });
    }

    if (!company || !company.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Company name is required.'
      });
    }

    const updatedData = {
      role: role.trim(),
      company: company.trim(),
      type: type ? type.trim() : 'Full-time',
      start: start ? start.trim() : '2024',
      end: isCurrent ? 'Present' : (end ? end.trim() : null),
      isCurrent: Boolean(isCurrent),
      location: location ? location.trim() : 'Remote',
      bullets: Array.isArray(bullets)
        ? bullets.map((b) => String(b).trim()).filter(Boolean)
        : (typeof bullets === 'string'
          ? bullets.split('\n').map((b) => b.trim()).filter(Boolean)
          : []),
      displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10) || 0,
      updatedAt: new Date().toISOString()
    };

    let updated = await safeDbQuery(async () => {
      if (prisma && prisma.experience) {
        return await prisma.experience.update({
          where: { id },
          data: updatedData
        });
      }
      return null;
    });

    if (!updated) {
      const idx = activeExperiences.findIndex((e) => e.id === id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          message: `Experience with ID '${id}' not found`
        });
      }
      updated = { ...activeExperiences[idx], ...updatedData };
      updateActiveExperiences((list) => {
        const copy = [...list];
        copy[idx] = updated;
        return copy;
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Experience updated successfully.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/admin/experience/:id
 * Delete experience entry
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = false;

    const dbDeleted = await safeDbQuery(async () => {
      if (prisma && prisma.experience) {
        return await prisma.experience.delete({ where: { id } });
      }
      return null;
    });

    if (dbDeleted) {
      deleted = true;
    }

    const idx = activeExperiences.findIndex((e) => e.id === id);
    if (idx !== -1) {
      updateActiveExperiences((list) => list.filter((e) => e.id !== id));
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Experience with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Experience deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
