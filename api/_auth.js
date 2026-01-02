import { verifyToken } from './utils/jwt.js';

export function getTokenFromHeader(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return null;
  if (Array.isArray(header)) return null;
  return header.startsWith('Bearer ') ? header.slice(7) : null;
}

export function requireAuth(req) {
  const token = getTokenFromHeader(req);
  if (!token) {
    throw new Error('Unauthorized: No token provided');
  }
  try {
    const decoded = verifyToken(token);
    return { id: decoded.id, email: decoded.email };
  } catch {
    throw new Error('Invalid or expired token');
  }
}
