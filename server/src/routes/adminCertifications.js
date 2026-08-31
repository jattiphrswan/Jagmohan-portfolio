import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';
import { activeCertifications, updateActiveCertifications } from '../data/certificationsStore.js';

const router = Router();
router.use(requireAuth);

/**
 * GET /api/admin/certifications
 * List all certifications
 */
router.get('/', async (req, res, next) => {
  try {
    let certs = await safeDbQuery(async () => {
      if (prisma && prisma.certification) {
        return await prisma.certification.findMany({
          orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }]
        });
      }
      return null;
    });

    if (!certs) {
      certs = activeCertifications;
    }

    return res.status(200).json({
      success: true,
      count: certs.length,
      data: certs
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/admin/certifications/:id
 * Single certification
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let cert = await safeDbQuery(async () => {
      if (prisma && prisma.certification) {
        return await prisma.certification.findUnique({ where: { id } });
      }
      return null;
    });

    if (!cert) {
      cert = activeCertifications.find((c) => c.id === id) || null;
    }

    if (!cert) {
      return res.status(404).json({
        success: false,
        message: `Certification with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: cert
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/admin/certifications
 * Create certification entry
 */
router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      issuer,
      issueDate,
      credentialUrl,
      imageUrl,
      imagePublicId,
      description,
      displayOrder,
      featured
    } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Certification Name is required.'
      });
    }

    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Certificate Image is required.'
      });
    }

    // Validate credential URL if provided
    if (credentialUrl && credentialUrl.trim()) {
      try {
        new URL(credentialUrl.trim());
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Credential URL must be a valid http or https URL.'
        });
      }
    }

    const newCertData = {
      id: `cert-${Date.now()}`,
      name: name.trim(),
      issuer: issuer ? issuer.trim() : null,
      issueDate: issueDate ? issueDate.trim() : null,
      credentialUrl: credentialUrl ? credentialUrl.trim() : null,
      imageUrl: imageUrl.trim(),
      imagePublicId: imagePublicId ? imagePublicId.trim() : null,
      description: description ? description.trim() : null,
      displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10) || 0,
      featured: featured !== undefined ? Boolean(featured) : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    let created = await safeDbQuery(async () => {
      if (prisma && prisma.certification) {
        return await prisma.certification.create({ data: newCertData });
      }
      return null;
    });

    if (!created) {
      created = newCertData;
      updateActiveCertifications((list) => [...list, created]);
    }

    return res.status(201).json({
      success: true,
      message: 'Certification created successfully.',
      data: created
    });
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/admin/certifications/:id
 * Update certification entry
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name,
      issuer,
      issueDate,
      credentialUrl,
      imageUrl,
      imagePublicId,
      description,
      displayOrder,
      featured
    } = req.body || {};

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Certification Name is required.'
      });
    }

    if (!imageUrl || !imageUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Certificate Image is required.'
      });
    }

    if (credentialUrl && credentialUrl.trim()) {
      try {
        new URL(credentialUrl.trim());
      } catch {
        return res.status(400).json({
          success: false,
          message: 'Credential URL must be a valid http or https URL.'
        });
      }
    }

    const updatedData = {
      name: name.trim(),
      issuer: issuer ? issuer.trim() : null,
      issueDate: issueDate ? issueDate.trim() : null,
      credentialUrl: credentialUrl ? credentialUrl.trim() : null,
      imageUrl: imageUrl.trim(),
      imagePublicId: imagePublicId ? imagePublicId.trim() : null,
      description: description ? description.trim() : null,
      displayOrder: typeof displayOrder === 'number' ? displayOrder : parseInt(displayOrder, 10) || 0,
      featured: featured !== undefined ? Boolean(featured) : true,
      updatedAt: new Date().toISOString()
    };

    let updated = await safeDbQuery(async () => {
      if (prisma && prisma.certification) {
        return await prisma.certification.update({
          where: { id },
          data: updatedData
        });
      }
      return null;
    });

    if (!updated) {
      const idx = activeCertifications.findIndex((c) => c.id === id);
      if (idx === -1) {
        return res.status(404).json({
          success: false,
          message: `Certification with ID '${id}' not found`
        });
      }
      updated = { ...activeCertifications[idx], ...updatedData };
      updateActiveCertifications((list) => {
        const copy = [...list];
        copy[idx] = updated;
        return copy;
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Certification updated successfully.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /api/admin/certifications/:id
 * Delete certification entry
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    let deleted = false;

    const dbDeleted = await safeDbQuery(async () => {
      if (prisma && prisma.certification) {
        return await prisma.certification.delete({ where: { id } });
      }
      return null;
    });

    if (dbDeleted) {
      deleted = true;
    }

    const idx = activeCertifications.findIndex((c) => c.id === id);
    if (idx !== -1) {
      updateActiveCertifications((list) => list.filter((c) => c.id !== id));
      deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Certification with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Certification deleted successfully.'
    });
  } catch (err) {
    next(err);
  }
});

export default router;
