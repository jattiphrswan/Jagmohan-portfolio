import { Router } from 'express';
import { prisma, safeDbQuery } from '../lib/prisma.js';
import { activeCertifications } from '../data/certificationsStore.js';

const router = Router();

/**
 * GET /api/certifications
 * Public certifications listing
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

    if (!certs || certs.length === 0) {
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
 * GET /api/certifications/:id
 * Public single certification detail
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

export default router;
