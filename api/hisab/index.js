import connectDB from '../_db.js';
import Hisab from '../models/Hisab.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectDB();
    const user = requireAuth(req);

    const list = await Hisab.find({ userId: user.id }).sort({ date: -1 });
    res.json(list);
  } catch (err) {
    if (err.message.includes('Unauthorized') || err.message.includes('token')) {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
