import connectDB from '../_db.js';
import UdharKhata from '../models/UdharKhata.js';
import UdharEntry from '../models/UdharEntry.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectDB();
    const user = requireAuth(req);

    // Support both Express params and Vercel query
    const id = req.params?.id || req.query?.id;
    if (!id) return res.status(400).json({ message: 'ID parameter is required' });

    const khata = await UdharKhata.findOne({ _id: id, userId: user.id });
    if (!khata) return res.status(404).json({ message: 'Udhar khata not found' });

    const entries = await UdharEntry.find({ udharKhataId: id }).sort({ date: -1 });
    res.json({ khata, entries });
  } catch (err) {
    if (err.message.includes('Unauthorized') || err.message.includes('token')) {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
