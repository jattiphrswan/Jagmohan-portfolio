import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { activeSkills, updateActiveSkills } from '../data/profileStore.js';

const router = Router();

// Protect all admin skill routes
router.use(requireAuth);

/**
 * GET /api/admin/skills
 * List all skill items
 */
router.get('/', async (req, res, next) => {
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
      count: skills.length,
      data: skills
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/skills/:id
 * Single skill by ID
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    let item = await safeDbQuery(async () => {
      if (prisma && prisma.skill) {
        return await prisma.skill.findUnique({ where: { id } });
      }
      return null;
    });

    if (!item) {
      item = activeSkills.find((s) => s.id === id) || null;
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID '${id}' not found`
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
 * POST /api/admin/skills
 * Create skill entry
 */
router.post('/', async (req, res, next) => {
  try {
    const { name, category, displayOrder, featured } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Skill name is required.'
      });
    }

    const newSkillData = {
      id: `skill-${Date.now()}`,
      name: name.trim(),
      category: category ? category.trim() : 'Frontend',
      displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10) || 0,
      featured: featured !== undefined ? Boolean(featured) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let created = await safeDbQuery(async () => {
      if (prisma && prisma.skill) {
        return await prisma.skill.create({ data: newSkillData });
      }
      return null;
    });

    if (!created) {
      created = newSkillData;
      updateActiveSkills((list) => [...list, created]);
    }

    return res.status(201).json({
      success: true,
      message: 'Skill created successfully.',
      data: created
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/admin/skills/:id
 * Update skill entry
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, displayOrder, featured } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Skill name is required.'
      });
    }

    const updatedData = {
      name: name.trim(),
      category: category ? category.trim() : 'Frontend',
      displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10) || 0,
      featured: featured !== undefined ? Boolean(featured) : true,
      updatedAt: new Date().toISOString()
    };

    let updated = await safeDbQuery(async () => {
      if (prisma && prisma.skill) {
        return await prisma.skill.update({
          where: { id },
          data: updatedData
        });
      }
      return null;
    });

    if (!updated) {
      const idx = activeSkills.findIndex((s) => s.id === id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          message: `Skill with ID '${id}' not found`
        });
      }
      updated = { ...activeSkills[idx], ...updatedData };
      updateActiveSkills((list) => {
        const copy = [...list];
        copy[idx] = updated;
        return copy;
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Skill updated successfully.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/admin/skills/:id
 * Delete skill entry
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = false;

    const dbDeleted = await safeDbQuery(async () => {
      if (prisma && prisma.skill) {
        return await prisma.skill.delete({ where: { id } });
      }
      return null;
    });

    if (dbDeleted) {
      deleted = true;
    }

    const idx = activeSkills.findIndex((s) => s.id === id);
    if (idx !== -1) {
      updateActiveSkills((list) => list.filter((s) => s.id !== id));
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Skill with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Skill deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
