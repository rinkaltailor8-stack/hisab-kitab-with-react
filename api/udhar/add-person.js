import connectDB from '../_db.js';
import UdharKhata from '../models/UdharKhata.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectDB();
    const user = requireAuth(req);

    const { personName } = req.body || {};
    if (!personName) return res.status(400).json({ message: 'personName is required' });

    const khata = await UdharKhata.create({ userId: user.id, personName });
    res.status(201).json(khata);
  } catch (err) {
    if (err.message.includes('Unauthorized') || err.message.includes('token')) {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
