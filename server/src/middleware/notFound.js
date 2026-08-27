/**
 * 404 handler for unmatched API routes
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route '${req.method} ${req.originalUrl}' not found`
  });
};
