import { verifyToken } from './utils/jwt.js';

export function getTokenFromHeader(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return null;
  if (Array.isArray(header)) return null;
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

export function requireAuth(req, res) {
  try {
    const token = getTokenFromHeader(req);
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return null;
    }
    const decoded = verifyToken(token);
    return { id: decoded.id, email: decoded.email };
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
    return null;
  }
}
