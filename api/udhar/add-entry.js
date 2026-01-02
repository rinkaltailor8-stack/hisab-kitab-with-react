import connectDB from '../_db.js';
import UdharEntry from '../models/UdharEntry.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectDB();
    const user = requireAuth(req);

    const { udharKhataId, date, amount, reason } = req.body || {};
    if (!udharKhataId || !date || amount == null) return res.status(400).json({ message: 'Required fields missing' });

    const entry = await UdharEntry.create({ udharKhataId, date, amount, reason });
    res.status(201).json(entry);
  } catch (err) {
    if (err.message.includes('Unauthorized') || err.message.includes('token')) {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
