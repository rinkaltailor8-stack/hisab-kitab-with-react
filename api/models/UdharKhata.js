import mongoose from 'mongoose';

const udharKhataSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    personName: { type: String, required: true, trim: true },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.UdharKhata || mongoose.model('UdharKhata', udharKhataSchema);
