import connectDB from '../_db.js';
import UdharKhata from '../models/UdharKhata.js';
import UdharEntry from '../models/UdharEntry.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectDB();
    const user = requireAuth(req, res);
    if (!user) return;

    const { id } = req.query;
    const khata = await UdharKhata.findOne({ _id: id, userId: user.id });
    if (!khata) return res.status(404).json({ message: 'Not found' });

    const entries = await UdharEntry.find({ udharKhataId: id }).sort({ date: -1 });
    res.json({ khata, entries });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
