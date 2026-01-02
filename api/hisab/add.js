import connectDB from '../_db.js';
import Hisab from '../models/Hisab.js';
import { requireAuth } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await connectDB();
    const user = requireAuth(req);

    const { date, earnedAmount = 0, spentAmount = 0, balanceAmount = 0 } = req.body || {};
    if (!date) return res.status(400).json({ message: 'Date is required' });

    const hisab = await Hisab.create({
      userId: user.id,
      date,
      earnedAmount,
      spentAmount,
      balanceAmount,
    });

    res.status(201).json(hisab);
  } catch (err) {
    if (err.message.includes('Unauthorized') || err.message.includes('token')) {
      return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: err.message || 'Server error' });
  }
}
