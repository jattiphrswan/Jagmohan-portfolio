/**
 * Helper to resolve image URLs for local assets and remote storage (Cloudinary, Base64, absolute URLs)
 */
export function getImageUrl(imagePath, fallback = '') {
  if (!imagePath || typeof imagePath !== 'string') return fallback;
  const trimmed = imagePath.trim();
  if (!trimmed) return fallback;

  // Already a full remote URL, base64 data URI, or blob URI
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  const base = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL ? import.meta.env.BASE_URL : '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;

  if (cleanPath.startsWith('images/')) {
    return `${normalizedBase}${cleanPath}`;
  }

  return `${normalizedBase}images/${cleanPath}`;
}
